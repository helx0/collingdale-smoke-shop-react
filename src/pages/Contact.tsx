import { Clock3, MapPin, Phone, Send } from 'lucide-react'
import { store } from '../data/store'
import { SectionHeading } from '../components/SectionHeading'
import { PageBackdrop } from '../components/PageBackdrop'
import { FormEvent, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLang()
  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <PageBackdrop variant={2} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} copy={t('contact.copy')} />
        <div className="mt-14 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/8 bg-[#101212]/85 p-7 backdrop-blur-sm">
            <Item icon={<MapPin />} title={t('contact.address')} text={store.address} />
            <Item icon={<Phone />} title={t('contact.phone')} text={store.phone} />
            <Item icon={<Clock3 />} title={t('contact.hours')} text={t('contact.hours.text')} />
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#d9ad62] px-6 py-3 text-sm font-bold text-[#080909]"
            >
              {t('contact.directions')}
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#101212]">
            <iframe
              title="Collingdale Smoke Shop location"
              src="https://www.google.com/maps?q=640%20MacDade%20Blvd%2C%20Collingdale%2C%20PA%2019023&output=embed"
              className="h-[420px] w-full border-0 grayscale opacity-80"
              loading="lazy"
            />
          </div>
        </div>
        <InquiryForm />
      </div>
    </div>
  )
}

function Item({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border-b border-white/7 py-5 first:pt-0 last:border-0">
      <div className="flex gap-3">
        <span className="shrink-0 text-[#d9ad62]">{icon}</span>
        <div>
          <div className="text-[10px] uppercase tracking-[.2em] text-[#71746f]">{title}</div>
          <div className="mt-1 text-sm leading-6 text-[#ddd8cf]">{text}</div>
        </div>
      </div>
    </div>
  )
}

function InquiryForm() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    const f = new FormData(e.currentTarget)
    const payload = {
      name: String(f.get('name') || ''),
      email: String(f.get('email') || ''),
      phone: String(f.get('phone') || ''),
      message: String(f.get('message') || ''),
    }
    if (supabase) {
      await supabase.from('inquiries').insert(payload)
    }
    setBusy(false)
    setSent(true)
    e.currentTarget.reset()
  }
  return (
    <form onSubmit={submit} className="mt-5 rounded-3xl border border-white/8 bg-[#101212]/85 p-7 backdrop-blur-sm sm:p-8">
      <div>
        <p className="text-[10px] uppercase tracking-[.24em] text-[#d9ad62]">{t('contact.form.eyebrow')}</p>
        <h2 className="mt-2 font-serif text-3xl text-[#eee9df]">{t('contact.form.title')}</h2>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder={t('contact.form.name')}
          className="rounded-xl border border-white/8 bg-[#0b0d0d] px-4 py-3 text-sm outline-none focus:border-[#d9ad62]/40"
        />
        <input
          name="email"
          type="email"
          placeholder={t('contact.form.email')}
          className="rounded-xl border border-white/8 bg-[#0b0d0d] px-4 py-3 text-sm outline-none focus:border-[#d9ad62]/40"
        />
        <input
          name="phone"
          placeholder={t('contact.form.phone')}
          className="rounded-xl border border-white/8 bg-[#0b0d0d] px-4 py-3 text-sm outline-none focus:border-[#d9ad62]/40"
        />
        <div className="hidden sm:block" />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t('contact.form.message')}
        className="mt-4 w-full rounded-xl border border-white/8 bg-[#0b0d0d] px-4 py-3 text-sm outline-none focus:border-[#d9ad62]/40"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-[#666963]">
          <Send size={15} className="text-[#d9ad62]" />
          {t('contact.form.note')}
        </p>
        <button disabled={busy} className="rounded-full bg-[#d9ad62] px-6 py-3 text-sm font-bold text-[#080909]">
          {busy ? t('contact.form.sending') : sent ? t('contact.form.sent') : t('contact.form.send')}
        </button>
      </div>
    </form>
  )
}
