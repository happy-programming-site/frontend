import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    quote: "I had zero coding experience before Happy AI. Now I have a working ML model, a GitHub portfolio, and I'm applying to CS programs at top universities. This place changed everything.",
    name: 'Jamie L.',
    info: 'Grade 11 · AI & ML Course',
    initials: 'JL',
    gradient: 'linear-gradient(135deg, #FF2D9B, #9B5DFF)',
    featured: false,
  },
  {
    quote: "The instructors are incredible. Super patient, always available, and they explain the 'why' behind everything — not just the 'how'. I learned more here than in two years of school CS class.",
    name: 'Maya K.',
    info: 'Grade 10 · Web Dev Course',
    initials: 'MK',
    gradient: 'linear-gradient(135deg, #00F5FF, #9B5DFF)',
    featured: true,
  },
  {
    quote: "I won my school science fair with an AI project I built here. The Gen AI course is next-level — I was working with real LLMs in week two. Nothing else comes close.",
    name: 'Ryan T.',
    info: 'Grade 12 · Generative AI',
    initials: 'RT',
    gradient: 'linear-gradient(135deg, #9B5DFF, #FF2D9B)',
    featured: false,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={`${styles.header} reveal`}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Student Stories</div>
        <h2>What our students say</h2>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className={`${styles.card} ${t.featured ? styles.featured : ''} reveal`}>
            <div className={styles.stars}>★★★★★</div>
            <blockquote>{t.quote}</blockquote>
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: t.gradient }}>{t.initials}</div>
              <div>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.info}>{t.info}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
