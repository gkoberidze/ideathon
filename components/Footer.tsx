'use client'

import { useI18n } from '@/lib/i18n'

export default function Footer() {
  const { t } = useI18n()
  return (
    <>
      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4]"></div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-4">{t.footer?.aboutTitle ?? 'EduConnect Georgia'}</h3>
              <p className="text-white/90 text-sm">
                {t.footer?.aboutText ?? 'Connecting tutors, students, and parents.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer?.linksTitle ?? 'Quick links'}</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="/" className="hover:text-white transition-colors">{t.footer?.home ?? 'Home'}</a></li>
                <li><a href="/tutors" className="hover:text-white transition-colors">{t.footer?.tutors ?? 'Tutors'}</a></li>
                <li><a href="/students" className="hover:text-white transition-colors">{t.footer?.students ?? 'Students'}</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">{t.footer?.about ?? 'About'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer?.socialTitle ?? 'Social'}</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-xl">🌐</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-xl">👍</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <span className="text-xl">✉️</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/90 text-sm">
              {t.footer?.copyright ?? '© 2025 EduConnect Georgia. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

