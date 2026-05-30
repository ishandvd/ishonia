import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.names}>Ishan &amp; Sonia</p>
        <div className={styles.divider} />
        <p className={styles.copy}>With love ✦ 2026</p>
      </div>
    </footer>
  )
}
