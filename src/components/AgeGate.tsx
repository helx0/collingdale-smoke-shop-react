import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

export function AgeGate() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()
  useEffect(() => {
    setOpen(sessionStorage.getItem('age-verified') !== 'true')
  }, [])
  if (!open) return null
  const enter = () => {
    sessionStorage.setItem('age-verified', 'true')
    setOpen(false)
  }
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-5 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#d9ad62]/25 bg-[#101212] p-8 text-center shadow-2xl sm:p-12">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#d9ad62]/40 text-2xl text-[#d9ad62]">
          21+
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[.34em] text-[#d9ad62]">{t('age.badge')}</p>
        <h2 className="mt-3 font-serif text-3xl text-[#f4efe5] sm:text-4xl">{t('age.title')}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#9b9c98]">{t('age.body')}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={enter}
            className="flex-1 rounded-full bg-[#d9ad62] px-6 py-3 font-semibold text-[#080909] transition hover:bg-[#f0c978]"
          >
            {t('age.enter')}
          </button>
          <button
            onClick={() => (window.location.href = 'https://www.google.com')}
            className="flex-1 rounded-full border border-white/10 px-6 py-3 text-sm text-[#f4efe5] hover:bg-white/5"
          >
            {t('age.leave')}
          </button>
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[.18em] text-[#686a66]">{t('age.legal')}</p>
      </div>
    </div>
  )
}
