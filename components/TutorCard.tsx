'use client'

import { Tutor, getCardGradient, getInitials, subjectKeyFor, subjectLabels } from '@/lib/data'
import { useI18n } from '@/lib/i18n'

type TutorCardProps = {
  tutor: Tutor
  index: number
  onContactClick: (tutor: Tutor) => void
}

export default function TutorCard({ tutor, index, onContactClick }: TutorCardProps) {
  const { lang, t } = useI18n()
  const subjectLabel = subjectLabels[lang][subjectKeyFor(tutor.id)]
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar and Name */}
      <div className="flex items-center mb-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${getCardGradient(tutor.id)} rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <span className="text-white text-lg font-bold">
            {getInitials(tutor.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {tutor.name}
          </h4>
          <p className={`font-medium text-sm bg-gradient-to-r ${getCardGradient(tutor.id)} bg-clip-text text-transparent`}>
            {subjectLabel}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg">
          <span className="text-gray-600 text-sm font-medium">{t.card?.price ?? 'Price'}:</span>
          <span className="text-blue-600 font-bold text-lg">₾{tutor.price}</span>
        </div>
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg">
          <span className="text-gray-600 text-sm font-medium">{t.card?.experience ?? 'Experience'}:</span>
          <span className="text-gray-900 font-semibold">{tutor.experience} {t.card?.years ?? 'years'}</span>
        </div>
      </div>

      {/* Contact Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onContactClick(tutor)
        }}
        className={`w-full bg-gradient-to-r ${getCardGradient(tutor.id)} text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium text-sm`}
      >
        {t.card?.contact ?? 'Contact'}
      </button>
    </div>
  )
}
