import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, Tag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryName, products, store, whatsappUrl } from '../data/store'
import { SectionHeading } from '../components/SectionHeading'
import { PageBackdrop } from '../components/PageBackdrop'
import { useLang } from '../i18n/LanguageContext'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#080909] py-32">
        <PageBackdrop variant={2} />
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h1 className="font-serif text-4xl text-[#eee9df]">{t('detail.notfound.title')}</h1>
          <p className="mt-4 text-sm text-[#7e817c]">{t('detail.notfound.body')}</p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9ad62] px-6 py-3 text-sm font-bold text-[#080909] transition hover:bg-[#f0c978]"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" /> {t('detail.back')}
          </Link>
        </div>
      </div>
    )
  }

  const catTitle = categoryName(product.category, lang)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  const name = isAr ? product.nameAr : product.name
  const description = isAr ? product.descriptionAr : product.description

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080909] py-20">
      <PageBackdrop variant={1} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-[#9b9c98] transition hover:text-[#d9ad62]"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" /> {t('detail.back')}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#0b0d0d]"
          >
            <div className="aspect-[4/3]">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={name} className="h-full w-full object-cover" />
              )}
            </div>
            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-[#d9ad62] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#080909] rtl:left-auto rtl:right-4">
                {t('products.featured')}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <span className="text-[11px] uppercase tracking-[.2em] text-[#d9ad62]">{catTitle}</span>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-[#f4efe5] sm:text-5xl">{name}</h1>
            <p className="mt-5 text-base leading-7 text-[#a3a49f]">{description}</p>

            <div className="mt-8 flex items-end gap-3">
              <span className="font-serif text-4xl text-[#f0c978]">
                {product.price != null ? `$${product.price.toFixed(2)}` : t('products.inStore')}
              </span>
              {product.status === 'confirmed' && (
                <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-[#8bbf7a]">
                  <CheckCircle2 size={15} /> {t('detail.available')}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  isAr
                    ? `مرحباً ${store.name}! أنا مهتم بـ "${name}" (${
                        product.price != null ? `$${product.price.toFixed(2)}` : 'السعر في المتجر'
                      }). هل هو متوفر؟`
                    : `Hi ${store.name}! I'm interested in "${name}" (${
                        product.price != null ? `$${product.price.toFixed(2)}` : 'price in store'
                      }). Is it available?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                <MessageCircle size={17} /> {t('detail.whatsapp')}
              </a>
              <a
                href={store.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 px-7 py-3.5 text-sm text-[#e6e1d7] transition hover:border-[#d9ad62]/50 hover:bg-white/5"
              >
                {t('detail.call')}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-white/8 pt-6 text-xs text-[#7e817c]">
              <ShieldCheck size={16} className="shrink-0 text-[#d9ad62]" />
              {t('detail.note')}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading eyebrow={t('detail.related.eyebrow')} title={`${t('detail.related.title')} ${catTitle}`} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <Link
                    to={`/products/${p.id}`}
                    className="group flex gap-4 overflow-hidden rounded-2xl border border-white/8 bg-[#101212] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#d9ad62]/35"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#0b0d0d]">
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={isAr ? p.nameAr : p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[.14em] text-[#d9ad62]">
                        <Tag size={11} /> {catTitle}
                      </span>
                      <h3 className="mt-1 font-serif text-lg text-[#eee9df]">{isAr ? p.nameAr : p.name}</h3>
                      <span className="mt-1 text-sm text-[#f0c978]">
                        {p.price != null ? `$${p.price.toFixed(2)}` : t('products.inStore')}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
