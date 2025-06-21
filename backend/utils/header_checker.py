def check_security_headers(headers: dict) -> dict:
    required_headers = {
        "Content-Security-Policy": ("Protects against XSS attacks", "high"),
        "X-Frame-Options": ("Prevents clickjacking", "medium"),
        "Strict-Transport-Security": ("Enforces HTTPS", "high"),
        "X-Content-Type-Options": ("Prevents MIME type sniffing", "medium"),
        "Referrer-Policy": ("Controls referrer info sent", "low"),
        "Permissions-Policy": ("Restricts browser features", "low")
    }

    report = {}
    for header, (desc, severity) in required_headers.items():
        is_present = header in headers
        report[header] = {
            "status": "ok" if is_present else "missing",
            "value": headers.get(header, "Not Set"),
            "description": desc,
            "severity": severity
        }

    return report

def summarize_results(report: dict) -> tuple[str, str]:
    missing = [k for k, v in report.items() if v["status"] == "missing"]
    if not missing:
        return (
            "✅ All important security headers are present. Great job!",
            "pass"
        )
    else:
        msg = "⚠️ The following important headers are missing:\n" + \
              ", ".join(missing) + ".\n" + \
              "Please consider adding them for better protection."
        return (msg, "fail")
