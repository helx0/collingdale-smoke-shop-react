import { CheckCircle2, Database, ImagePlus, Package, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { categoryName, galleryImages, products } from '../data/store'
import { PageBackdrop } from '../components/PageBackdrop'
import { useLang } from '../i18n/LanguageContext'
import { TranslationKey } from '../i18n/translations'

export default function Admin() {
  const [saved, setSaved] = useState(false)
  const { t, lang } = useLang()
  const isAr = lang === 'ar'

  const checklist: TranslationKey[] = [
    'admin.checklist.1',
    'admin.checklist.2',
    'admin.checklist.3',
    'admin.checklist.4',
    'admin.checklist.5',
    'admin.checklist.6',
    'admin.checklist.7',
    'admin.checklist.8',
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0b0b] py-10">
      <PageBackdrop variant={1} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[.32em] text-[#d9ad62]">{t('admin.eyebrow')}</p>
            <h1 className="mt-2 font-serif text-4xl text-[#f4efe5]">{t('admin.title')}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#838681]">{t('admin.sub')}</p>
          </div>
          <button
            onClick={() => {
              setSaved(true)
              setTimeout(() => setSaved(false), 2000)
            }}
            className="shrink-0 rounded-full bg-[#d9ad62] px-5 py-3 text-sm font-bold text-[#080909]"
          >
            {saved ? t('admin.saved') : t('admin.save')}
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<Package />} label={t('admin.stat.products')} value={String(products.length)} note={t('admin.stat.products.note')} />
          <Stat icon={<Database />} label={t('admin.stat.inventory')} value={t('admin.stat.inventory.value')} note={t('admin.stat.inventory.note')} />
          <Stat icon={<ImagePlus />} label={t('admin.stat.gallery')} value={`${galleryImages.length} ${t('admin.stat.gallery.value')}`} note={t('admin.stat.gallery.note')} />
          <Stat icon={<Settings2 />} label={t('admin.stat.publish')} value={t('admin.stat.publish.value')} note={t('admin.stat.publish.note')} />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_.7fr]">
          <div className="rounded-2xl border border-white/8 bg-[#101212]/85 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl">{t('admin.workflow.title')}</h2>
              <span className="text-xs text-[#6e716c]">{t('admin.workflow.states')}</span>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left rtl:text-right">
                <thead className="text-xs uppercase tracking-[.15em] text-[#6e716c]">
                  <tr>
                    <th className="pb-3 text-left rtl:text-right">{t('admin.table.product')}</th>
                    <th className="pb-3 text-left rtl:text-right">{t('admin.table.category')}</th>
                    <th className="pb-3 text-left rtl:text-right">{t('admin.table.price')}</th>
                    <th className="pb-3 text-left rtl:text-right">{t('admin.table.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-white/6 text-sm">
                      <td className="py-4 text-[#ddd8cf]">{isAr ? p.nameAr : p.name}</td>
                      <td className="py-4 text-[#8d908b]">{categoryName(p.category, lang)}</td>
                      <td className="py-4 text-[#8d908b]">
                        {p.price != null ? `$${p.price.toFixed(2)}` : t('products.inStore')}
                      </td>
                      <td className="py-4">
                        <span className="rounded-full border border-[#d9ad62]/20 px-2.5 py-1 text-[10px] uppercase tracking-[.12em] text-[#d9ad62]">
                          {t(`admin.status.${p.status}` as TranslationKey)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d9ad62]/15 bg-[#101212]/85 p-6 backdrop-blur-sm">
            <h2 className="font-serif text-2xl">{t('admin.checklist.title')}</h2>
            <div className="mt-6 space-y-4">
              {checklist.map((key) => (
                <div key={key} className="flex gap-3 text-sm text-[#aaa9a3]">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#d9ad62]" />
                  {t(key)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#101212]/85 p-5 backdrop-blur-sm">
      <div className="text-[#d9ad62]">{icon}</div>
      <div className="mt-7 text-xs uppercase tracking-[.16em] text-[#6f726d]">{label}</div>
      <div className="mt-1 text-xl text-[#ece7dd]">{value}</div>
      <div className="mt-1 text-[11px] text-[#666963]">{note}</div>
    </div>
  )
}
