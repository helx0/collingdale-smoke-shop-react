import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../data/store'
import { useLang } from '../i18n/LanguageContext'

export function WhatsAppButton() {
  const { t } = useLang()
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('wa.aria')}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-white/10 bg-[#0c0e0e]/90 px-0 py-2 text-xs text-[#e9e4da] opacity-0 backdrop-blur transition-all duration-300 group-hover:max-w-[220px] group-hover:px-4 group-hover:opacity-100">
        {t('wa.chat')}
      </span>
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,.35)] transition duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
        <MessageCircle size={26} className="relative" />
      </span>
    </motion.a>
  )
}
