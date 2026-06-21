import { useState, useRef, useEffect } from 'react'
import useGuest from './useGuest'
import styles from './RSVP.module.css'
import content from '../content.yml'

const c = content.rsvp
const EVENT_NAMES = c.event_display_names

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

  useEffect(() => {
    if (ready && guest && localStorage.getItem(`rsvp_submitted_${guest.code}`)) {
      setStep('success')
    }
  }, [ready, guest])

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
    if (ok) localStorage.setItem(`rsvp_submitted_${guest.code}`, '1')
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
    if (ok) localStorage.setItem(`rsvp_submitted_${guest.code}`, '1')
    setStep(ok ? 'success' : 'error')
  }

  const header = (
    <>
      <span className={styles.label}>{c.label}</span>
      <div className={styles.goldLine} />
    </>
  )

  if (step === 'success') {
    return (
      <section id="rsvp" className={styles.rsvp}>
        <div className={styles.inner} ref={ref}>
          {header}
          <h2 className={styles.title}>{c.success.title}</h2>
          <p className={styles.note}>{c.success.note}</p>
        </div>
      </section>
    )
  }

  if (step === 'no_confirm') {
    return (
      <section id="rsvp" className={styles.rsvp}>
        <div className={styles.inner} ref={ref}>
          {header}
          <h2 className={styles.title}>{c.decline_confirm.title}</h2>
          <p className={styles.note}>{c.decline_confirm.note_before}</p>
          <ul className={styles.eventList}>
            {events.map(e => <li key={e} className={styles.eventItem}>{e}</li>)}
          </ul>
          <p className={styles.note}>{c.decline_confirm.note_after}</p>
          <div className={styles.confirmBtns}>
            <button className={styles.btnDecline} onClick={handleDeclineConfirm} type="button">
              {c.decline_confirm.btn_confirm}
            </button>
            <button className={styles.btnGhost} onClick={() => setStep('initial')} type="button">
              {c.decline_confirm.btn_back}
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
          <h2 className={styles.title}>{c.form.title}</h2>
          <p className={styles.note}>{c.form.note}</p>

          <form className={styles.form} onSubmit={handleFormSubmit}>
            {showSagai && (
              <div className={styles.field}>
                <p className={styles.question}>
                  {guest.inviteType === 'both' ? c.form.question_sagai_count : c.form.question_celebration_count}
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
                  {guest.inviteType === 'both' ? c.form.question_evening_count : c.form.question_celebration_count}
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
                <p className={styles.question}>{c.form.question_dietary}</p>
                <input
                  type="text"
                  className={styles.textInput}
                  placeholder={c.form.dietary_placeholder}
                  value={fields.dietary_restrictions}
                  onChange={e => set('dietary_restrictions', e.target.value)}
                />
              </div>
            )}

            {showEvening && (
              <div className={styles.field}>
                <p className={styles.question}>
                  {c.form.question_alcohol}
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
              <p className={styles.question}>{c.form.question_other}</p>
              <textarea
                className={styles.textarea}
                placeholder={c.form.other_placeholder}
                rows={3}
                value={fields.anything_else}
                onChange={e => set('anything_else', e.target.value)}
              />
            </div>

            {step === 'error' && (
              <p className={styles.errorMsg}>{c.form.error}</p>
            )}

            <button type="submit" className={styles.btn} disabled={step === 'submitting'}>
              {step === 'submitting' ? c.form.btn_submitting : c.form.btn_submit}
            </button>
          </form>

          <p className={styles.deadline}>{c.deadline}</p>
        </div>
      </section>
    )
  }

  // initial
  return (
    <section id="rsvp" className={styles.rsvp}>
      <div className={styles.inner} ref={ref}>
        {header}
        <h2 className={styles.title}>{c.initial.title}</h2>
        <p className={styles.note}>
          {c.initial.note.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </p>
        <div className={styles.yesNo}>
          <button className={styles.btnYes} onClick={() => setStep('form')} type="button">
            {c.initial.btn_yes}
          </button>
          <button className={styles.btnNo} onClick={() => setStep('no_confirm')} type="button">
            {c.initial.btn_no}
          </button>
        </div>
        <p className={styles.deadline}>{c.deadline}</p>
      </div>
    </section>
  )
}
