import { useState } from 'react'
import useReveal from './useReveal'
import useGuest from './useGuest'
import styles from './RSVP.module.css'

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no',  label: 'No'  },
]

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

export default function RSVP() {
  const ref = useReveal()
  const { guest, ready } = useGuest()

  const [fields, setFields] = useState({
    coming_to_sagai: '',
    dietary_restrictions: '',
    coming_to_evening: '',
    is_drinking_alcohol: '',
    anything_else: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  if (!ready || !guest) return null

  const showSagai  = guest.inviteType === 'both' || guest.inviteType === 'event_1'
  const showEvening = guest.inviteType === 'both' || guest.inviteType === 'event_2'

  function set(key, val) {
    setFields(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const body = new URLSearchParams({
      'form-name': 'rsvp',
      invite_type: guest.inviteType,
      number_of_guests: guest.maxGuests,
      full_name: guest.full_name,
      ...fields,
    })

    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.rsvp}>
        <div className={`${styles.inner} reveal`} ref={ref}>
          <span className={styles.label}>✦ &nbsp; Your Response</span>
          <div className={styles.goldLine} />
          <h2 className={styles.title}>Thank you</h2>
          <p className={styles.note}>
            We've received your RSVP and can't wait to celebrate with you.
          </p>
        </div>
      </section>
    )
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

        <form className={styles.form} onSubmit={handleSubmit}>

          {showSagai && (
            <div className={styles.field}>
              <p className={styles.question}>Will you be joining us for the Sagai?</p>
              <RadioGroup name="coming_to_sagai" options={YES_NO} value={fields.coming_to_sagai} onChange={v => set('coming_to_sagai', v)} />
            </div>
          )}

          {showEvening && (
            <div className={styles.field}>
              <p className={styles.question}>Will you be joining us for the Evening?</p>
              <RadioGroup name="coming_to_evening" options={YES_NO} value={fields.coming_to_evening} onChange={v => set('coming_to_evening', v)} />
            </div>
          )}

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

          <div className={styles.field}>
            <p className={styles.question}>Will you be drinking alcohol?</p>
            <RadioGroup name="is_drinking_alcohol" options={YES_NO} value={fields.is_drinking_alcohol} onChange={v => set('is_drinking_alcohol', v)} />
          </div>

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

          {status === 'error' && (
            <p className={styles.errorMsg}>Something went wrong — please try again.</p>
          )}

          <button type="submit" className={styles.btn} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : '✦   Send RSVP   ✦'}
          </button>
        </form>

        <p className={styles.deadline}>Kindly respond by 1st August 2026</p>
      </div>
    </section>
  )
}
