import { useEffect, useState } from 'react'
import CornerOrnaments from './CornerOrnaments'
import styles from './Hero.module.css'
import content from '../content.yml'
import useGuest from './useGuest'

const c = content.hero

export default function Hero({ guestName }) {
  const [ready, setReady] = useState(false)
  const { guest } = useGuest()
  useEffect(() => { setTimeout(() => setReady(true), 50) }, [])

  const celebHint = guest?.inviteType === 'both'
    ? '✦   Two celebrations await   ✦'
    : '✦   A celebration awaits   ✦'

  return (
    <section className={styles.hero}>
      <CornerOrnaments />
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        {guestName && (
          <p className={`${styles.welcome} ${ready ? styles.visible : ''}`}>
            {c.welcome_prefix} {guestName}
          </p>
        )}

        <p className={`${styles.tag} ${ready ? styles.visible : ''}`}>
          {c.tagline}
        </p>

        <h1 className={`${styles.names} ${ready ? styles.visible : ''}`}>
          {c.name1}
          <span className={styles.ampersand}>&amp;</span>
          {c.name2}
        </h1>

        <p className={`${styles.sub} ${ready ? styles.visible : ''}`}>
          {c.subtitle}
        </p>

        <div className={`${styles.divider} ${ready ? styles.visible : ''}`} />

        <p className={`${styles.date} ${ready ? styles.visible : ''}`}>
          {celebHint}
        </p>
      </div>

      <div className={styles.scrollHint}>
        <span>{c.scroll_hint}</span>
        <div className={styles.scrollArrow} />
      </div>
    </section>
  )
}
