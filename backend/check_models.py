import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai_api_key = os.getenv("GOOGLE_API_KEY") or "AIzaSyC_bYeFC3UxAQ_Il2RMFDrGGJMZeyhNJ8c"
genai.configure(api_key=genai_api_key)

print("Available Models:")
for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)
