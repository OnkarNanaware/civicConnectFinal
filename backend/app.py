from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# custom functions
from complaintClassify import ClassifyComplaint
from water_prediction import predictWater
from electricty_prediction import predictPower
from intelligence import analyze_complaint


app = Flask(__name__) 
CORS(app)
genai_api_key = "AIzaSyC_bYeFC3UxAQ_Il2RMFDrGGJMZeyhNJ8c"

@app.route('/test', methods=['GET'])
def test():
    return "Hello, World!"

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        if not data or 'complaint' not in data:
            return jsonify({"error": "No complaint provided"}), 400
            
        text = data['complaint']
        print(f"Summarizing: {text}")
        
        # Use hardcoded key if env is missing for now, or preferably use os.getenv
        key = os.getenv("GOOGLE_API_KEY") or genai_api_key
        genai.configure(api_key=key)

        # Set up the model
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,  
            "top_k": 5,     
            "max_output_tokens": 50,  
        }

        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]

        model = genai.GenerativeModel(model_name="gemini-2.0-flash",
                                    generation_config=generation_config,
                                    safety_settings=safety_settings)
        
        convo = model.start_chat(history=[])
        prompt = "Summarize the following complaint in very short just give me summary only in plain text for the title of complaint: " + text

        convo.send_message(prompt)
        summary = convo.last.text
        return jsonify({"summary": summary})
    
    except Exception as e:
        print(f"Summarize error: {str(e)}")
        return jsonify({"error": str(e), "summary": "Complaint Summary"}), 500

@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        title = data.get('title', 'Unknown Title')
        description = data.get('description', 'No Description')
        
        print(f"Classifying: {title}")
        classification_result = ClassifyComplaint(title1=title, description1=description)
        
        ministry = "None"
        if classification_result and 'ministry' in classification_result:
             # Handle langchain response object or string
             res = classification_result['ministry']
             ministry = getattr(res, 'content', str(res))

        return jsonify({"ministry": ministry})
    
    except Exception as e:
        print(f"Classify error: {str(e)}")
        return jsonify({"ministry": "None", "error": str(e)}), 500
    
        # ClassifyComplaint(title1=title,description1=description)

@app.route('/predict-water', methods=['POST'])
def predict_water():
    try:
        data = request.get_json()
        total_people = data['total_people']
        season = data['season']
        isConstruction = data['isConstruction']

        print(total_people) # 856
        print(season) # Summer
        print(isConstruction)  # True/False

        predicted_water = predictWater(people_in_ward=total_people, season=season, construction=isConstruction)

        predicted_water = round(predicted_water, 2)
        return jsonify({"predicted_water": predicted_water})
    
    except Exception as e:
        print(e)
        return jsonify({"predicted_water": "None"})
    
@app.route('/predict-power', methods=['POST'])
def predict_power():
    try:
        data = request.get_json()
        total_people = data['total_people']
        season = data['festive_season']
        isConstruction = data['isConstruction']

        print(total_people) # 856
        print(season) # Summer
        print(isConstruction)  # True/False

        predicted_power = predictPower(people_in_ward=total_people, season=season, construction=isConstruction)

        return jsonify({"predicted_power": predicted_power})
    
    except Exception as e:
        print(e)
        return jsonify({"predicted_power": "None"})

@app.route('/full-analysis', methods=['POST'])
def full_analysis():
    try:
        data = request.get_json()
        if not data or 'complaint' not in data:
            return jsonify({"error": "No complaint text provided"}), 400
        text = data['complaint']
        analysis = analyze_complaint(text)
        return jsonify(analysis)
    except Exception as e:
        print(f"Full analysis error: {str(e)}")
        return jsonify({
            "severity": "Medium",
            "priority_score": 5,
            "department": "Other",
            "summary_short": "Civic Complaint"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)