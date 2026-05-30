import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const stars = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    function initStars() {
      stars.length = 0
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.2,
          speed: Math.random() * 0.018 + 0.004,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const alpha = 0.35 + 0.65 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 248, 230, ${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
        background: 'linear-gradient(160deg, #08050f 0%, #0e0820 55%, #07050e 100%)',
      }}
    />
  )
}
