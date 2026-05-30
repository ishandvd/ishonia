import { useEffect, useRef } from 'react'

export default function MagicDust() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const particles = []
    let raf

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function spawn(x, y) {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -Math.random() * 2.5 - 0.5,
          life: 1,
          r: Math.random() * 3 + 1,
        })
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 0.028
        p.x += p.vx
        p.y += p.vy
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 169, 110, ${p.life * 0.85})`
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }

    let last = 0
    function onMove(e) {
      const now = performance.now()
      if (now - last < 35) return
      last = now
      spawn(e.clientX, e.clientY)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
