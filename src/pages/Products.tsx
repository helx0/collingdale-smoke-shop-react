import { Search, ShoppingBag, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, categoryName, products } from '../data/store'
import { SectionHeading } from '../components/SectionHeading'
import { PageBackdrop } from '../components/PageBackdrop'
import { useLang } from '../i18n/LanguageContext'

export default function Products() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.status !== 'hidden')
        .filter((p) => {
          const matchesCat = cat === 'all' || p.category === cat
          const haystack = `${p.name} ${p.nameAr} ${p.description} ${p.descriptionAr}`.toLowerCase()
          return matchesCat && haystack.includes(q.toLowerCase())
        }),
    [q, cat],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080909] py-20">
      <PageBackdrop variant={1} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t('products.eyebrow')} title={t('products.title')} copy={t('products.copy')} />

        <div className="mt-12 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d706b] rtl:left-auto rtl:right-4" size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('products.search')}
              className="w-full rounded-xl border border-white/8 bg-[#111414] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d9ad62]/40 rtl:pl-4 rtl:pr-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-white/8 bg-[#111414] p-1">
            <button
              onClick={() => setCat('all')}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs ${cat === 'all' ? 'bg-[#d9ad62] text-[#080909]' : 'text-[#9b9c98]'}`}
            >
              <SlidersHorizontal size={14} className="mr-2 inline rtl:mr-0 rtl:ml-2" />
              {t('products.all')}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs ${cat === c.id ? 'bg-[#d9ad62] text-[#080909]' : 'text-[#9b9c98]'}`}
              >
                {isAr ? c.titleAr : c.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 8) * 0.05, ease: 'easeOut' }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#101212] transition duration-300 hover:-translate-y-1 hover:border-[#d9ad62]/35 hover:bg-[#131616]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0d0d]">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={isAr ? p.nameAr : p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#3b3e3a]">
                    <ShoppingBag size={28} />
                  </div>
                )}
                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#d9ad62] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#080909] rtl:left-auto rtl:right-3">
                    {t('products.featured')}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] uppercase tracking-[.18em] text-[#d9ad62]">
                  {categoryName(p.category, lang)}
                </span>
                <h3 className="mt-2 font-serif text-xl text-[#eee9df]">{isAr ? p.nameAr : p.name}</h3>
                <p className="mt-2 flex-1 text-xs leading-5 text-[#7e817c]">
                  {isAr ? p.descriptionAr : p.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
                  <span className="text-lg font-semibold text-[#f0c978]">
                    {p.price != null ? `$${p.price.toFixed(2)}` : t('products.inStore')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[.12em] text-[#d9ad62] opacity-70 transition group-hover:opacity-100">
                    {t('products.viewDetails')} <ArrowRight size={12} className="rtl:rotate-180" />
                  </span>
                </div>
              </div>
              <Link to={`/products/${p.id}`} aria-label={isAr ? p.nameAr : p.name} className="absolute inset-0 z-10" />
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-[#7e817c]">{t('products.empty')}</p>
        )}
      </div>
    </div>
  )
}
