const s = { position: 'absolute', width: 72, height: 72, color: '#c8a96e', opacity: 0.55 }

export default function CornerOrnaments() {
  return (
    <>
      <svg style={{ ...s, top: 24, left: 24 }} viewBox="0 0 72 72" fill="none">
        <path d="M8 64 L8 8 L64 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="36" r="1" fill="currentColor" opacity="0.5" />
      </svg>
      <svg style={{ ...s, top: 24, right: 24, transform: 'scaleX(-1)' }} viewBox="0 0 72 72" fill="none">
        <path d="M8 64 L8 8 L64 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="36" r="1" fill="currentColor" opacity="0.5" />
      </svg>
      <svg style={{ ...s, bottom: 24, left: 24, transform: 'scaleY(-1)' }} viewBox="0 0 72 72" fill="none">
        <path d="M8 64 L8 8 L64 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="36" r="1" fill="currentColor" opacity="0.5" />
      </svg>
      <svg style={{ ...s, bottom: 24, right: 24, transform: 'scale(-1, -1)' }} viewBox="0 0 72 72" fill="none">
        <path d="M8 64 L8 8 L64 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="36" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    </>
  )
}
