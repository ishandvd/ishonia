import { useEffect, useState } from 'react'
import styles from './EnvelopeIntro.module.css'

function Florals({ side }) {
  return (
    <svg
      className={`${styles.florals} ${side === 'right' ? styles.floralsRight : styles.floralsLeft}`}
      viewBox="0 0 180 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* main stem curving up from bottom corner */}
      <path d="M20 320 Q30 270 42 240 Q58 200 72 168" stroke="#8abf7e" strokeWidth="1.3" strokeLinecap="round"/>
      {/* secondary stem */}
      <path d="M20 320 Q14 275 18 248 Q24 210 38 182" stroke="#8abf7e" strokeWidth="1.0" strokeLinecap="round"/>
      {/* side sprigs */}
      <path d="M50 265 Q34 255 18 248" stroke="#9acc8e" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M60 230 Q44 218 28 212" stroke="#9acc8e" strokeWidth="0.85" strokeLinecap="round"/>
      <path d="M68 195 Q52 182 36 174" stroke="#9acc8e" strokeWidth="0.8" strokeLinecap="round"/>

      {/* leaves */}
      <ellipse cx="54" cy="248" rx="11" ry="4.5" fill="#a8d49a" opacity="0.75" transform="rotate(-42 54 248)"/>
      <ellipse cx="30" cy="210" rx="9"  ry="3.8" fill="#b8e0aa" opacity="0.68" transform="rotate(-25 30 210)"/>
      <ellipse cx="40" cy="175" rx="8"  ry="3.2" fill="#c2e8b4" opacity="0.62" transform="rotate(-18 40 175)"/>

      {/* large blossom — upper */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`a${i}`}
          cx={72 + Math.cos((i/5)*Math.PI*2 - Math.PI/2) * 12}
          cy={162 + Math.sin((i/5)*Math.PI*2 - Math.PI/2) * 12}
          rx="7.5" ry="10.5"
          fill="#f7c8d8" opacity="0.90"
          transform={`rotate(${(i/5)*360} ${72 + Math.cos((i/5)*Math.PI*2 - Math.PI/2)*12} ${162 + Math.sin((i/5)*Math.PI*2 - Math.PI/2)*12})`}
        />
      ))}
      <circle cx="72" cy="162" r="5.5" fill="#f0a8c0" opacity="0.93"/>
      <circle cx="72" cy="162" r="2.5" fill="#e8c060" opacity="0.97"/>
      {[0,1,2,3,4,5,6].map(i => {
        const a = (i/7)*Math.PI*2
        return <line key={`as${i}`}
          x1={72+Math.cos(a)*5.5} y1={162+Math.sin(a)*5.5}
          x2={72+Math.cos(a)*10}  y2={162+Math.sin(a)*10}
          stroke="#d4886a" strokeWidth="0.6" opacity="0.60"/>
      })}

      {/* medium blossom — mid */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`b${i}`}
          cx={32 + Math.cos((i/5)*Math.PI*2 - Math.PI/2) * 9}
          cy={175 + Math.sin((i/5)*Math.PI*2 - Math.PI/2) * 9}
          rx="5.5" ry="8"
          fill="#fce0ec" opacity="0.85"
          transform={`rotate(${(i/5)*360} ${32 + Math.cos((i/5)*Math.PI*2 - Math.PI/2)*9} ${175 + Math.sin((i/5)*Math.PI*2 - Math.PI/2)*9})`}
        />
      ))}
      <circle cx="32" cy="175" r="4"   fill="#f0a0b8" opacity="0.90"/>
      <circle cx="32" cy="175" r="1.9" fill="#e8c060" opacity="0.95"/>

      {/* small blossom — lower spur */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`c${i}`}
          cx={18 + Math.cos((i/5)*Math.PI*2) * 7}
          cy={248 + Math.sin((i/5)*Math.PI*2) * 7}
          rx="4" ry="6"
          fill="#fad4e4" opacity="0.80"
          transform={`rotate(${(i/5)*360} ${18 + Math.cos((i/5)*Math.PI*2)*7} ${248 + Math.sin((i/5)*Math.PI*2)*7})`}
        />
      ))}
      <circle cx="18" cy="248" r="2.8" fill="#f0a0b8" opacity="0.87"/>
      <circle cx="18" cy="248" r="1.3" fill="#e8c060" opacity="0.93"/>

      {/* tiny bud */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`d${i}`}
          cx={28 + Math.cos((i/5)*Math.PI*2) * 5.5}
          cy={213 + Math.sin((i/5)*Math.PI*2) * 5.5}
          rx="3.5" ry="5"
          fill="#f2b8cc" opacity="0.76"
          transform={`rotate(${(i/5)*360} ${28 + Math.cos((i/5)*Math.PI*2)*5.5} ${213 + Math.sin((i/5)*Math.PI*2)*5.5})`}
        />
      ))}
      <circle cx="28" cy="213" r="2.2" fill="#eda0b8" opacity="0.83"/>
      <circle cx="28" cy="213" r="1.0" fill="#e8c060" opacity="0.90"/>
    </svg>
  )
}


