import styles from './Footer.module.css'
import content from '../content.yml'

const c = content.footer

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.names}>{c.names}</p>
        <div className={styles.divider} />
        <p className={styles.copy}>{c.copy}</p>
      </div>
    </footer>
  )
}
