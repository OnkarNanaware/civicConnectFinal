import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

def analyze_complaint(text):
    """
    Analyzes a complaint to detect:
    1. Severity (High, Medium, Low)
    2. Department/Ministry
    3. Suggested Priority Score (1-10)
    """
    genai_api_key = os.getenv("GOOGLE_API_KEY") or "AIzaSyC897bCsmDp-Yc9fCrZtuj_0Pux_YMop6o"
    genai.configure(api_key=genai_api_key)
    
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    prompt = f"""
    Analyze the following civic complaint and provide a structured JSON response.
    Complaint: "{text}"
    
    Return JSON format:
    {{
      "severity": "High/Medium/Low",
      "priority_score": 1-10,
      "department": "Water/Electricity/Roads/Sanitation/Health/Other",
      "summary_short": "5 word summary"
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        # Extract JSON from response text (handling potential markdown formatting)
        res_text = response.text.replace('```json', '').replace('```', '').strip()
        import json
        return json.loads(res_text)
    except Exception as e:
        print(f"Intelligence Error: {e}")
        # Fallback values
        return {
            "severity": "Medium",
            "priority_score": 5,
            "department": "Other",
            "summary_short": "New Civic Complaint"
        }
