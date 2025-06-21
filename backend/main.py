from fastapi import FastAPI, HTTPException, Request, Query
from pydantic import BaseModel
import httpx

from utils.header_checker import check_security_headers, summarize_results

app = FastAPI()

class URLRequest(BaseModel):
    url: str

@app.post("/analyze")
async def analyze_headers(request: URLRequest, details: bool = Query(False)):
    try:
        async with httpx.AsyncClient(timeout=5.0, follow_redirects=True) as client:
            response = await client.get(request.url)
            headers = dict(response.headers)

        security_report = check_security_headers(headers)
        summary_message, status = summarize_results(security_report)

        result = {
            "url": request.url,
            "status_code": response.status_code,
            "summary": summary_message,
            "status": status,
            "security_analysis": security_report
        }

        if details:
            result["raw_headers"] = headers

        return result

    except httpx.RequestError as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")
