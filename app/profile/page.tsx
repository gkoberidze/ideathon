'use client'

import { useState } from 'react'
import { getInitials } from '@/lib/data'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'გიორგი ქობერიძე',
    role: 'სტუდენტი',
    email: 'giorgi@example.com',
    phone: '+995 599 123 456',
    education: 'თბილისის სახელმწიფო უნივერსიტეტი',
    subjects: 'მათემატიკა, პროგრამირება',
    bio: 'მე ვარ სტუდენტი, რომელსაც სურს განათლების გაუმჯობესება.'
  })

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to backend
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#7b2ff7] to-[#f107a3] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">
              {getInitials(profile.name)}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="text-3xl font-bold bg-gray-50 border-2 border-[#7b2ff7] rounded-lg px-4 py-2 w-full mb-2"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
            )}
            <p className="text-lg text-gray-600 mb-4">{profile.role}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {profile.subjects.split(', ').map((subject, idx) => (
                <span key={idx} className="bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white px-3 py-1 rounded-full text-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ელ. ფოსტა</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7]"
              />
            ) : (
              <p className="text-gray-900">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ტელეფონი</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7]"
              />
            ) : (
              <p className="text-gray-900">{profile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">განათლება</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.education}
                onChange={(e) => setProfile({...profile, education: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7]"
              />
            ) : (
              <p className="text-gray-900">{profile.education}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ბიოგრაფია</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7]"
              />
            ) : (
              <p className="text-gray-900">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                შენახვა
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-all font-medium"
              >
                გაუქმება
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                პროფილის რედაქტირება
              </button>
              <button
                onClick={() => alert('გამოსვლა')}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all font-medium"
              >
                გამოსვლა
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

