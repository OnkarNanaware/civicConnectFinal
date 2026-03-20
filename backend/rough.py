import google.generativeai as genai

genai.configure(api_key="AIzaSyC897bCsmDp-Yc9fCrZtuj_0Pux_YMop6o")

# Set up the model
generation_config = {
  "temperature": 0.7,
  "top_p": 0.5,  # Focus on high probability words, but allow some variation
  "top_k": 5,     # Consider top 5 most probable words at each step
  "max_output_tokens": 50,  # Limit output to a single line (~50 words)
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[])

convo.send_message("Sumarize the following complaint in very short just give me sumary only in plain text: Failure to address these concerns within the next 3 business days will leave me with no choice but to explore other waste management service providers and seek compensation for the inconvenience and expenses incurred. I urge you to take this complaint seriously and take immediate steps to improve the service in Chintamani Nagar, Pune. Thank you for your attention to this matter.")
print(convo.last.text)