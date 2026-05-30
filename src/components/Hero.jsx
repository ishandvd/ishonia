import { useEffect, useState } from 'react'
import CornerOrnaments from './CornerOrnaments'
import styles from './Hero.module.css'

export default function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 50) }, [])

  return (
    <section className={styles.hero}>
      <CornerOrnaments />

      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <p className={`${styles.tag} ${ready ? styles.visible : ''}`}>
          ✦ &nbsp; A Story Begins &nbsp; ✦
        </p>

        <h1 className={`${styles.names} ${ready ? styles.visible : ''}`}>
          Ishan
          <span className={styles.ampersand}>&amp;</span>
          Sonia
        </h1>

        <p className={`${styles.sub} ${ready ? styles.visible : ''}`}>
          are overjoyed to share their engagement
        </p>

        <div className={`${styles.divider} ${ready ? styles.visible : ''}`} />

        <p className={`${styles.date} ${ready ? styles.visible : ''}`}>
          ✦ &nbsp; Two celebrations await &nbsp; ✦
        </p>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollArrow} />
      </div>
    </section>
  )
}
