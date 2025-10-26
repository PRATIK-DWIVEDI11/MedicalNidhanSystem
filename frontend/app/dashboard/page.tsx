'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { FaStethoscope, FaHistory, FaUser, FaSignOutAlt, FaChartLine, FaFileAlt } from 'react-icons/fa';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function DashboardContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDiagnosisHistory();
    }
  }, [user]);

  const loadDiagnosisHistory = async () => {
    if (!user) return;

    try {
      const diagnosesRef = collection(db, 'diagnoses');
      const q = query(
        diagnosesRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const diagnoses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setHistory(diagnoses);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    try {
      let date;
      
      // Handle Firestore Timestamp object
      if (timestamp?.toDate) {
        date = timestamp.toDate();
      } 
      // Handle JavaScript Date object
      else if (timestamp instanceof Date) {
        date = timestamp;
      }
      // Handle timestamp as seconds
      else if (typeof timestamp === 'number') {
        date = new Date(timestamp);
      }
      // Handle ISO string or other string formats
      else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      }
      // Handle object with seconds property (Firestore format)
      else if (timestamp?.seconds) {
        date = new Date(timestamp.seconds * 1000);
      }
      else {
        return 'Date unavailable';
      }

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date error';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedicalNidhanSystem</h1>
              <p className="text-xs text-gray-500">Advanced Medical Intelligence</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/diagnose">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                New Diagnosis
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.displayName || 'User'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <FaChartLine className="text-4xl text-blue-600" />
              <span className="text-3xl font-bold text-blue-600">{history.length}</span>
            </div>
            <p className="text-gray-700 font-semibold">Total Diagnoses</p>
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <FaFileAlt className="text-4xl text-green-600" />
              <span className="text-3xl font-bold text-green-600">
                {history.filter(h => h.diagnosis === 'Normal').length}
              </span>
            </div>
            <p className="text-gray-700 font-semibold">Normal Results</p>
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <FaUser className="text-4xl text-cyan-600" />
              <span className="text-3xl font-bold text-cyan-600">Active</span>
            </div>
            <p className="text-gray-700 font-semibold">Account Status</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaUser className="text-blue-600" /> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Name</p>
              <p className="text-gray-900 text-lg font-semibold">{user.displayName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Email</p>
              <p className="text-gray-900 text-lg font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FaHistory className="text-blue-600" /> Diagnosis History
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No diagnosis history yet</p>
              <Link href="/diagnose">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                  Start Your First Diagnosis
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {item.diagnosis === 'Normal' ? '✅' : 
                           item.diagnosis === 'Pneumonia' ? '⚠️' : '🦠'}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.diagnosis}</h3>
                          <p className="text-gray-600 text-sm">
                            {formatDate(item.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-600">Confidence: </span>
                          <span className="text-gray-900 font-semibold">{item.confidence}%</span>
                        </div>
                        {item.patientData?.age && (
                          <div>
                            <span className="text-gray-600">Age: </span>
                            <span className="text-gray-900 font-semibold">{item.patientData.age} years</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
