\ **MedicalNidhanSystem** 🏥

> \*\*AI-Powered Multimodal Disease Diagnosis System\*\* using advanced Machine Learning algorithms for medical research and educational purposes.


---

\## 📋 Table of Contents



\- \[Overview](#overview)

\- \[Features](#-features)

\- \[Tech Stack](#-tech-stack)

\- \[System Architecture](#-system-architecture)

\- \[ML Algorithms](#-ml-algorithms-used)

\- \[Installation](#-installation)

\- \[Usage](#-usage)

\- \[Project Structure](#-project-structure)

\- \[Deployment](#-deployment)

\- \[Security](#-security)

\- \[Disclaimer](#-medical-disclaimer)

\- \[Author](#-author)



---



\## 🎯 Overview



MedicalNidhanSystem is an intelligent medical diagnosis platform that combines \*\*three powerful machine learning algorithms\*\* to predict respiratory diseases with high accuracy. The system analyzes patient vitals, medical history, and optional chest X-ray images to provide comprehensive diagnostic predictions.



\### Key Highlights:

✅ \*\*Multi-modal Analysis\*\* - Combines structured patient data + image analysis  

✅ \*\*Ensemble Learning\*\* - 3 ML algorithms for robust predictions  

✅ \*\*Real-time Processing\*\* - Instant diagnosis with confidence scores  

✅ \*\*Professional UI\*\* - Hospital-grade medical interface  

✅ \*\*Secure Authentication\*\* - Firebase-powered user management  

✅ \*\*History Tracking\*\* - Complete patient diagnosis records  

✅ \*\*PDF Reports\*\* - Downloadable medical reports  



---



\## ✨ Features



\### User Features

\- 🔐 \*\*Google OAuth Authentication\*\* - Secure login with Firebase

\- 📊 \*\*Real-time Diagnosis\*\* - Instant AI-powered predictions

\- 📁 \*\*Diagnosis History\*\* - Track all previous diagnoses

\- 📈 \*\*Statistics Dashboard\*\* - View diagnosis trends and statistics

\- 🖼️ \*\*X-ray Analysis\*\* - Optional chest X-ray image upload

\- 📋 \*\*Patient Vitals Input\*\* - Easy data entry form

\- 🏥 \*\*Professional Reports\*\* - Download diagnosis reports as PDF

\- 📱 \*\*Responsive Design\*\* - Mobile-friendly interface

\- 🌐 \*\*Real-time Database\*\* - Firebase Firestore integration



\### Technical Features

\- 🤖 \*\*CNN (Convolutional Neural Network)\*\* - Image classification

\- 🌳 \*\*Random Forest\*\* - Patient data classification

\- 📈 \*\*Logistic Regression\*\* - Ensemble prediction

\- ⚡ \*\*RESTful API\*\* - Flask backend

\- 🔒 \*\*Security Rules\*\* - Firestore security configured

\- 🗄️ \*\*Real-time Sync\*\* - Automatic data synchronization



---



\## 🛠️ Tech Stack



| Component | Technology | Version |

|-----------|-----------|---------|

| \*\*Frontend\*\* | Next.js | 16.0.0 |

| \*\*Styling\*\* | Tailwind CSS | 4.1.16 |

| \*\*Language\*\* | TypeScript | 5.x |

| \*\*Backend\*\* | Python Flask | 2.3+ |

| \*\*Database\*\* | Firebase Firestore | - |

| \*\*Auth\*\* | Firebase Auth | - |

| \*\*ML Framework\*\* | TensorFlow/Keras | 2.10+ |

| \*\*ML Library\*\* | scikit-learn | 1.2+ |

| \*\*API Client\*\* | Axios | 1.3+ |

| \*\*Hosting\*\* | \[To be deployed] | - |



---



\## 🏗️ System Architecture



┌─────────────────────────────────────────────────────────────┐

│ MedicalNidhanSystem │

├─────────────────────────────────────────────────────────────┤

│ │

│ ┌──────────────────┐ ┌──────────────────┐ │

│ │ Frontend │ │ Backend │ │

│ │ (Next.js) │◄───────►│ (Flask API) │ │

│ │ │ │ │ │

│ │ - Authentication │ │ - ML Models │ │

│ │ - Dashboard │ │ - Predictions │ │

│ │ - Forms │ │ - Data Proc. │ │

│ │ - Reports │ │ │ │

│ └──────────────────┘ └──────────────────┘ │

│ │ │ │

│ └───────────────┬───────────────┘ │

│ │ │

│ ┌──────▼──────┐ │

│ │ Firebase │ │

│ │ │ │

│ │ - Auth │ │

│ │ - Firestore │ │

│ │ - Storage │ │

│ └─────────────┘ │

│ │

└─────────────────────────────────────────────────────────────┘





---



\## 🤖 ML Algorithms Used



\### 1️⃣ \*\*Convolutional Neural Network (CNN)\*\*

\- \*\*Purpose\*\*: X-ray image classification

\- \*\*Input\*\*: Chest X-ray images (optional)

\- \*\*Output\*\*: Disease probability scores

\- \*\*Framework\*\*: TensorFlow/Keras



\### 2️⃣ \*\*Random Forest Classifier\*\*

\- \*\*Purpose\*\*: Patient vitals classification

\- \*\*Input\*\*: Age, temperature, heart rate, SpO2, symptoms

\- \*\*Output\*\*: Disease probability scores

\- \*\*Advantages\*\*: Handles non-linear relationships, feature importance



\### 3️⃣ \*\*Logistic Regression\*\*

\- \*\*Purpose\*\*: Ensemble meta-learner

\- \*\*Input\*\*: Combined CNN + Random Forest predictions

\- \*\*Output\*\*: Final diagnosis with confidence score

\- \*\*Advantage\*\*: Optimal probability calibration



\### Ensemble Strategy



X-Ray Image ──► CNN Model ──┐

├──► Logistic Regression ──► Final Diagnosis

Patient Vitals ──► Random Forest ──┘





---



\## 📁 Project Structure



MedicalNidhanSystem/

│

├── frontend/ # Next.js Application

│ ├── app/

│ │ ├── auth/

│ │ │ └── page.tsx # Google Login

│ │ ├── dashboard/

│ │ │ └── page.tsx # User Dashboard

│ │ ├── diagnose/

│ │ │ └── page.tsx # Diagnosis Form

│ │ ├── results/

│ │ │ └── page.tsx # Results Page

│ │ ├── layout.tsx # Root Layout

│ │ └── page.tsx # Landing Page

│ ├── components/

│ │ └── ProtectedRoute.tsx # Auth Guard

│ ├── contexts/

│ │ └── AuthContext.tsx # Auth State

│ ├── lib/

│ │ └── firebase.ts # Firebase Config

│ ├── .env.local # Environment Variables

│ ├── package.json

│ └── tailwind.config.js

│

├── backend/ # Flask API

│ ├── app.py # Main Flask App

│ ├── models/

│ │ ├── cnn\_model.h5 # CNN Model

│ │ ├── random\_forest\_model.pkl # RF Model

│ │ └── ensemble\_model.pkl # Ensemble Model

│ ├── datasets/

│ │ └── structured/

│ │ └── patient\_data.csv # Training Data

│ ├── requirements.txt # Python Dependencies

│ ├── .env # Environment Config

│ └── .env.example

│

├── .gitignore # Git Ignore

├── README.md # This File

└── package.json # Root Dependencies





---



\## 🚀 Installation



\### Prerequisites

\- Node.js 16+ \& npm/yarn

\- Python 3.8+

\- Git



\### Frontend Setup



Clone repository

git clone https://github.com/PRATIK-DWIVEDI11/MedicalNidhanSystem.git

cd MedicalNidhanSystem/frontend



Install dependencies

npm install



Configure environment

cp .env.example .env.local



Edit .env.local with your Firebase credentials

Start development server

npm run dev





\*\*Access\*\*: `http://localhost:3000`



\### Backend Setup



Navigate to backend

cd ../backend



Create virtual environment

python -m venv venv

venv\\Scripts\\activate # Windows

source venv/bin/activate # macOS/Linux



Install dependencies

pip install -r requirements.txt



Start Flask server

python app.py





\*\*Access\*\*: `http://localhost:5000`



---



\## 📖 Usage



\### 1. \*\*User Registration \& Login\*\*

\- Click "Continue with Google"

\- Authenticate with Google account

\- Profile automatically created in Firestore



\### 2. \*\*New Diagnosis\*\*

\- Navigate to "New Diagnosis" page

\- Enter patient information:

&nbsp; - Age, Gender

&nbsp; - Vitals (Temperature, Heart Rate, SpO2)

&nbsp; - Symptoms (Cough, Fever, Breathing Issues)

\- \*\*(Optional)\*\* Upload chest X-ray image

\- Click "Get AI Diagnosis"



\### 3. \*\*View Results\*\*

\- See diagnosis prediction with confidence score

\- View probability distribution across all classes

\- Download PDF report

\- Access diagnosis history



\### 4. \*\*Track History\*\*

\- Dashboard shows all previous diagnoses

\- Statistics: Total, Normal, Pneumonia, COVID-19

\- Filter and export history


---

\## 🌐 Deployment



\### Frontend (Vercel)



Install Vercel CLI

npm i -g vercel



Deploy

cd frontend

vercel



Add environment variables in Vercel dashboard





\*\*Live\*\*: \[[https://medical-nidhan-system.vercel.app](https://medicalnidhansystem.vercel.app/)]



\### Backend (Render)



Create account on Render

Connect GitHub repository

Add environment variables

Deploy automatically





\*\*Live API\*\*: \[[https://medical-nidhan-api.railway.app](https://medicalnidhansystem-backend.onrender.com)]



---



\## 🔐 Security



\### Firebase Security Rules



rules\_version = '2';

service cloud.firestore {

match /databases/{database}/documents {

match /users/{userId} {

allow read, write: if request.auth.uid == userId;

}

match /diagnoses/{diagnosisId} {

allow read: if request.auth.uid == resource.data.userId;

allow create: if request.auth != null;

}

}

}





\### Environment Variables

\- ✅ Firebase keys in `.env.local` (frontend)

\- ✅ Backend secrets in `.env` (gitignored)

\- ✅ All sensitive data protected



---



\## ⚠️ Medical Disclaimer



\*\*IMPORTANT: EDUCATIONAL USE ONLY\*\*



This system is designed for \*\*educational and research purposes only\*\*. It is \*\*NOT\*\* intended for actual medical diagnosis or treatment.



⚠️ \*\*THIS SYSTEM DOES NOT PROVIDE MEDICAL ADVICE\*\*



\- 🚫 Do not use as primary diagnostic tool

\- 🚫 Always consult qualified healthcare professionals

\- 🚫 Results are AI predictions, not medical diagnosis

\- 🚫 Never delay seeking professional medical help



\*\*By using this system, you agree to these terms and conditions.\*\*



---



\## 📚 Learning Outcomes



This project demonstrates:

\- ✅ Full-stack web development (Next.js + Flask)

\- ✅ Machine learning pipeline integration

\- ✅ Firebase real-time database \& authentication

\- ✅ RESTful API design

\- ✅ Responsive UI/UX with Tailwind CSS

\- ✅ Git version control \& GitHub workflow

\- ✅ Secure development practices

\- ✅ Medical domain application



---



\## 👨‍💻 Author



\*\*Pratik Dwivedi\*\*

\- 🎓 Full Stack Developer having expertise in MERN , Nextjs and GoLang

\- 🎓 AIDS Mini Project

\- 📧 Email: \[pratikdwivedi107@gmail.com]

\- 🔗 GitHub: \[@PRATIK-DWIVEDI11](https://github.com/PRATIK-DWIVEDI11)

---



\## 🤝 Contributing



This is an educational project. Feel free to fork and modify for learning purposes.



---



\## 📞 Support



For issues, questions, or suggestions:

1\. Open an \[Issue](https://github.com/PRATIK-DWIVEDI11/MedicalNidhanSystem/issues)

2\. Create a \[Discussion](https://github.com/PRATIK-DWIVEDI11/MedicalNidhanSystem/discussions)



---



\## 🙏 Acknowledgments



\- Firebase for backend infrastructure

\- TensorFlow/Keras for ML framework

\- Next.js for frontend framework

\- scikit-learn for ML algorithms

\- Medical domain guidance
---

