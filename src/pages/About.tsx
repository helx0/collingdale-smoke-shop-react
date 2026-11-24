import { MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { store } from '../data/store'
import { SectionHeading } from '../components/SectionHeading'
import { PageBackdrop } from '../components/PageBackdrop'
import { useLang } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLang()
  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <PageBackdrop variant={1} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} copy={t('about.copy')} />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Card icon={<MapPin />} title={t('about.card1.title')} text={store.address} />
          <Card icon={<Users />} title={t('about.card2.title')} text={t('about.card2.text')} />
          <Card icon={<ShieldCheck />} title={t('about.card3.title')} text={t('about.card3.text')} />
        </div>

        <div className="mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl text-[#f1ece2]">{t('about.photos.title')}</h2>
            <p className="max-w-md text-sm leading-6 text-[#858782]">{t('about.photos.copy')}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { src: '/store/exterior-sunny.jpg', cap: t('about.photo1') },
              { src: '/store/interior-vape-wall.jpg', cap: t('about.photo2') },
              { src: '/store/hookah-wall.jpg', cap: t('about.photo3') },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#101212]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.cap}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-xs font-semibold uppercase tracking-[.14em] text-[#e9e4da]">
                  {img.cap}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-[#d9ad62]/15 bg-[#101212]/85 p-8 backdrop-blur-sm sm:p-12">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 shrink-0 text-[#d9ad62]" />
            <div>
              <h2 className="font-serif text-3xl text-[#f1ece2]">{t('about.brand.title')}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#90928d]">{t('about.brand.body')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#101212]/85 p-6 backdrop-blur-sm">
      <div className="text-[#d9ad62]">{icon}</div>
      <h3 className="mt-8 font-serif text-2xl text-[#eee9df]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#858782]">{text}</p>
    </div>
  )
}
