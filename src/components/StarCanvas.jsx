import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    let blossoms = []

    const PINKS = ['#f7c8d8', '#fce8f0', '#f2b8cc', '#fad4e4', '#eaaec0', '#fde0ec']
    const VIRTUAL_MULTIPLIER = 4

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initBlossoms()
    }

    const MIN_DIST = 90

    function findPosition(virtualHeight) {
      for (let attempt = 0; attempt < 30; attempt++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * virtualHeight
        const tooClose = blossoms.some(b => {
          const dx = b.x - x, dy = b.y - y
          return Math.sqrt(dx * dx + dy * dy) < MIN_DIST
        })
        if (!tooClose) return { x, y }
      }
      return { x: Math.random() * canvas.width, y: Math.random() * virtualHeight }
    }

    function initBlossoms() {
      blossoms = []
      const virtualHeight = canvas.height * VIRTUAL_MULTIPLIER
      const count = Math.floor((canvas.width * virtualHeight) / 28000)
      for (let i = 0; i < count; i++) {
        const { x, y } = findPosition(virtualHeight)
        blossoms.push(makeBlossom(x, y, Math.random()))
      }
    }

    function makeBlossom(x, y, phase) {
      return {
        x, y, phase,
        speed:      0.0003 + Math.random() * 0.0004,
        maxR:       9.18 + Math.random() * 12.24,
        rotation:   Math.random() * Math.PI * 2,
        spinSpeed:  (Math.random() - 0.5) * 0.0003,
        color:      PINKS[Math.floor(Math.random() * PINKS.length)],
        bloomPause: 0.08 + Math.random() * 0.12,
        budPause:   0.08 + Math.random() * 0.12,
        dying:      false,
        dyingAlpha: 1,
      }
    }


    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    function bloomAmount(phase, bloomPause, budPause) {
      const openDur  = (1 - bloomPause - budPause) / 2
      if (phase < budPause)                           return 0
      if (phase < budPause + openDur)                 return easeInOut((phase - budPause) / openDur)
      if (phase < budPause + openDur + bloomPause)    return 1
      const closingStart = budPause + openDur + bloomPause
      if (phase < closingStart + openDur)             return 1 - easeInOut((phase - closingStart) / openDur)
      return 0
    }

    function drawBlossom(b) {
      const bloom = bloomAmount(b.phase, b.bloomPause, b.budPause)
      if (bloom < 0.01) return

      const r     = bloom * b.maxR
      const alpha = (0.1 + bloom * 0.32) * b.dyingAlpha
      const PETALS = 5

      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(b.rotation)

      for (let i = 0; i < PETALS; i++) {
        const angle = (i / PETALS) * Math.PI * 2
        ctx.save()
        ctx.rotate(angle)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.ellipse(0, -r * 0.6, r * 0.42, r * 0.62, 0, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
        ctx.globalAlpha = alpha * 0.35
        ctx.strokeStyle = '#d4789a'
        ctx.lineWidth = 0.6
        ctx.stroke()
        ctx.globalAlpha = alpha * 0.45
        ctx.strokeStyle = '#c8688a'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, -r * 0.08)
        ctx.lineTo(0, -r * 1.1)
        ctx.stroke()
        ctx.globalAlpha = alpha * 0.3
        ctx.lineWidth = 0.4
        ctx.beginPath()
        ctx.moveTo(0, -r * 0.55)
        ctx.lineTo(-r * 0.22, -r * 0.85)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, -r * 0.55)
        ctx.lineTo( r * 0.22, -r * 0.85)
        ctx.stroke()
        ctx.restore()
      }

      ctx.globalAlpha = alpha * 0.55
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2)
      ctx.fillStyle = '#f0a0b8'
      ctx.fill()

      ctx.globalAlpha = alpha + 0.08
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2)
      ctx.fillStyle = '#e8c060'
      ctx.fill()

      ctx.lineWidth = 0.6
      for (let i = 0; i < 8; i++) {
        const a   = (i / 8) * Math.PI * 2
        const len = r * 0.38
        ctx.globalAlpha = alpha * 0.6
        ctx.strokeStyle = '#d4886a'
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * r * 0.18, Math.sin(a) * r * 0.18)
        ctx.lineTo(Math.cos(a) * (r * 0.18 + len), Math.sin(a) * (r * 0.18 + len))
        ctx.stroke()
        ctx.globalAlpha = alpha * 0.75
        ctx.fillStyle = '#c87050'
        ctx.beginPath()
        ctx.arc(Math.cos(a) * (r * 0.18 + len), Math.sin(a) * (r * 0.18 + len), 0.9, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    let mouseVX = -9999, mouseVY = -9999
    function onMouseMove(e) {
      mouseVX = e.clientX
      mouseVY = e.clientY + window.scrollY
    }
    window.addEventListener('mousemove', onMouseMove)

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scrollY     = window.scrollY
      const virtualHeight = canvas.height * VIRTUAL_MULTIPLIER

      // ── blossoms ──
      for (let i = 0; i < blossoms.length; i++) {
        const b = blossoms[i]

        if (!b.dying) {
          const dx = mouseVX - b.x, dy = mouseVY - b.y
          if (Math.sqrt(dx*dx + dy*dy) < b.maxR * 1.2) b.dying = true
        }

        if (b.dying) {
          if (b.dyingAlpha === 1) {
            const { x, y } = findPosition(virtualHeight)
            blossoms.push(makeBlossom(x, y, 0))
          }
          b.dyingAlpha -= 0.012
          if (b.dyingAlpha <= 0) { blossoms.splice(i, 1); i--; continue }
        } else {
          b.phase += b.speed
          if (b.phase >= 1) {
            const { x, y } = findPosition(virtualHeight)
            blossoms[i] = makeBlossom(x, y, 0)
            continue
          }
        }

        b.rotation += b.spinSpeed

        const screenY = b.y - scrollY
        if (screenY < -60 || screenY > canvas.height + 60) continue
        const origY = b.y
        b.y = screenY
        drawBlossom(b)
        b.y = origY
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(160deg, #fdfaf6 0%, #faf4f0 55%, #f6faf4 100%)',
      }}
    />
  )
}
