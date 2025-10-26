from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Medical Diagnosis API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract patient data
        age = float(data.get('age', 50))
        temperature = float(data.get('temperature', 98.6))
        heart_rate = float(data.get('heart_rate', 72))
        spo2 = float(data.get('spo2', 98))
        cough = int(data.get('cough', 0))
        fever = int(data.get('fever', 0))
        breathing_issue = int(data.get('breathing_issue', 0))
        
        # Create risk scoring system
        normal_score = 0.0
        pneumonia_score = 0.0
        covid_score = 0.0
        
        # TEMPERATURE LOGIC
        if temperature < 98:
            normal_score += 0.3
        elif temperature <= 99:
            normal_score += 0.2
        elif temperature <= 100.4:
            pneumonia_score += 0.3
        elif temperature < 101.5:
            pneumonia_score += 0.4
            covid_score += 0.2
        else:
            covid_score += 0.3
            pneumonia_score += 0.3
        
        # HEART RATE LOGIC
        if heart_rate < 60:
            normal_score += 0.1
        elif heart_rate <= 100:
            normal_score += 0.2
        elif heart_rate <= 110:
            pneumonia_score += 0.2
            covid_score += 0.1
        else:
            pneumonia_score += 0.3
            covid_score += 0.2
        
        # SpO2 LOGIC (MOST IMPORTANT)
        if spo2 >= 97:
            normal_score += 0.4
        elif spo2 >= 95:
            normal_score += 0.2
            pneumonia_score += 0.1
        elif spo2 >= 93:
            pneumonia_score += 0.3
            covid_score += 0.2
        else:
            covid_score += 0.4
            pneumonia_score += 0.3
        
        # SYMPTOMS LOGIC
        total_symptoms = cough + fever + breathing_issue
        
        if total_symptoms == 0:
            normal_score += 0.2
        elif total_symptoms == 1:
            if cough:
                pneumonia_score += 0.15
                covid_score += 0.1
            elif fever:
                pneumonia_score += 0.2
                covid_score += 0.15
            else:
                pneumonia_score += 0.25
        elif total_symptoms == 2:
            pneumonia_score += 0.3
            covid_score += 0.2
        else:  # All 3 symptoms
            covid_score += 0.35
            pneumonia_score += 0.25
        
        # AGE FACTOR
        if age < 5:
            pneumonia_score += 0.2
        elif age > 60:
            covid_score += 0.15
            pneumonia_score += 0.1
        
        # Normalize scores
        total = normal_score + pneumonia_score + covid_score
        if total == 0:
            total = 1
        
        normal_prob = normal_score / total
        pneumonia_prob = pneumonia_score / total
        covid_prob = covid_score / total
        
        # Ensure minimum variability
        probs = np.array([normal_prob, pneumonia_prob, covid_prob])
        probs = np.maximum(probs, 0.15)  # Minimum 15% for each
        probs = probs / probs.sum()
        
        # Get diagnosis
        labels = ['Normal', 'Pneumonia', 'COVID-19']
        pred_idx = np.argmax(probs)
        diagnosis = labels[pred_idx]
        confidence = float(probs[pred_idx] * 100)
        
        result = {
            'diagnosis': diagnosis,
            'confidence': round(confidence, 2),
            'probabilities': {
                'Normal': round(float(probs[0]) * 100, 2),
                'Pneumonia': round(float(probs[1]) * 100, 2),
                'COVID-19': round(float(probs[2]) * 100, 2)
            }
        }
        
        print(f"\n✅ Prediction: {diagnosis} ({confidence:.2f}%)")
        print(f"   Probs: {result['probabilities']}\n")
        
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print("🚀 Flask API running")
    print("📊 Rule-based diagnosis system active\n")
    app.run(debug=False, host='0.0.0.0', port=port)
