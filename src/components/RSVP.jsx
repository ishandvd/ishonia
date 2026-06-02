import { useState, useRef } from 'react'
import useGuest from './useGuest'
import styles from './RSVP.module.css'

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no',  label: 'No'  },
]

const EVENT_NAMES = {
  event_1: ['the Sagai'],
  event_2: ['the Evening'],
  both:    ['the Sagai', 'the Evening'],
}

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className={styles.radioGroup}>
      {options.map(opt => (
        <label key={opt.value} className={`${styles.radioLabel} ${value === opt.value ? styles.radioSelected : ''}`}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className={styles.radioInput}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

function Stepper({ value, min = 0, max, onChange }) {
  return (
    <div className={styles.counter}>
      <button
        type="button"
        className={styles.counterBtn}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="decrease"
      >−</button>
      <span className={styles.counterVal}>{value}</span>
      <button
        type="button"
        className={styles.counterBtn}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="increase"
      >+</button>
    </div>
  )
}

async function submitToNetlify(payload) {
  const body = new URLSearchParams({ 'form-name': 'rsvp', ...payload })
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  return res.ok
}

export default function RSVP() {
  const ref = useRef(null)
  const { guest, ready } = useGuest()

  // 'initial' | 'no_confirm' | 'form' | 'submitting' | 'success' | 'error'
  const [step, setStep] = useState('initial')
  const [fields, setFields] = useState({
    coming_to_sagai: 0,
    coming_to_evening: 0,
    dietary_restrictions: '',
    is_drinking_alcohol: 0,
    anything_else: '',
  })

  if (!ready || !guest) return null

  const events = EVENT_NAMES[guest.inviteType] ?? []
  const showSagai   = guest.inviteType === 'both' || guest.inviteType === 'event_1'
  const showEvening = guest.inviteType === 'both' || guest.inviteType === 'event_2'

  // Alcohol is capped by evening attendance (or sagai if no evening)
  const alcoholMax = showEvening ? fields.coming_to_evening : fields.coming_to_sagai

  function set(key, val) {
    setFields(f => {
      const next = { ...f, [key]: val }
      const newAlcoholMax = showEvening ? next.coming_to_evening : next.coming_to_sagai
      if (next.is_drinking_alcohol > newAlcoholMax) {
        next.is_drinking_alcohol = newAlcoholMax
      }
      return next
    })
  }

  async function handleDeclineConfirm() {
    setStep('submitting')
    const ok = await submitToNetlify({
      invite_type: guest.inviteType,
      number_of_guests: guest.maxGuests,
      full_name: guest.full_name,
      coming_to_sagai:   showSagai   ? 0 : '',
      coming_to_evening: showEvening ? 0 : '',
      dietary_restrictions: '',
      is_drinking_alcohol: 0,
      anything_else: '',
    })
    setStep(ok ? 'success' : 'error')
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setStep('submitting')
    const ok = await submitToNetlify({
      invite_type: guest.inviteType,
      number_of_guests: guest.maxGuests,
      full_name: guest.full_name,
      ...fields,
    })
    setStep(ok ? 'success' : 'error')
  }

  const header = (
    <>
      <span className={styles.label}>✦ &nbsp; Your Response</span>
      <div className={styles.goldLine} />
    </>
  )

  if (step === 'success') {
    return (
      <section id="rsvp" className={styles.rsvp}>
        <div className={styles.inner} ref={ref}>
          {header}
          <h2 className={styles.title}>Thank you</h2>
          <p className={styles.note}>
            Thank you for submitting your RSVP.
          </p>
        </div>
      </section>
    )
  }

  if (step === 'no_confirm') {
    return (
      <section id="rsvp" className={styles.rsvp}>
        <div className={styles.inner} ref={ref}>
          {header}
          <h2 className={styles.title}>Are you sure?</h2>
          <p className={styles.note}>
            You're confirming that you won't be able to join us for:
          </p>
          <ul className={styles.eventList}>
            {events.map(e => <li key={e} className={styles.eventItem}>{e}</li>)}
          </ul>
          <p className={styles.note}>We'd love to have you there if you can make it.</p>
          <div className={styles.confirmBtns}>
            <button className={styles.btnDecline} onClick={handleDeclineConfirm} type="button">
              Confirm I can't attend
            </button>
            <button className={styles.btnGhost} onClick={() => setStep('initial')} type="button">
              Go back
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'form') {
    return (
      <section id="rsvp" className={styles.rsvp}>
        <div className={styles.inner} ref={ref}>
          {header}
          <h2 className={styles.title}>Wonderful!</h2>
          <p className={styles.note}>
            Just a few details so we can make sure everything is perfect for you.
          </p>

          <form className={styles.form} onSubmit={handleFormSubmit}>
            {showSagai && (
              <div className={styles.field}>
                <p className={styles.question}>
                  How many from your party will be attending the Sagai?
                  <span className={styles.maxNote}> (max {guest.maxGuests})</span>
                </p>
                <Stepper
                  value={fields.coming_to_sagai}
                  max={guest.maxGuests}
                  onChange={v => set('coming_to_sagai', v)}
                />
              </div>
            )}

            {showEvening && (
              <div className={styles.field}>
                <p className={styles.question}>
                  How many from your party will be attending the Evening?
                  <span className={styles.maxNote}> (max {guest.maxGuests})</span>
                </p>
                <Stepper
                  value={fields.coming_to_evening}
                  max={guest.maxGuests}
                  onChange={v => set('coming_to_evening', v)}
                />
              </div>
            )}

            {showSagai && (
              <div className={styles.field}>
                <p className={styles.question}>Any dietary requirements?</p>
                <input
                  type="text"
                  className={styles.textInput}
                  placeholder="e.g. vegetarian, gluten-free, none"
                  value={fields.dietary_restrictions}
                  onChange={e => set('dietary_restrictions', e.target.value)}
                />
              </div>
            )}

            {showEvening && (
              <div className={styles.field}>
                <p className={styles.question}>
                  How many in your party will be drinking alcohol at the evening event?
                  <span className={styles.maxNote}> (max {alcoholMax})</span>
                </p>
                <Stepper
                  value={fields.is_drinking_alcohol}
                  max={alcoholMax}
                  onChange={v => set('is_drinking_alcohol', v)}
                />
              </div>
            )}

            <div className={styles.field}>
              <p className={styles.question}>Anything else you'd like us to know?</p>
              <textarea
                className={styles.textarea}
                placeholder="Optional"
                rows={3}
                value={fields.anything_else}
                onChange={e => set('anything_else', e.target.value)}
              />
            </div>

            {step === 'error' && (
              <p className={styles.errorMsg}>Something went wrong — please try again.</p>
            )}

            <button type="submit" className={styles.btn} disabled={step === 'submitting'}>
              {step === 'submitting' ? 'Sending…' : '✦   Send RSVP   ✦'}
            </button>
          </form>

          <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
        </div>
      </section>
    )
  }

  // initial
  return (
    <section id="rsvp" className={styles.rsvp}>
      <div className={styles.inner} ref={ref}>
        {header}
        <h2 className={styles.title}>Will you join us?</h2>
        <p className={styles.note}>
          Please let us know if you'll be celebrating with us —<br />
          it means the world to have you there.
        </p>
        <div className={styles.yesNo}>
          <button className={styles.btnYes} onClick={() => setStep('form')} type="button">
            ✦ &nbsp; Yes, I'll be there
          </button>
          <button className={styles.btnNo} onClick={() => setStep('no_confirm')} type="button">
            I can't make it
          </button>
        </div>
        <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
      </div>
    </section>
  )
}
