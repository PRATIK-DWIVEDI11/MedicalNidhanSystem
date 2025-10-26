'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';
import { FaStethoscope, FaUpload, FaImage, FaArrowRight } from 'react-icons/fa';
import { db, auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function DiagnosePageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '',
    gender: 'M',
    temperature: '',
    heart_rate: '',
    spo2: '',
    cough: false,
    fever: false,
    breathing_issue: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login first!');
      router.push('/auth');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cough: formData.cough ? 1 : 0,
          fever: formData.fever ? 1 : 0,
          breathing_issue: formData.breathing_issue ? 1 : 0,
          has_image: !!imageFile,
        }),
      });

      const result = await response.json();
      
      // Save diagnosis to Firestore with proper timestamp
      const diagnosisId = `${user.uid}_${Date.now()}`;
      const diagnosisRef = doc(db, 'diagnoses', diagnosisId);
      const now = new Date();
      
      await setDoc(diagnosisRef, {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        diagnosis: result.diagnosis,
        confidence: result.confidence,
        probabilities: result.probabilities,
        patientData: {
          age: formData.age,
          gender: formData.gender,
          temperature: formData.temperature,
          heart_rate: formData.heart_rate,
          spo2: formData.spo2,
          cough: formData.cough,
          fever: formData.fever,
          breathing_issue: formData.breathing_issue,
        },
        hasImage: !!imageFile,
        timestamp: now, // Use JavaScript Date object
        createdAt: now.toISOString(),
      });

      // Store result in localStorage for results page
      localStorage.setItem('latestResult', JSON.stringify({
        ...result,
        image: imagePreview,
        patientData: formData,
        timestamp: now.toISOString(),
      }));

      // Navigate to results
      router.push('/results');
    } catch (error) {
      console.error('Diagnosis error:', error);
      alert('Failed to get diagnosis. Make sure backend is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedicalNidhanSystem</h1>
              <p className="text-xs text-gray-500">Advanced Medical Intelligence</p>
            </div>
          </Link>
          <Link href="/dashboard">
            <button className="text-gray-600 hover:text-blue-600 transition">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            New Medical Diagnosis
          </h1>
          <p className="text-gray-600 text-lg">Upload X-ray (optional) and enter patient details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload (Optional) */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaImage className="text-blue-600" /> Chest X-Ray Image
              <span className="text-sm text-gray-500 font-normal">(Optional)</span>
            </h2>

            {/* Image Preview */}
            <div className="mb-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="X-ray preview"
                    className="w-full h-96 object-cover rounded-xl border-2 border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-4 border-dashed border-gray-300 rounded-xl h-96 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                  <FaUpload className="text-6xl text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Drop X-ray image here</p>
                  <p className="text-gray-500 text-sm">or click to browse (optional)</p>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-center py-3 rounded-lg font-semibold cursor-pointer transition">
                {imageFile ? 'Change Image' : 'Upload X-Ray Image (Optional)'}
              </div>
            </label>

            <p className="text-gray-500 text-sm mt-4 text-center">
              Supported formats: JPG, PNG (Max 5MB)
            </p>
            <p className="text-blue-600 text-sm mt-2 text-center font-medium">
              💡 Diagnosis can be performed with patient data alone
            </p>
          </div>

          {/* Right Column - Patient Details */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              👤 Patient Information
              <span className="text-sm text-red-500 font-normal ml-2">(Required)</span>
            </h2>

            <div className="space-y-6">
              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Age *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="150"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
                    placeholder="Years"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none transition"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              {/* Vitals */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Temperature (°F) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min="95"
                  max="110"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
                  placeholder="98.6"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Heart Rate (bpm) *</label>
                <input
                  type="number"
                  required
                  min="40"
                  max="200"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
                  placeholder="72"
                  value={formData.heart_rate}
                  onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Blood Oxygen - SpO₂ (%) *</label>
                <input
                  type="number"
                  required
                  min="70"
                  max="100"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
                  placeholder="98"
                  value={formData.spo2}
                  onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Symptoms</label>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="flex items-center cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      checked={formData.cough}
                      onChange={(e) => setFormData({ ...formData, cough: e.target.checked })}
                    />
                    <span className="ml-3 text-gray-700 font-medium">Cough</span>
                  </label>

                  <label className="flex items-center cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      checked={formData.fever}
                      onChange={(e) => setFormData({ ...formData, fever: e.target.checked })}
                    />
                    <span className="ml-3 text-gray-700 font-medium">Fever</span>
                  </label>

                  <label className="flex items-center cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      checked={formData.breathing_issue}
                      onChange={(e) => setFormData({ ...formData, breathing_issue: e.target.checked })}
                    />
                    <span className="ml-3 text-gray-700 font-medium">Shortness of Breath</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-5 rounded-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Analyzing Patient Data...
                </>
              ) : (
                <>
                  Get AI Diagnosis
                  <FaArrowRight />
                </>
              )}
            </button>
            
            <p className="text-center text-gray-500 text-sm mt-3">
              * Required fields • Image upload is optional
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DiagnosePage() {
  return (
    <ProtectedRoute>
      <DiagnosePageContent />
    </ProtectedRoute>
  );
}
