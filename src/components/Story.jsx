import useReveal from './useReveal'
import styles from './Story.module.css'
import storyImage from '../assets/our-story.jpg'
import content from '../content.yml'

const c = content.story

export default function Story() {
  const ref = useReveal()

  return (
    <section className={styles.story}>
      <div className={`${styles.inner} reveal`} ref={ref}>
        <img src={storyImage} alt={c.image_alt} className={styles.image} />

        <div className={styles.text}>
          <span className={styles.label}>{c.label}</span>
          <div className={styles.goldLine} />
          <h2 className={styles.title}>{c.title}</h2>
          <div className={styles.body}>
            <p>{c.paragraph1}</p>
            <br />
            <p>{c.paragraph2}</p>
            <br />
            <p className={styles.quote}>{c.quote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
