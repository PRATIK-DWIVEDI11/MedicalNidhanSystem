import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'MedicalNidhanSystem - Advanced Medical Intelligence',
  description: 'AI-Powered Multimodal Disease Diagnosis System using CNN, Random Forest, and Logistic Regression',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
