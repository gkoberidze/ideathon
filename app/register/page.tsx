'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

type Role = 'tutor' | 'student'

function RegisterInner() {
  const params = useSearchParams()
  const initialRole = (params.get('role') as Role) || 'tutor'
  const [role, setRole] = useState<Role>(initialRole)
  const { t } = useI18n()

  useEffect(() => {
    const r = params.get('role') as Role
    if (r === 'tutor' || r === 'student') setRole(r)
  }, [params])

  const isTutor = role === 'tutor'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] bg-clip-text text-transparent">
          {isTutor ? (t.joinBtn ?? 'Join as a tutor') : (t.joinStudentBtn ?? 'Join as a student')}
        </h1>
        <p className="text-gray-600">Registration is free</p>
      </div>

      {/* Role Toggle */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded-lg border ${isTutor ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'}`}
          onClick={() => setRole('tutor')}
        >
          {t.joinBtn ?? 'Join as a tutor'}
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${!isTutor ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'}`}
          onClick={() => setRole('student')}
        >
          {t.joinStudentBtn ?? 'Join as a student'}
        </button>
      </div>

      {/* Social auth (placeholder) */}
      <div className="bg-white dark:bg-gray-100 rounded-xl shadow border p-6 mb-6 text-gray-900">
        <p className="font-semibold mb-3">Continue with</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="w-full border-2 border-gray-300 rounded-xl py-3 bg-white dark:bg-white text-gray-900 dark:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">Continue with Google</button>
          <button className="w-full border-2 border-gray-300 rounded-xl py-3 bg-white dark:bg-white text-gray-900 dark:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-200">Continue with Facebook</button>
        </div>
      </div>

      {/* Form */}
      <form className="bg-white rounded-xl shadow border p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="e.g., Nino Gelashvili" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="+995 5XX XXX XXX" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="••••••••" />
          </div>
        </div>

        {isTutor ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
              <input className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="e.g., Medicine, Law" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Price (₾)</label>
                <input type="number" className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="40" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                <input type="number" className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="5" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Goals</label>
              <textarea className="w-full border-2 border-gray-300 rounded-xl px-3 py-2" placeholder="Describe your goals" rows={3} />
            </div>
          </>
        )}

        <button type="button" className="w-full bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white py-3 rounded-xl font-semibold hover:shadow-lg">Create Account</button>
      </form>

      <div className="text-center mt-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">Loading...</div>}>
      <RegisterInner />
    </Suspense>
  )
}
