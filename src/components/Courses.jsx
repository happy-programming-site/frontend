import styles from "./Courses.module.css";

const COURSES = [
  {
    icon: "🐍",
    level: "Beginner",
    levelClass: "begin",
    title: "Intro to Python",
    desc: "Start from zero. Learn the language powering AI, data science, and automation with hands-on mini-projects.",
    time: "10:00PM-5:00PM, Jun 22 - Jun 26",
    price: "$1200",
    line: "linear-gradient(90deg, #00FF88, #00F5FF)",
  },
  {
    icon: "🐍",
    level: "Beginner",
    levelClass: "begin",
    title: "Intro to Java",
    desc: "Start from zero. Learn the language powering AI, data science, and automation with hands-on mini-projects.",
    meta: "8 weeks · No prereqs",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1200",
    line: "linear-gradient(90deg, #00FF88, #00F5FF)",
  },
  {
    icon: "🧠",
    level: "Intermediate",
    levelClass: "inter",
    title: "AI for fun",
    desc: "Train real models. Build neural networks. Classify images, predict outcomes, and understand how AI thinks.",
    meta: "No coding experience required",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1300",
    line: "linear-gradient(90deg, #00F5FF, #9B5DFF)",
  },
  {
    icon: "🌐",
    level: "Beginner",
    levelClass: "begin",
    title: "Web Development",
    desc: "Build and ship your own websites. Master HTML, CSS, and JS — graduate with a live portfolio.",
    meta: "6 weeks · No prereqs",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1500",
    line: "linear-gradient(90deg, #9B5DFF, #FF2D9B)",
  },
  {
    icon: "🤖",
    level: "Advanced",
    levelClass: "adv",
    title: "Generative AI",
    desc: "Build with LLMs, image generators, and AI APIs. Create projects that impress any admissions officer.",
    meta: "8 weeks · ML knowledge",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1500",
    line: "linear-gradient(90deg, #FF2D9B, #9B5DFF)",
  },
];

export default function Courses() {
  return (
    <section id='courses' className={styles.section}>
      <div className={`${styles.top} reveal`}>
        <div>
          <div className='section-label'>
            <span className={styles.fire}>🔥</span>
            2026 Summer Camp
          </div>
          <h2>Choose Your Path</h2>
          <p className='section-sub'>
            Every course is project-based and taught by working engineers. No
            boring lectures.
          </p>
        </div>
        <a href='#contact' className='btn-primary'>
          View All →
        </a>
      </div>
      <div className={styles.grid}>
        {COURSES.map((c) => (
          <div
            key={c.title}
            className={`${styles.card} reveal`}
            style={{ "--line": c.line }}
          >
            <div className={styles.icon}>{c.icon}</div>
            <span className={`${styles.badge} ${styles[c.levelClass]}`}>
              {c.level}
            </span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            {c.time && <h6>{c.time}</h6>}
            {c.meta && <h6>{c.meta}</h6>}
            <div className={styles.footer}>
              {c.price && (
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "#FFD700",
                    fontWeight: 700,
                  }}
                >
                  price: {c.price}
                </span>
              )}
              <a href='#contact' className={styles.link}>
                Enroll →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
