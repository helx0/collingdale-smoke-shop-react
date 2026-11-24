import { SectionHeading } from '../components/SectionHeading'
import { PageBackdrop } from '../components/PageBackdrop'
import { motion } from 'framer-motion'
import { galleryImages } from '../data/store'
import { useLang } from '../i18n/LanguageContext'

export default function Gallery() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <PageBackdrop variant={2} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} copy={t('gallery.copy')} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-[#111414] ${
                img.span ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={img.src}
                alt={isAr ? img.labelAr : img.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-xs uppercase tracking-[.2em] text-[#f0ece3]">
                {isAr ? img.labelAr : img.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  )
}
