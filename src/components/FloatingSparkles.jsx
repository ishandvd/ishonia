const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + 2.3) % 100}%`,
  top:  `${(i * 7.1 + 3.3) % 100}%`,
  size: (i % 3) + 2,
  duration: `${9 + (i % 7)}s`,
  delay: `${(i * 0.9) % 10}s`,
  color: i % 3 === 0 ? '#c8a96e' : i % 3 === 1 ? '#e8a0b4' : '#7ab87a',
}))

export default function FloatingSparkles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {SPARKLES.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animation: `sparkleFloat ${s.duration} ${s.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
