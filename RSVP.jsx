import useReveal from './useReveal'
import styles from './RSVP.module.css'

// 👇 Replace XXXXXX with your Tally form ID once you have it
const TALLY_FORM_ID = 'XXXXXX'

export default function RSVP() {
  const ref = useReveal()

  return (
    <section className={styles.rsvp}>
      <div className={`${styles.inner} reveal`} ref={ref}>
        <span className={styles.label}>✦ &nbsp; Your Response</span>
        <div className={styles.goldLine} />
        <h2 className={styles.title}>Will you join us?</h2>

        <p className={styles.note}>
          Please let us know if you'll be celebrating with us —<br />
          it means the world to have you there.
        </p>

        {/*
          Tally popup button.
          data-tally-open is the form ID — replace XXXXXX once you have it from tally.so/r/XXXXXX
        */}
        <button
          className={styles.btn}
          data-tally-open={TALLY_FORM_ID}
          data-tally-emoji-text="💍"
          data-tally-emoji-animation="wave"
          data-tally-auto-close="3000"
          type="button"
        >
          ✦ &nbsp; RSVP Now &nbsp; ✦
        </button>

        <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
      </div>
    </section>
  )
}
