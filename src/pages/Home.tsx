import { ArrowRight, Clock3, MapPin, Phone, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, featuredProducts, store } from '../data/store'
import { SectionHeading } from '../components/SectionHeading'
import { Logo } from '../components/Logo'
import { PageBackdrop } from '../components/PageBackdrop'
import { useLang } from '../i18n/LanguageContext'

const icons: Record<string, React.ReactNode> = {
  Cigar: <Sparkles />,
  Vape: <Sparkles />,
  Glass: <Sparkles />,
  Hookah: <Sparkles />,
  Phone: <Sparkles />,
}

export default function Home() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <div>
      {/* Hero */}
      <section className="noise relative min-h-[720px] overflow-hidden bg-[#080909]">
        <motion.img
          src="/images/hero.png"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.42, scale: 1 }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(217,173,98,.16),transparent_45%)]"
        />
        <div className="absolute inset-0 luxury-grid opacity-30" />
        <div className="smoke absolute -right-20 top-10 h-[680px] w-[760px] rounded-full opacity-80" />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-8"
            >
              <Logo />
            </motion.div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.38em] text-[#d9ad62]">
              {t('home.eyebrow')}
            </p>
            <h1 className="font-serif text-6xl leading-[.93] tracking-tight text-[#f7f3ea] sm:text-7xl lg:text-8xl">
              {t('home.h1a')}
              <span className="text-[#d9ad62]">{t('home.h1b')}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#a3a49f] sm:text-lg">{t('home.sub')}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d9ad62] px-7 py-3.5 text-sm font-bold text-[#080909] transition hover:bg-[#f0c978]"
              >
                {t('home.cta.explore')}
                <ArrowRight size={17} className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              <a
                href={store.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 px-7 py-3.5 text-sm text-[#e6e1d7] transition hover:border-[#d9ad62]/50 hover:bg-white/5"
              >
                <MapPin size={16} /> {t('home.cta.directions')}
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              <Mini icon={<ShieldCheck />} title={t('home.mini1.title')} text={t('home.mini1.text')} />
              <Mini icon={<Star />} title={t('home.mini2.title')} text={t('home.mini2.text')} />
              <Mini icon={<Clock3 />} title={t('home.mini3.title')} text={t('home.mini3.text')} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative overflow-hidden border-y border-white/6 bg-[#0c0e0e] py-24">
        <PageBackdrop variant={1} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t('home.cat.eyebrow')} title={t('home.cat.title')} copy={t('home.cat.copy')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c, i) => (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.05 }}
                key={c.id}
                className="group rounded-2xl border border-white/8 bg-[#111414]/80 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d9ad62]/35 hover:bg-[#151818]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6f716d]">{c.eyebrow}</span>
                  <span className="text-[#d9ad62]">{icons[c.icon]}</span>
                </div>
                <h3 className="mt-14 font-serif text-xl text-[#f0ece3]">{isAr ? c.titleAr : c.title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#7f817d]">{isAr ? c.descriptionAr : c.description}</p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#d9ad62]"
                >
                  {t('home.cat.explore')} <ArrowRight size={13} className="rtl:rotate-180" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="relative overflow-hidden py-24">
        <PageBackdrop variant={2} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow={t('home.feat.eyebrow')} title={t('home.feat.title')} copy={t('home.feat.copy')} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((p, i) => (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06 }}
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-white/8 bg-[#101212] transition duration-300 hover:-translate-y-1 hover:border-[#d9ad62]/35"
              >
                <Link to={`/products/${p.id}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#0b0d0d]">
                    <img
                      src={p.imageUrl}
                      alt={isAr ? p.nameAr : p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#eee9df]">{isAr ? p.nameAr : p.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-semibold text-[#f0c978]">
                        {p.price != null ? `$${p.price.toFixed(2)}` : t('products.inStore')}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[.12em] text-[#d9ad62]">
                        {t('home.feat.view')} <ArrowRight size={12} className="rtl:rotate-180" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-[#d9ad62] px-7 py-3.5 text-sm font-bold text-[#080909] transition hover:bg-[#f0c978]"
            >
              {t('home.feat.browse')} <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Local advantage */}
      <section className="relative overflow-hidden py-24">
        <PageBackdrop variant={1} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <SectionHeading eyebrow={t('home.local.eyebrow')} title={t('home.local.title')} copy={t('home.local.copy')} />
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-[#ddd8ce] hover:border-[#d9ad62]/40"
              >
                {t('home.local.discover')}
              </Link>
              <a
                href={store.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#171a1a] px-5 py-3 text-sm text-[#f0ece3]"
              >
                <Phone size={16} className="text-[#d9ad62]" /> {t('home.local.call')}
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-[#d9ad62]/15 bg-[#101212]/85 p-8 glow backdrop-blur-sm">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d9ad62]/8 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[.2em] text-[#d9ad62]">{t('home.local.verified')}</p>
              <div className="mt-7 space-y-5">
                <Info title={t('home.info.products')} text={t('home.info.products.text')} />
                <Info title={t('home.info.contact')} text={store.phone} />
                <Info title={t('home.info.visit')} text={store.address} />
                <Info title={t('home.info.commerce')} text={t('home.info.commerce.text')} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/6 bg-[#0c0e0e] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={t('home.final.eyebrow')} title={t('home.final.title')} copy={t('home.final.copy')} />
            <Link to="/admin" className="inline-flex shrink-0 items-center gap-2 text-sm text-[#d9ad62]">
              {t('home.final.admin')} <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Mini({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-white/8 pt-4">
      <span className="text-[#d9ad62]">{icon}</span>
      <div>
        <div className="text-xs font-semibold text-[#e9e4da]">{title}</div>
        <div className="text-[11px] text-[#747670]">{text}</div>
      </div>
    </div>
  )
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-white/7 pb-4">
      <div className="text-[10px] uppercase tracking-[.18em] text-[#747670]">{title}</div>
      <div className="mt-1 text-sm leading-6 text-[#d9d4ca]">{text}</div>
    </div>
  )
}
