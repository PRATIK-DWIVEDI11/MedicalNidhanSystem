import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pickle

print("🌲 Building Random Forest Model...\n")

# Load data
df = pd.read_csv('../datasets/structured/patient_data.csv')

print(f"Loaded {len(df)} patient records")
print(df.head())

# Prepare features and labels
X = df[['age', 'gender', 'temperature', 'heart_rate', 'spo2', 
        'cough', 'fever', 'breathing_issue']].values
y = df['diagnosis'].values

# Encode labels
label_map = {'Normal': 0, 'Pneumonia': 1, 'COVID-19': 2}
y_encoded = np.array([label_map[label] for label in y])

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42)

print(f"\nTraining set: {len(X_train)} samples")
print(f"Test set: {len(X_test)} samples")

# Train Random Forest
print("\n🚀 Training Random Forest...\n")
rf_model = RandomForestClassifier(
    n_estimators=50,  # Small for speed
    max_depth=10,
    random_state=42,
    n_jobs=-1
)

rf_model.fit(X_train, y_train)

# Evaluate
y_pred = rf_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"✅ Accuracy: {accuracy*100:.2f}%\n")
print("Classification Report:")
print(classification_report(y_test, y_pred, 
                          target_names=['Normal', 'Pneumonia', 'COVID-19']))

# Feature importance
feature_names = ['age', 'gender', 'temperature', 'heart_rate', 'spo2', 
                'cough', 'fever', 'breathing_issue']
importances = rf_model.feature_importances_

print("\n📊 Feature Importance:")
for name, imp in zip(feature_names, importances):
    print(f"  {name}: {imp:.4f}")

# Save model
with open('random_forest_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)

print("\n✅ Model saved as random_forest_model.pkl\n")
