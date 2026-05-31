import { useEffect, useState } from 'react'
import useReveal from './useReveal'
import styles from './RSVP.module.css'
import { GUEST_CODES } from '../guestCodes'

const TALLY_FORM_ID = 'ODkdqa'

export default function RSVP() {
  const ref = useReveal()
  const [guest, setGuest] = useState(null)
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState('button')
  const [count, setCount] = useState(1)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code && GUEST_CODES[code]) {
      setGuest(GUEST_CODES[code])
    }
    setReady(true)
  }, [])

  function openTally(numberOfGuests) {
    window.Tally?.openPopup(TALLY_FORM_ID, {
      emoji: { text: '💍', animation: 'wave' },
      autoClose: 3000,
      hiddenFields: {
        invite_type: guest.inviteType,
        number_of_guests: numberOfGuests,
        full_name: guest.full_name,
        phone_number: guest.phone_number,
        email: guest.email,
      },
    })
  }

  function handleRSVP() {
    if (guest.maxGuests > 1) {
      setStep('stepper')
    } else {
      openTally(1)
    }
  }

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

        {ready && (
          <>
            {!guest ? (
              <p className={styles.noCode}>
                Please use your personal invite link to RSVP.
              </p>
            ) : step === 'stepper' ? (
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
                  onClick={() => { openTally(count); setStep('button') }}
                  type="button"
                >
                  ✦ &nbsp; Continue to RSVP &nbsp; ✦
                </button>
                <button
                  className={styles.back}
                  onClick={() => setStep('button')}
                  type="button"
                >
                  ← back
                </button>
              </div>
            ) : (
              <button className={styles.btn} onClick={handleRSVP} type="button">
                ✦ &nbsp; RSVP Now &nbsp; ✦
              </button>
            )}
          </>
        )}

        <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
      </div>
    </section>
  )
}
