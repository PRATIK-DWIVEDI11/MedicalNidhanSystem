'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaStethoscope, FaExclamationTriangle, FaArrowLeft, FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import ProtectedRoute from '@/components/ProtectedRoute';

function ResultsPageContent() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('latestResult');
    if (!savedResult) {
      router.push('/diagnose');
    } else {
      setResult(JSON.parse(savedResult));
    }
  }, [router]);

  if (!result) return null;

  const getStatusColor = (diagnosis: string) => {
    if (diagnosis === 'Normal') return 'from-green-600 to-emerald-600';
    if (diagnosis === 'Pneumonia') return 'from-yellow-600 to-orange-600';
    return 'from-red-600 to-rose-600';
  };

  const getStatusIcon = (diagnosis: string) => {
    if (diagnosis === 'Normal') return '✅';
    if (diagnosis === 'Pneumonia') return '⚠️';
    return '🦠';
  };

  const downloadReport = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MEDICAL DIAGNOSIS REPORT', 105, 20, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('MedicalNidhanSystem - Advanced Medical Intelligence', 105, 28, { align: 'center' });
    
    // Divider line
    pdf.setDrawColor(59, 130, 246);
    pdf.setLineWidth(0.5);
    pdf.line(20, 32, 190, 32);
    
    // Date and Report ID
    pdf.setFontSize(10);
    pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 40);
    pdf.text(`Report ID: ${Date.now()}`, 20, 46);
    
    // Diagnosis Section
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DIAGNOSIS RESULT', 20, 58);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Condition: ${result.diagnosis}`, 20, 68);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Confidence Level: ${result.confidence}%`, 20, 76);
    
    // Patient Information
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PATIENT INFORMATION', 20, 92);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Age: ${result.patientData?.age} years`, 20, 102);
    pdf.text(`Gender: ${result.patientData?.gender === 'M' ? 'Male' : 'Female'}`, 20, 110);
    pdf.text(`Temperature: ${result.patientData?.temperature}°F`, 20, 118);
    pdf.text(`Heart Rate: ${result.patientData?.heart_rate} bpm`, 20, 126);
    pdf.text(`Blood Oxygen (SpO₂): ${result.patientData?.spo2}%`, 20, 134);
    
    // Symptoms
    const symptoms = [];
    if (result.patientData?.cough) symptoms.push('Cough');
    if (result.patientData?.fever) symptoms.push('Fever');
    if (result.patientData?.breathing_issue) symptoms.push('Breathing Issues');
    
    pdf.text(`Symptoms: ${symptoms.length > 0 ? symptoms.join(', ') : 'None reported'}`, 20, 142);
    
    // Probability Analysis
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROBABILITY ANALYSIS', 20, 158);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    let yPos = 168;
    Object.entries(result.probabilities || {}).forEach(([label, prob]) => {
      pdf.text(`${label}: ${prob}%`, 30, yPos);
      yPos += 8;
    });
    
    // AI Models Used
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI MODELS UTILIZED', 20, yPos + 10);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('• Convolutional Neural Network (CNN) - Image Analysis', 30, yPos + 20);
    pdf.text('• Random Forest Classifier - Structured Data Processing', 30, yPos + 28);
    pdf.text('• Logistic Regression - Ensemble Meta-Learning', 30, yPos + 36);
    
    // Medical Disclaimer
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MEDICAL DISCLAIMER', 20, yPos + 52);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const disclaimer = 'This AI-based assessment is for educational and research purposes only. This report does not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare professionals with any questions regarding medical conditions. Never disregard professional medical advice or delay seeking it because of information from this system.';
    const splitDisclaimer = pdf.splitTextToSize(disclaimer, 170);
    pdf.text(splitDisclaimer, 20, yPos + 62);
    
    // Footer
    pdf.setDrawColor(59, 130, 246);
    pdf.line(20, 280, 190, 280);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text('© 2025 MedicalNidhanSystem - Powered by Advanced Machine Learning', 105, 288, { align: 'center' });
    
    // Auto-download
    pdf.save(`MedicalDiagnosis_${result.diagnosis}_${Date.now()}.pdf`);
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
          <div className="flex gap-4">
            <Link href="/diagnose">
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                <FaArrowLeft />
                New Diagnosis
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Diagnosis Results
          </h1>
          <p className="text-gray-600 text-lg">AI-Powered Medical Analysis Complete</p>
        </div>

        {/* Main Result Card */}
        <div className={`bg-gradient-to-r ${getStatusColor(result.diagnosis)} p-12 rounded-2xl mb-8 text-center shadow-xl`}>
          <div className="text-8xl mb-4">{getStatusIcon(result.diagnosis)}</div>
          <h2 className="text-6xl font-bold text-white mb-4">{result.diagnosis}</h2>
          <p className="text-3xl text-white/90">Confidence: {result.confidence}%</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* X-Ray Image */}
          {result.image && (
            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Analyzed X-Ray Image</h3>
              <img
                src={result.image}
                alt="Analyzed X-ray"
                className="w-full h-80 object-cover rounded-xl border-2 border-blue-300"
              />
            </div>
          )}

          {/* Patient Data */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600 font-medium">Age:</span>
                <span className="text-gray-900 font-semibold">{result.patientData?.age} years</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600 font-medium">Gender:</span>
                <span className="text-gray-900 font-semibold">
                  {result.patientData?.gender === 'M' ? 'Male' : 'Female'}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600 font-medium">Temperature:</span>
                <span className="text-gray-900 font-semibold">{result.patientData?.temperature}°F</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600 font-medium">Heart Rate:</span>
                <span className="text-gray-900 font-semibold">{result.patientData?.heart_rate} bpm</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-gray-600 font-medium">SpO₂:</span>
                <span className="text-gray-900 font-semibold">{result.patientData?.spo2}%</span>
              </div>
              <div className="mt-6">
                <p className="text-gray-600 font-medium mb-3">Symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {result.patientData?.cough && (
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">Cough</span>
                  )}
                  {result.patientData?.fever && (
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">Fever</span>
                  )}
                  {result.patientData?.breathing_issue && (
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">Breathing Issues</span>
                  )}
                  {!result.patientData?.cough && !result.patientData?.fever && !result.patientData?.breathing_issue && (
                    <span className="text-gray-500 italic">None reported</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Probability Analysis */}
        <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Probability Analysis</h3>
          <div className="space-y-6">
            {Object.entries(result.probabilities || {}).map(([label, prob]: any) => (
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-900 font-semibold text-lg">{label}</span>
                  <span className="text-blue-600 font-bold text-lg">{prob}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${
                      label === result.diagnosis
                        ? 'from-green-500 to-green-600'
                        : prob > 25
                        ? 'from-yellow-500 to-yellow-600'
                        : 'from-red-500 to-red-600'
                    } transition-all duration-1000`}
                    style={{ width: `${prob}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Models Used */}
        <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Models Utilized</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h4 className="font-bold text-blue-900 text-lg mb-2">CNN</h4>
              <p className="text-sm text-blue-700">Convolutional Neural Network for X-ray image pattern analysis</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-xl">
              <h4 className="font-bold text-cyan-900 text-lg mb-2">Random Forest</h4>
              <p className="text-sm text-cyan-700">Ensemble learning for patient vitals classification</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 p-6 rounded-xl">
              <h4 className="font-bold text-teal-900 text-lg mb-2">Logistic Regression</h4>
              <p className="text-sm text-teal-700">Meta-learner combining all model predictions</p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-amber-600" /> Medical Disclaimer
          </h3>
          <p className="text-gray-700 leading-relaxed">
            This AI-based assessment is for <span className="font-bold">educational and research purposes only</span>. 
            This report does not constitute professional medical advice, diagnosis, or treatment. 
            <span className="font-bold text-amber-700"> Always consult qualified healthcare professionals</span> with 
            any questions regarding medical conditions. Never disregard professional medical advice or delay seeking 
            it because of information from this system.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/diagnose" className="flex-1">
            <button className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-xl font-bold transition">
              Run Another Diagnosis
            </button>
          </Link>
          <button 
            onClick={downloadReport}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <FaDownload />
            Download Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <ResultsPageContent />
    </ProtectedRoute>
  );
}
