from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporarily allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(url: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            headers = response.headers

            # Analyze headers for security-related ones
            security_analysis = {
                "X-Frame-Options": headers.get("X-Frame-Options"),
                "Content-Security-Policy": headers.get("Content-Security-Policy"),
                "Strict-Transport-Security": headers.get("Strict-Transport-Security"),
                "X-Content-Type-Options": headers.get("X-Content-Type-Options"),
                "X-XSS-Protection": headers.get("X-XSS-Protection"),
            }

            # Check for missing headers
            missing_headers = [header for header, value in security_analysis.items() if value is None]

            return JSONResponse(content={
                "status": "success",
                "summary": f"Missing headers: {', '.join(missing_headers) if missing_headers else 'None'}",
                "security_analysis": security_analysis,
                "raw_headers": headers
            })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional: Proxy endpoint to fetch headers from a given URL
@app.get("/proxy")
async def proxy(url: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            return JSONResponse(content=response.json())  # Return the response from the target URL
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
