'use client'

import { getCardGradient, getInitials } from '@/lib/data'
import { useI18n } from '@/lib/i18n'

const teamMembers = [
  { name: 'გიორგი კობერიძე', role: 'Developer', id: 1 },
  { name: 'ნიკოლოზ ზარაფიშვილი', role: 'Developer', id: 2 },
  { name: 'გიორგი კლდიაშვილი', role: 'Developer', id: 3 },
  { name: 'სანდრო ჭანტურია', role: 'Developer', id: 4 },
]

export default function AboutPage() {
  const { t } = useI18n()
  const values = (t.about?.values as Array<{ title: string; desc: string; icon?: string }>) ?? []
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission Section */}
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] bg-clip-text text-transparent mb-6">
          {t.about?.pageTitle ?? 'About Us'}
        </h1>
        <h2 className="text-2xl font-semibold mb-3">{t.about?.missionTitle ?? 'Our Mission'}</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t.about?.missionText ?? ''}
        </p>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] rounded-full mb-16"></div>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] bg-clip-text text-transparent">
          {t.about?.valuesTitle ?? 'Our Values'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 text-center">{value.icon ?? '✨'}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
              <p className="text-gray-600 text-center">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] bg-clip-text text-transparent">
          {t.about?.teamTitle ?? 'Our Team'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-24 h-24 bg-gradient-to-br ${getCardGradient(member.id)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-3xl font-bold text-white">
                  {getInitials(member.name)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-lg">🌐</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-lg">👍</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-lg">✉️</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

