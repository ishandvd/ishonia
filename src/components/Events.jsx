import useReveal from './useReveal'
import styles from './Events.module.css'

function EventCard({ number, name, details, delay }) {
  const ref = useReveal()
  return (
    <div
      className={`${styles.card} reveal`}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <span className={styles.number}>{number} ✦</span>
      <h3 className={styles.name}>{name}</h3>
      {details.map((d, i) => (
        <div className={styles.detail} key={i}>
          <span className={styles.detailIcon}>{d.icon}</span>
          <span>
            <strong>{d.strong}</strong>
            {d.text}
            {d.tbc && <span className={styles.tbc}>TBC</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Events() {
  const headRef = useReveal()

  return (
    <section className={styles.events}>
      <div className={styles.inner}>
        <div className="reveal" ref={headRef}>
          <span className={styles.label}>✦ &nbsp; Save the Dates</span>
          <div className={styles.goldLine} />
          <h2 className={styles.title}>The Celebrations</h2>
          <p className={styles.intro}>
            We have two magical celebrations planned — some of you are invited to one, some to both.
            Your invitation will make clear which events are yours to celebrate with us.
          </p>
        </div>

        <div className={styles.grid}>
          <EventCard
            number="Event One"
            name="Indian Sagai and Lunch"
            delay="0s"
            details={[
              { icon: '📅', strong: 'Saturday, 15th August 2026', text: ' · 11.30am - 3pm' },
              { icon: '📍', strong: 'West Middlesex Golf Club', text: ' · Greenford Road, Hanwell, London' },
              { icon: '👗', strong: 'Indian Attire', text: ' — Traditional Indian or Formal Western Attire Welcome' },
            ]}
          />
          <EventCard
            number="Event Two"
            name="Evening Engagement Drinks Party"
            delay="0.15s"
            details={[
              { icon: '📅', strong: 'Saturday, 15th August 2026', text: ' · Evening celebration 7pm - 12am', tbc: true },
              { icon: '📍', strong: 'Central London', text: ' · Venue to be announced', tbc: true },
              { icon: '👗', strong: 'Formal', text: ' — black tie' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
