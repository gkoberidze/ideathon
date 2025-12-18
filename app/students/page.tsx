'use client'

import { useMemo, useState } from 'react'
import { mockStudents, Student, getCardGradient, getInitials, subjectKeyFor, getSubjectLabel, SUBJECTS, subjectLabels, ALL_SUBJECTS, subjectStudentGoals, type SubjectKey, type AllSubjects } from '@/lib/data'
import { useI18n } from '@/lib/i18n'

type SubjectFilter = AllSubjects | SubjectKey

export default function StudentsPage() {
  const { lang, t } = useI18n()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>(ALL_SUBJECTS)

  const subjectOptions: SubjectFilter[] = [ALL_SUBJECTS, ...SUBJECTS]

  const students = useMemo(() => {
    if (subjectFilter === ALL_SUBJECTS) return mockStudents
    return mockStudents.filter(s => subjectKeyFor(s.id) === subjectFilter)
  }, [subjectFilter])

  const handleContactClick = (student: Student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] bg-clip-text text-transparent mb-4">
          {t.nav?.students ?? 'Students'}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {/* optional description */}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/90 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] rounded-full mr-2"></span>
          {t.filters?.title ?? 'Filters'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t.filters?.subject ?? 'Subject'}</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value as SubjectFilter)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all"
            >
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s === ALL_SUBJECTS ? (t.filters?.any ?? 'All') : subjectLabels[lang][s as SubjectKey]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${getCardGradient(student.id)} rounded-full flex items-center justify-center mr-3 shadow-lg`}>
                <span className="text-white text-lg font-bold">
                  {getInitials(student.name)}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                <p className={`text-sm font-medium bg-gradient-to-r ${getCardGradient(student.id)} bg-clip-text text-transparent`}>
                  {getSubjectLabel(subjectKeyFor(student.id), lang)}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {subjectStudentGoals[lang][subjectKeyFor(student.id)]}
            </p>

            <button
              onClick={() => handleContactClick(student)}
              className={`w-full bg-gradient-to-r ${getCardGradient(student.id)} text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium text-sm`}
            >
              {t.card?.contact ?? 'Contact'}
            </button>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {isModalOpen && selectedStudent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-gray-600"><span className="font-semibold">{t.modal?.subject ?? 'Subject'}:</span> {getSubjectLabel(subjectKeyFor(selectedStudent.id), lang)}</p>
              <p className="text-gray-600"><span className="font-semibold">Goal:</span> {subjectStudentGoals[lang][subjectKeyFor(selectedStudent.id)]}</p>
              <p className="text-gray-600"><span className="font-semibold">{t.modal?.phone ?? 'Phone'}:</span> <a href={`tel:${selectedStudent.phone}`} className="text-blue-600 hover:underline">{selectedStudent.phone}</a></p>
            </div>
            <button
              onClick={handleCloseModal}
              className="w-full bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white py-3 rounded-xl hover:shadow-lg transition-all font-medium"
            >
              {t.modal?.close ?? 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
