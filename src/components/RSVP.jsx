import { useState } from 'react'
import useReveal from './useReveal'
import useGuest from './useGuest'
import styles from './RSVP.module.css'

const TALLY_BASE = 'https://tally.so/embed/ODkdqa'

function buildTallyUrl(guest, numberOfGuests) {
  const params = new URLSearchParams({
    alignLeft: '1',
    hideTitle: '1',
    transparentBackground: '1',
    dynamicHeight: '1',
    invite_type: guest.inviteType,
    number_of_guests: numberOfGuests,
    full_name: guest.full_name,
    phone_number: guest.phone_number,
    email: guest.email,
  })
  return `${TALLY_BASE}?${params.toString()}`
}

export default function RSVP() {
  const ref = useReveal()
  const { guest, ready } = useGuest()
  const [count, setCount] = useState(1)
  const [tallyUrl, setTallyUrl] = useState(null)

  function handleConfirm(numberOfGuests) {
    setTallyUrl(buildTallyUrl(guest, numberOfGuests))
  }

  if (!ready || !guest) return null

  return (
    <section className={styles.rsvp}>
      <div className={`${styles.inner} reveal`} ref={ref}>
        <span className={styles.label}>✦ &nbsp; Your Response</span>
        <div className={styles.goldLine} />
        <h2 className={styles.title}>Will you join us?</h2>

        {tallyUrl ? (
          <iframe
            src={tallyUrl}
            className={styles.frame}
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="RSVP"
          />
        ) : (
          <>
            <p className={styles.note}>
              Please let us know if you'll be celebrating with us —<br />
              it means the world to have you there.
            </p>

            {guest.maxGuests > 1 ? (
              <div className={styles.stepper}>
                <p className={styles.stepperNote}>
                  Your invitation covers up to {guest.maxGuests} guests.<br />
                  How many will be attending?
                </p>
                <div className={styles.counter}>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setCount(c => Math.max(1, c - 1))}
                    type="button"
                    aria-label="decrease"
                  >−</button>
                  <span className={styles.counterVal}>{count}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setCount(c => Math.min(guest.maxGuests, c + 1))}
                    type="button"
                    aria-label="increase"
                  >+</button>
                </div>
                <button
                  className={styles.btn}
                  onClick={() => handleConfirm(count)}
                  type="button"
                >
                  ✦ &nbsp; Continue to RSVP &nbsp; ✦
                </button>
              </div>
            ) : (
              <button
                className={styles.btn}
                onClick={() => handleConfirm(1)}
                type="button"
              >
                ✦ &nbsp; RSVP Now &nbsp; ✦
              </button>
            )}

            <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
          </>
        )}
      </div>
    </section>
  )
}
