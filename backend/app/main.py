from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import httpx
from .security_analyzer import analyze_headers

app = FastAPI(
    title="SecuriHeader API",
    description="API for analyzing website security headers",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrlRequest(BaseModel):
    url: str
    follow_redirects: Optional[bool] = True

@app.post("/analyze")
async def analyze_url(request: UrlRequest):
    try:
        if not request.url.startswith(('http://', 'https://')):
            url_to_analyze = f"https://{request.url}"
        else:
            url_to_analyze = request.url
        
        follow_redirects = request.follow_redirects if request.follow_redirects is not None else True
        
        async with httpx.AsyncClient(follow_redirects=follow_redirects) as client:
            try:
                response = await client.get(url_to_analyze, timeout=10.0)
                response.raise_for_status()
            except httpx.HTTPError as e:
                raise HTTPException(
                    status_code=400,
                    detail=f"Error fetching URL: {str(e)}"
                )
        
        headers_dict = dict(response.headers)
        analysis_results = analyze_headers(headers_dict)
        
        return {
            "url": url_to_analyze,
            "status_code": response.status_code,
            "results": analysis_results,
            "headers": headers_dict
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@app.get("/health")
def health_check():
    return {"status": "healthy"}