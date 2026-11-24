import { useState } from 'react'
import { Globe, Menu, Phone, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { store } from '../data/store'
import { useLang } from '../i18n/LanguageContext'
import { TranslationKey } from '../i18n/translations'

export function Header() {
  const [open, setOpen] = useState(false)
  const { t, toggle, lang } = useLang()
  const nav: [TranslationKey, string][] = [
    ['nav.home', '/'],
    ['nav.products', '/products'],
    ['nav.about', '/about'],
    ['nav.gallery', '/gallery'],
    ['nav.contact', '/contact'],
  ]
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080909]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([key, href]) => (
            <Link
              key={href}
              className="text-xs uppercase tracking-[.16em] text-[#a6a59f] transition hover:text-[#f0c978]"
              to={href}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={t('lang.switch')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-[#d8d4ca] transition hover:border-[#d9ad62]/50 hover:text-[#f0c978]"
          >
            <Globe size={15} className="text-[#d9ad62]" />
            <span className="hidden sm:inline">{t('lang.switch')}</span>
            <span className="sm:hidden">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>
          <a
            href={store.phoneHref}
            className="hidden items-center gap-3 rounded-full border border-[#d9ad62]/40 px-4 py-2 text-xs font-semibold text-[#f0c978] md:flex"
          >
            <Phone size={15} /> {t('header.call')}
          </a>
          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label={t('header.menu')}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/5 bg-[#080909] px-5 py-4 md:hidden">
          {nav.map(([key, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              className="block border-b border-white/5 py-4 text-sm uppercase tracking-[.16em] text-[#d8d4ca]"
              to={href}
            >
              {t(key)}
            </Link>
          ))}
          <a href={store.phoneHref} className="mt-4 flex items-center gap-2 py-3 text-[#f0c978]">
            <Phone size={16} /> {store.phone}
          </a>
        </nav>
      )}
    </header>
  )
}
