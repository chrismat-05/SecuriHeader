from typing import Dict, List

SECURITY_HEADERS = {
    "Content-Security-Policy": {
        "description": "Prevents XSS attacks by whitelisting sources of approved content",
        "severity": "high"
    },
    "X-Frame-Options": {
        "description": "Protects against clickjacking attacks",
        "severity": "high",
        "valid_values": ["DENY", "SAMEORIGIN"]
    },
    "X-Content-Type-Options": {
        "description": "Prevents MIME type sniffing",
        "severity": "medium",
        "valid_values": ["nosniff"]
    },
    "Strict-Transport-Security": {
        "description": "Enforces secure (HTTP over SSL/TLS) connections to the server",
        "severity": "high"
    },
    "X-XSS-Protection": {
        "description": "Enables XSS filtering protection",
        "severity": "medium",
        "valid_values": ["1", "1; mode=block", "1; report=<reporting-uri>"]
    },
    "Referrer-Policy": {
        "description": "Controls how much referrer information is included with requests",
        "severity": "low"
    },
    "Feature-Policy": {
        "description": "Allows control over which features and APIs can be used in the browser",
        "severity": "medium"
    },
    "Permissions-Policy": {
        "description": "Replaces Feature-Policy, controls browser features access",
        "severity": "medium"
    }
}

def analyze_headers(headers: Dict[str, str]) -> List[Dict]:
    results = []
    
    for header, config in SECURITY_HEADERS.items():
        header_present = header in headers or header.lower() in headers
        actual_header = headers.get(header, headers.get(header.lower(), ""))
        
        analysis = {
            "header": header,
            "present": header_present,
            "description": config["description"],
            "severity": config["severity"],
            "status": "missing",
            "value": actual_header if header_present else None
        }
        
        if header_present:
            if "valid_values" in config:
                if actual_header in config["valid_values"]:
                    analysis["status"] = "valid"
                else:
                    analysis["status"] = "invalid"
                    analysis["expected_values"] = config["valid_values"]
            else:
                analysis["status"] = "present"
        
        results.append(analysis)
    
    return results