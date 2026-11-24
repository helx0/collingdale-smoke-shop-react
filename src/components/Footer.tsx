import { Instagram, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { store, storeHours } from '../data/store'
import { useLang } from '../i18n/LanguageContext'
import { dayNames } from '../i18n/translations'

export function Footer() {
  const { t, lang } = useLang()
  const days = dayNames[lang]
  const hours = storeHours(lang)
  return (
    <footer className="border-t border-white/8 bg-[#080909]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#8e908b]">{t('footer.about')}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d9ad62]">{t('footer.explore')}</h3>
          <div className="mt-5 grid gap-3 text-sm text-[#9b9c98]">
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/gallery">{t('nav.gallery')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d9ad62]">{t('footer.visit')}</h3>
          <div className="mt-5 space-y-4 text-sm text-[#9b9c98]">
            <a className="flex gap-3" href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} className="mt-0.5 shrink-0 text-[#d9ad62]" />
              {store.address}
            </a>
            <a className="flex gap-3" href={store.phoneHref}>
              <Phone size={17} className="shrink-0 text-[#d9ad62]" />
              {store.phone}
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d9ad62]">{t('footer.hours')}</h3>
          <div className="mt-5 space-y-2 text-sm text-[#9b9c98]">
            {days.map((d, i) => (
              <div key={d} className="flex justify-between gap-4">
                <span>{d}</span>
                <span className="text-right text-[#d8d4ca]">{hours[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gold-line mx-auto max-w-7xl opacity-40" />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-[#666863] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} {store.name}. {t('footer.rights')}
        </span>
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Instagram" className="hover:text-[#d9ad62]">
            <Instagram size={16} />
          </a>
          <span>{t('footer.adult')}</span>
        </div>
      </div>
    </footer>
  )
}
