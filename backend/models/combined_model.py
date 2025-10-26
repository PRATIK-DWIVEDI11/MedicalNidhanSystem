import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

print("🔗 Building Combined Ensemble Model...\n")

# This model combines predictions from CNN and Random Forest
# We'll use Logistic Regression as the meta-learner (Algorithm 3)

# Simulate predictions from both models (in real app, these come from actual predictions)
np.random.seed(42)

# Generate dummy combined features for demonstration
# In production: [cnn_pred_0, cnn_pred_1, cnn_pred_2, rf_pred_0, rf_pred_1, rf_pred_2]
n_samples = 100

X_combined = np.random.rand(n_samples, 6)  # 3 from CNN + 3 from RF
y_combined = np.random.randint(0, 3, n_samples)

# Train Logistic Regression as ensemble
print("🚀 Training Logistic Regression Ensemble...\n")

lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_combined, y_combined)

# Test
y_pred = lr_model.predict(X_combined)
accuracy = accuracy_score(y_combined, y_pred)

print(f"✅ Ensemble Accuracy: {accuracy*100:.2f}%")

# Save
with open('ensemble_model.pkl', 'wb') as f:
    pickle.dump(lr_model, f)

print("✅ Model saved as ensemble_model.pkl\n")
print("="*60)
print("🎉 ALL 3 MODELS TRAINED SUCCESSFULLY!")
print("="*60)
