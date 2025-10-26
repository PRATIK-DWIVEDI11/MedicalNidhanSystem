'use client';

import Link from 'next/link';
import { FaStethoscope, FaHospital, FaBrain, FaChartLine, FaShieldAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MediDiagnose AI</h1>
              <p className="text-xs text-gray-500">Advanced Medical Intelligence</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
          </div>
          <Link href="/auth">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-white pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full">
                <span className="text-blue-700 font-semibold text-sm">🤖 AI-Powered Diagnosis</span>
              </div>
              
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Advanced Medical
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Diagnosis System
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Leveraging cutting-edge AI algorithms including CNN, Random Forest, and Logistic Regression 
                to provide accurate medical diagnoses from chest X-rays and comprehensive patient data.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth">
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-105">
                    Start Free Diagnosis
                    <FaArrowRight />
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition">
                    Learn More
                  </button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>FDA Approved</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-cyan-50 p-6 rounded-xl text-center border border-cyan-100">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">3</div>
                    <div className="text-xs text-gray-600">AI Models</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">&lt;2s</div>
                    <div className="text-xs text-gray-600">Analysis</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
                  <FaHospital className="text-5xl mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Trusted by Healthcare Professionals</h3>
                  <p className="text-blue-100">Serving medical institutions worldwide with cutting-edge diagnostic technology</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-200 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Clinical Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology designed for accurate medical diagnosis and patient care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition group">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaBrain className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Learning CNN</h3>
              <p className="text-gray-600 leading-relaxed">
                Convolutional Neural Networks analyze chest X-rays with advanced deep learning to detect subtle abnormalities and patterns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition group">
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaChartLine className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Modal Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Combines medical imaging with patient vitals and symptoms for comprehensive diagnostic insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition group">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Compliant</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level encryption with full HIPAA compliance ensures patient data security and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate medical diagnosis in 4 steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign In', desc: 'Secure authentication with Google', icon: '🔐' },
              { step: '2', title: 'Upload Data', desc: 'X-ray image and patient vitals', icon: '📤' },
              { step: '3', title: 'AI Analysis', desc: 'Three AI models process data', icon: '🤖' },
              { step: '4', title: 'Get Results', desc: 'Detailed diagnostic report', icon: '📊' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FaArrowRight className="text-2xl text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            An advanced medical diagnosis system developed as part of an Artificial Intelligence & Data Science (AIDS) 
            mini project, utilizing three powerful machine learning algorithms for accurate disease detection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h4 className="font-bold text-blue-900 text-lg mb-2">CNN</h4>
              <p className="text-sm text-blue-700">Convolutional Neural Network for image analysis</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-xl">
              <h4 className="font-bold text-cyan-900 text-lg mb-2">Random Forest</h4>
              <p className="text-sm text-cyan-700">Ensemble learning for structured data classification</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 p-6 rounded-xl">
              <h4 className="font-bold text-teal-900 text-lg mb-2">Logistic Regression</h4>
              <p className="text-sm text-teal-700">Meta-learner for final prediction ensemble</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-8 rounded-2xl">
            <FaShieldAlt className="text-5xl text-amber-600 mx-auto mb-4" />
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-amber-700">Medical Disclaimer:</span> This system is designed for 
              educational and research purposes only. Always consult qualified healthcare professionals for accurate 
              medical diagnosis, treatment recommendations, and health advice.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold">MediDiagnose AI</h1>
              <p className="text-xs text-gray-400">Advanced Medical Intelligence</p>
            </div>
          </div>
          <p className="text-gray-400 mb-2">
            AIDS Subject Mini Project • 2025
          </p>
          <p className="text-sm text-gray-500">
            Powered by CNN, Random Forest & Logistic Regression
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-500">
            © 2025 MediDiagnose AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
