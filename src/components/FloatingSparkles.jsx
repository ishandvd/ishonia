const SPARKLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.3 + 1.7) % 100}%`,
  top: `${(i * 7.1 + 3.3) % 100}%`,
  size: (i % 3) + 2,
  duration: `${8 + (i % 7)}s`,
  delay: `${(i * 0.8) % 10}s`,
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
            background: '#c8a96e',
            boxShadow: `0 0 ${s.size * 2}px #c8a96e`,
            animation: `sparkleFloat ${s.duration} ${s.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
