'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { FaGoogle, FaStethoscope } from 'react-icons/fa';
import { auth, googleProvider, db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save/update user in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // New user
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          diagnosisCount: 0
        });
      } else {
        // Existing user - update last login
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      setError(error.message || 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-lg">
              <FaStethoscope className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to MedicalNidhanSystem
          </h1>
          <p className="text-gray-600">Sign in to access your medical dashboard</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-2xl text-red-500" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            🔒 Secure authentication powered by Firebase
          </p>
        </div>
      </div>
    </div>
  );
}