const BURST_COLORS = ['#f7c8d8','#fce8f0','#fffbe0','#f2b8cc','#e8c060','#fad4e4','#ffffff','#fde0ec']

function fireBurst() {
  const cx = window.innerWidth  / 2
  const cy = window.innerHeight / 2

  for (let i = 0; i < 60; i++) {
    const el    = document.createElement('div')
    const angle = Math.random() * Math.PI * 2
    const dist  = 80 + Math.random() * 220
    const tx    = Math.cos(angle) * dist
    const ty    = Math.sin(angle) * dist
    const size  = 4 + Math.random() * 7
    const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)]
    const delay = Math.random() * 500
    const dur   = 1000 + Math.random() * 800
    const isStar = Math.random() < 0.5

    Object.assign(el.style, {
      position:      'fixed',
      left:          `${cx}px`,
      top:           `${cy}px`,
      width:         `${size}px`,
      height:        `${size}px`,
      borderRadius:  isStar ? '0' : '50%',
      background:    color,
      zIndex:        '10001',
      pointerEvents: 'none',
      transform:     'translate(-50%, -50%)',
      opacity:       '0',
      clipPath:      isStar ? 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' : 'none',
      transition:    `transform ${dur}ms cubic-bezier(0.2,0.8,0.4,1) ${delay}ms, opacity ${dur * 0.4}ms ease ${delay}ms`,
    })

    document.body.appendChild(el)

    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${Math.random()*360}deg)`
      el.style.opacity   = '1'
      setTimeout(() => {
        el.style.transition = `opacity ${dur * 0.6}ms ease`
        el.style.opacity    = '0'
        setTimeout(() => el.remove(), dur * 0.6 + 50)
      }, delay + dur * 0.35)
    }))
  }
}

export default function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleSealClick() {
    if (phase !== 'idle') return
    setPhase('opening')
    fireBurst()
    setTimeout(() => { setPhase('done'); onOpen() }, 2200)
  }

  if (phase === 'done') return null

  return (
    <>
    <div className={`${styles.overlay} ${phase === 'opening' ? styles.overlayOut : ''}`}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={`${styles.envelope} ${phase === 'opening' ? styles.envelopeOpen : ''}`}>

        {/* ivory paper body */}
        <div className={styles.back} />

        {/* gold liner — decorative inner panel */}
        <div className={styles.liner} />

        {/* double border */}
        <div className={styles.borderOuter} />
        <div className={styles.borderInner} />

        {/* corner ornaments */}
        <svg className={styles.corners} viewBox="0 0 100 65" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* top-left flourish */}
          <path d="M1 12 L1 1 L12 1" fill="none" stroke="rgba(184,134,42,0.70)" strokeWidth="0.8"/>
          <path d="M1 1 L6 6" fill="none" stroke="rgba(184,134,42,0.40)" strokeWidth="0.5"/>
          <circle cx="1"  cy="1"  r="1.0" fill="rgba(184,134,42,0.70)"/>
          <circle cx="12" cy="1"  r="0.6" fill="rgba(184,134,42,0.50)"/>
          <circle cx="1"  cy="12" r="0.6" fill="rgba(184,134,42,0.50)"/>
          {/* top-right flourish */}
          <path d="M88 1 L99 1 L99 12" fill="none" stroke="rgba(184,134,42,0.70)" strokeWidth="0.8"/>
          <path d="M99 1 L94 6" fill="none" stroke="rgba(184,134,42,0.40)" strokeWidth="0.5"/>
          <circle cx="99" cy="1"  r="1.0" fill="rgba(184,134,42,0.70)"/>
          <circle cx="88" cy="1"  r="0.6" fill="rgba(184,134,42,0.50)"/>
          <circle cx="99" cy="12" r="0.6" fill="rgba(184,134,42,0.50)"/>
          {/* bottom-left flourish */}
          <path d="M1 53 L1 64 L12 64" fill="none" stroke="rgba(184,134,42,0.70)" strokeWidth="0.8"/>
          <path d="M1 64 L6 59" fill="none" stroke="rgba(184,134,42,0.40)" strokeWidth="0.5"/>
          <circle cx="1"  cy="64" r="1.0" fill="rgba(184,134,42,0.70)"/>
          <circle cx="12" cy="64" r="0.6" fill="rgba(184,134,42,0.50)"/>
          <circle cx="1"  cy="53" r="0.6" fill="rgba(184,134,42,0.50)"/>
          {/* bottom-right flourish */}
          <path d="M88 64 L99 64 L99 53" fill="none" stroke="rgba(184,134,42,0.70)" strokeWidth="0.8"/>
          <path d="M99 64 L94 59" fill="none" stroke="rgba(184,134,42,0.40)" strokeWidth="0.5"/>
          <circle cx="99" cy="64" r="1.0" fill="rgba(184,134,42,0.70)"/>
          <circle cx="88" cy="64" r="0.6" fill="rgba(184,134,42,0.50)"/>
          <circle cx="99" cy="53" r="0.6" fill="rgba(184,134,42,0.50)"/>
        </svg>

        {/* crease V lines on body — visible when flap opens */}
        <svg className={styles.creases} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="50" y2="55" stroke="rgba(160,120,70,0.15)" strokeWidth="0.4"/>
          <line x1="100" y1="0" x2="50" y2="55" stroke="rgba(160,120,70,0.15)" strokeWidth="0.4"/>
          <polygon points="0,0 100,0 50,55" fill="rgba(120,80,30,0.04)"/>
        </svg>

        {/* florals — bottom corners */}
        <Florals side="left" />
        <Florals side="right" />

        {/* letter card — slides up when flap opens */}
        <div className={`${styles.card} ${phase === 'opening' ? styles.cardReveal : ''}`}>
          <div className={styles.cardBorderOuter} />
          <div className={styles.cardBorderInner} />
        </div>

        {/* top flap */}
        <div className={`${styles.flapTop} ${phase === 'opening' ? styles.flapTopOpen : ''}`}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#faf5ec"/>
                <stop offset="100%" stopColor="#ede4d2"/>
              </linearGradient>
            </defs>
            <polygon points="0,0 100,0 50,100" fill="url(#flapGrad)"/>
            {/* gold inner edge on flap */}
            <polyline points="4,0 50,94 96,0" fill="none" stroke="rgba(184,134,42,0.45)" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* wax seal */}
        <button
          className={`${styles.seal} ${phase === 'opening' ? styles.sealBreak : ''}`}
          onClick={handleSealClick}
          aria-label="Tap to open your invitation"
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.sealSvg}>
            {/* outer ring */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,232,120,0.40)" strokeWidth="0.8"/>

            {/* ── fleur-de-lis ── */}
            <g transform="translate(50,30) scale(0.88)" fill="rgba(255,242,175,0.92)">
              {/* centre upright petal */}
              <path d="M0,-18 C-4,-12 -4,-4 0,0 C4,-4 4,-12 0,-18Z"/>
              {/* left petal */}
              <path d="M0,0 C-6,-4 -14,-2 -16,4 C-10,6 -4,2 0,0Z"/>
              {/* right petal */}
              <path d="M0,0 C6,-4 14,-2 16,4 C10,6 4,2 0,0Z"/>
              {/* centre ball */}
              <circle cx="0" cy="0" r="2.2"/>
              {/* base band */}
              <rect x="-6" y="4" width="12" height="2.5" rx="1"/>
              {/* lower stem */}
              <path d="M-4,6.5 C-5,10 -3,14 0,15 C3,14 5,10 4,6.5Z"/>
            </g>

            {/* thin rule */}
            <line x1="28" y1="54" x2="72" y2="54" stroke="rgba(255,228,110,0.38)" strokeWidth="0.6"/>

            {/* I & S monogram */}
            <text
              x="50" y="72"
              textAnchor="middle"
              fontFamily="'Cinzel Decorative', serif"
              fontSize="18"
              letterSpacing="2"
              fill="rgba(255,245,185,0.95)"
            >I&amp;S</text>
          </svg>
        </button>

        {phase === 'idle' && (
          <p className={styles.hint}>tap to open your invitation</p>
        )}
      </div>
    </div>
    </>
  )
}
