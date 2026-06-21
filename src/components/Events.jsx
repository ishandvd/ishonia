import useReveal from './useReveal'
import useGuest from './useGuest'
import styles from './Events.module.css'
import content from '../content.yml'
import VenueMap from './VenueMap'

const ce = content.events

function detailRows(ev) {
  return [ev.date, ev.location, ev.dress_code]
}

function EventCard({ eventKey, delay }) {
  const ref = useReveal()
  const ev = ce[eventKey]
  return (
    <div
      className={`${styles.card} reveal`}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <span className={styles.number}>{ev.number} ✦</span>
      <h3 className={styles.name}>{ev.name}</h3>
      {detailRows(ev).map((d, i) => (
        <div className={styles.detail} key={i}>
          <span className={styles.detailIcon}>{d.icon}</span>
          <span>
            <strong>{d.strong}</strong>
            {d.text}
            {d.tbc && <span className={styles.tbc}>TBC</span>}
          </span>
        </div>
      ))}
      {ev.location.lat && ev.location.lng && (
        <VenueMap lat={ev.location.lat} lng={ev.location.lng} label={ev.location.strong} />
      )}
    </div>
  )
}

export default function Events() {
  const headRef = useReveal()
  const { guest, ready } = useGuest()

  const showEvent1 = guest?.inviteType === 'event_1' || guest?.inviteType === 'both'
  const showEvent2 = guest?.inviteType === 'event_2' || guest?.inviteType === 'both'
  const both = showEvent1 && showEvent2

  return (
    <section className={styles.events}>
      <div className={styles.inner}>
        <div className="reveal" ref={headRef}>
          <span className={styles.label}>{ce.label}</span>
          <div className={styles.goldLine} />
          <h2 className={styles.title}>{both ? ce.title : ce.title_single}</h2>
          {both && (
            <p className={styles.intro}>{ce.both_intro}</p>
          )}
        </div>

        <div className={both ? styles.grid : styles.gridSingle}>
          {showEvent1 && <EventCard key="event1" eventKey="event1" delay="0s" />}
          {showEvent2 && <EventCard key="event2" eventKey="event2" delay="0.15s" />}
        </div>
      </div>
    </section>
  )
}
