'use client'

import React, { createContext, useContext } from 'react'

export type Lang = 'ka' | 'en'

type I18nContextValue = {
  lang: Lang
  t: any
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function LanguageProvider({ lang, t, children }: { lang: Lang; t: any; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider')
  return ctx
}

