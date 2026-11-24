export function PageBackdrop({ variant = 1 }: { variant?: 1 | 2 }) {
  const src = variant === 2 ? '/images/bg-soft-2.png' : '/images/bg-soft-1.png'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,173,98,.10),transparent_45%),radial-gradient(circle_at_90%_100%,rgba(217,173,98,.07),transparent_40%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080909]/70 via-[#080909]/40 to-[#080909]" />
    </div>
  )
}
