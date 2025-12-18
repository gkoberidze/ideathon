'use client'

import { useState, useEffect } from 'react'
import { mockTutors, Tutor, SUBJECTS, subjectLabels, ALL_SUBJECTS, subjectKeyFor, type SubjectKey, type AllSubjects } from '@/lib/data'
import TutorCard from '@/components/TutorCard'
import TutorModal from '@/components/TutorModal'
import { useI18n } from '@/lib/i18n'

type ExpFilter = 'all' | '1-3' | '4-6' | '7-10'
type SubjectFilter = AllSubjects | SubjectKey

export default function TutorsPage() {
  const { lang, t } = useI18n()
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors)
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>(ALL_SUBJECTS)
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80])
  const [experienceFilter, setExperienceFilter] = useState<ExpFilter>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const subjectOptions: SubjectFilter[] = [ALL_SUBJECTS, ...SUBJECTS]
  const expOptions: { key: ExpFilter; label: string }[] = [
    { key: 'all', label: t.filters?.any ?? 'All' },
    { key: '1-3', label: t.filters?.exp13 ?? '1-3 years' },
    { key: '4-6', label: t.filters?.exp46 ?? '4-6 years' },
    { key: '7-10', label: t.filters?.exp710 ?? '7-10 years' },
  ]

  useEffect(() => {
    filterTutors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFilter, priceRange, experienceFilter])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isModalOpen])

  const filterTutors = () => {
    let filtered = [...mockTutors]

    if (subjectFilter !== ALL_SUBJECTS) {
      filtered = filtered.filter(t => subjectKeyFor(t.id) === subjectFilter)
    }

    filtered = filtered.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1])

    if (experienceFilter !== 'all') {
      if (experienceFilter === '1-3') {
        filtered = filtered.filter(t => t.experience >= 1 && t.experience <= 3)
      } else if (experienceFilter === '4-6') {
        filtered = filtered.filter(t => t.experience >= 4 && t.experience <= 6)
      } else if (experienceFilter === '7-10') {
        filtered = filtered.filter(t => t.experience >= 7 && t.experience <= 10)
      }
    }

    setTutors(filtered)
  }

  const handleContactClick = (tutor: Tutor) => {
    setSelectedTutor(tutor)
    setIsModalOpen(true)
    setShowSuccessMessage(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTutor(null)
    setShowSuccessMessage(false)
  }

  const handleSendContactMessage = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setIsModalOpen(false)
      setSelectedTutor(null)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] bg-clip-text text-transparent mb-4">
          {t.tutors?.heading ?? 'Find the best tutors'}
        </h1>
      </div>

      {/* Filters Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] rounded-full mr-2"></span>
          {t.filters?.title ?? 'Filters'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters?.subject ?? 'Subject'}</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value as SubjectFilter)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7] bg-white text-gray-900 transition-all"
            >
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s === ALL_SUBJECTS ? (t.filters?.any ?? 'All') : subjectLabels[lang][s as SubjectKey]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {(t.filters?.pricePrefix ?? 'Price range') + ': ?' + priceRange[0] + ' - ?' + priceRange[1]}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="20"
                max="80"
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Number(e.target.value)
                  setPriceRange([newMin, Math.max(newMin, priceRange[1])])
                }}
                className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer accent-[#7b2ff7]"
              />
              <input
                type="range"
                min="20"
                max="80"
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Number(e.target.value)
                  setPriceRange([Math.min(newMax, priceRange[0]), newMax])
                }}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer accent-[#f107a3]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.filters?.experience ?? 'Experience'}</label>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value as ExpFilter)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f107a3] focus:border-[#f107a3] bg-white text-gray-900 transition-all"
            >
              {expOptions.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tutor Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] bg-clip-text text-transparent">
            {t.tutors?.heading ?? 'Find the best tutors'}
          </h3>
          <span className="text-gray-700 font-semibold bg-blue-100 px-4 py-2 rounded-full">
            {typeof t.tutors?.count === 'function' ? t.tutors.count(tutors.length) : `${tutors.length}`}
          </span>
        </div>

        {tutors.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
            <p className="text-gray-500 text-lg">
              {t.tutors?.empty ?? 'No results found. Try different filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tutors.map((tutor, index) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                index={index}
                onContactClick={handleContactClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tutor Modal */}
      <TutorModal
        tutor={selectedTutor}
        isOpen={isModalOpen}
        showSuccessMessage={showSuccessMessage}
        onClose={handleCloseModal}
        onSendMessage={handleSendContactMessage}
      />
    </div>
  )
}

