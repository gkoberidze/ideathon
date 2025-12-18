'use client'

import { Tutor, getCardGradient, getInitials, subjectKeyFor, subjectLabels } from '@/lib/data'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n'

type TutorModalProps = {
  tutor: Tutor | null
  isOpen: boolean
  showSuccessMessage: boolean
  onClose: () => void
  onSendMessage: () => void
}

export default function TutorModal({ tutor, isOpen, showSuccessMessage, onClose, onSendMessage }: TutorModalProps) {
  const { lang, t } = useI18n()
  if (!isOpen || !tutor) return null
  const subjLabel = subjectLabels[lang][subjectKeyFor(tutor.id)]
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`bg-gradient-to-r ${getCardGradient(tutor.id)} px-6 py-4 rounded-t-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4`}>
                <span className="text-white text-2xl font-bold">
                  {getInitials(tutor.name)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
                <p className="text-white/90 text-sm">{subjLabel}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/90 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-full"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {showSuccessMessage ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                {t.modal?.successTitle ?? 'Message sent!'}
              </p>
              <p className="text-gray-600">
                {t.modal?.successText ? t.modal.successText(tutor.name) : `${tutor.name} will contact you soon.`}
              </p>
            </div>
          ) : (
            <>
              {/* Tutor Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <span className="text-gray-600 font-medium">{t.modal?.subject ?? 'Subject'}:</span>
                  <span className="text-gray-900 font-semibold">{subjLabel}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <span className="text-gray-600 font-medium">{t.modal?.experience ?? 'Experience'}:</span>
                  <span className="text-gray-900 font-semibold">{tutor.experience} {t.card?.years ?? 'years'}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <span className="text-gray-600 font-medium">{t.modal?.price ?? 'Price'}:</span>
                  <span className="text-blue-600 font-bold text-lg">₾{tutor.price}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <span className="text-gray-600 font-medium">{t.modal?.phone ?? 'Phone'}:</span>
                  <a 
                    href={`tel:${tutor.phone}`}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    {tutor.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <a
                  href={`tel:${tutor.phone}`}
                  className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-colors text-center text-sm font-medium"
                >
                  {t.modal?.call ?? 'Call'}
                </a>
                <button
                  onClick={onSendMessage}
                  className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  {t.modal?.send ?? 'Message'}
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded-xl hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  {t.modal?.close ?? 'Close'}
                </button>
              </div>

              {/* Subscription and Premium */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-xl border bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Subscription</p>
                      <p className="text-sm text-gray-600">Get updates and priority scheduling</p>
                    </div>
                    <button
                      onClick={() => setIsSubscribed(s => !s)}
                      className={`px-4 py-2 rounded-lg text-white font-medium ${isSubscribed ? 'bg-gray-500 hover:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                      {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-gradient-to-r from-amber-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Premium Package</p>
                      <ul className="text-sm text-gray-700 list-disc pl-5">
                        <li>Priority response</li>
                        <li>Direct line after booking</li>
                        <li>Exclusive study materials</li>
                      </ul>
                    </div>
                    <button className="px-4 py-2 rounded-lg text-white font-medium bg-amber-600 hover:bg-amber-700">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
