import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { Lang, TranslationKey, translations } from './translations'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isRTL: boolean
  setLang: (lang: Lang) => void
  toggle: () => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'css-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ar') return saved
  return window.navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    return {
      lang,
      dir,
      isRTL: lang === 'ar',
      setLang: (l: Lang) => setLangState(l),
      toggle: () => setLangState((prev) => (prev === 'en' ? 'ar' : 'en')),
      t: (key: TranslationKey) => translations[key][lang],
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
