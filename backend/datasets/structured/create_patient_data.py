import pandas as pd
import numpy as np
import random

print("📊 Creating patient dataset...\n")

np.random.seed(42)
random.seed(42)

data = []
n_patients = 500  # Small dataset for mini project

for i in range(n_patients):
    # Assign disease
    label = random.choice(['Normal', 'Pneumonia', 'COVID-19'])
    
    if label == 'Normal':
        age = random.randint(20, 60)
        gender = random.choice(['M', 'F'])
        temperature = round(random.uniform(97.5, 98.6), 1)
        heart_rate = random.randint(60, 80)
        spo2 = random.randint(96, 100)
        cough = 0
        fever = 0
        breathing_issue = 0
        
    elif label == 'Pneumonia':
        age = random.randint(35, 75)
        gender = random.choice(['M', 'F'])
        temperature = round(random.uniform(100.0, 102.5), 1)
        heart_rate = random.randint(85, 105)
        spo2 = random.randint(91, 95)
        cough = 1
        fever = 1
        breathing_issue = random.choice([0, 1])
        
    else:  # COVID-19
        age = random.randint(30, 70)
        gender = random.choice(['M', 'F'])
        temperature = round(random.uniform(100.5, 103.0), 1)
        heart_rate = random.randint(90, 115)
        spo2 = random.randint(88, 94)
        cough = 1
        fever = 1
        breathing_issue = 1
    
    data.append({
        'patient_id': f'P{i+1:04d}',
        'age': age,
        'gender': 1 if gender == 'M' else 0,  # Encode: M=1, F=0
        'temperature': temperature,
        'heart_rate': heart_rate,
        'spo2': spo2,
        'cough': cough,
        'fever': fever,
        'breathing_issue': breathing_issue,
        'diagnosis': label
    })

df = pd.DataFrame(data)
df.to_csv('patient_data.csv', index=False)

print(f"✅ Created {len(df)} patient records")
print(f"\nLabel distribution:")
print(df['diagnosis'].value_counts())
print(f"\nSaved to: patient_data.csv\n")
