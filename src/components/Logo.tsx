import { Sparkles } from 'lucide-react'

export function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3 select-none">
    <div className="grid h-10 w-10 place-items-center rounded-full border border-[#d9ad62]/50 bg-[#d9ad62]/8 text-[#d9ad62] shadow-[0_0_30px_rgba(217,173,98,.08)]"><Sparkles size={20}/></div>
    {!compact && <div className="leading-none"><div className="font-serif text-[15px] tracking-[.22em] text-[#f4efe5]">COLLINGDALE</div><div className="mt-1 text-[9px] tracking-[.36em] text-[#d9ad62]">SMOKE SHOP</div></div>}
  </div>
}
