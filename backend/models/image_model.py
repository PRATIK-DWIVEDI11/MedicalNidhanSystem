import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from PIL import Image
import os

print("🧠 Building Image CNN Model...\n")

# Load images
def load_images(base_path='../datasets/images'):
    images = []
    labels = []
    
    label_map = {'Normal': 0, 'Pneumonia': 1, 'COVID-19': 2}
    
    for category in ['Normal', 'Pneumonia', 'COVID-19']:
        folder = os.path.join(base_path, category)
        
        for img_file in os.listdir(folder):
            if img_file.endswith('.png'):
                img_path = os.path.join(folder, img_file)
                
                # Load and preprocess
                img = Image.open(img_path).convert('L')
                img = img.resize((64, 64))  # Small size for low RAM
                img_array = np.array(img) / 255.0
                
                images.append(img_array)
                labels.append(label_map[category])
    
    return np.array(images), np.array(labels)

# Load data
X, y = load_images()
X = X.reshape(-1, 64, 64, 1)  # Add channel dimension

print(f"Loaded {len(X)} images")
print(f"Image shape: {X.shape}")

# Split data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build SMALL CNN (memory-efficient)
model = keras.Sequential([
    layers.Conv2D(16, (3, 3), activation='relu', input_shape=(64, 64, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

print("\n📊 Model Summary:")
model.summary()

# Train
print("\n🚀 Training model...\n")
history = model.fit(X_train, y_train, 
                    epochs=10, 
                    batch_size=8,  # Small batch for low RAM
                    validation_split=0.2,
                    verbose=1)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\n✅ Test Accuracy: {test_acc*100:.2f}%")

# Save model
model.save('cnn_model.h5')
print("✅ Model saved as cnn_model.h5\n")
