import useReveal from './useReveal'
import styles from './Story.module.css'

export default function Story() {
  const ref = useReveal()

  return (
    <section className={styles.story}>
      <div className={`${styles.inner} reveal`} ref={ref}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.icon}>💍</span>
          <p>Your photo here</p>
        </div>

        <div className={styles.text}>
          <span className={styles.label}>✦ &nbsp; Our Story</span>
          <div className={styles.goldLine} />
          <h2 className={styles.title}>A love written in the stars</h2>
          <div className={styles.body}>
            <p>
              After years of laughter, adventure, and building something beautiful together —
              Ishan popped the question, and Sonia said yes.
            </p>
            <br />
            <p>
              We are so excited to celebrate this moment with the people who mean the most to us.
              There will be food, dancing, and plenty of magic — and we cannot wait to share it all with you.
            </p>
            <br />
            <p className={styles.quote}>
              "And they lived happily ever after… but first, let's celebrate."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
