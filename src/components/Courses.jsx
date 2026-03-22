import styles from "./Courses.module.css";

const COURSES = [
  {
    icon: "🐍",
    level: "Beginner",
    levelClass: "begin",
    title: "Intro to Python",
    desc: "A beginner Python course covering the essentials: variables and data types, control flow (if/else, loops), functions, and core data structures (lists, dictionaries). Students finish by building a small real-world project like a quiz game or expense tracker, leaving with both foundational skills and something to show for it..",
    time: "10:00PM-5:00PM, Jun 22 - Jun 26",
    price: "$1200",
    line: "linear-gradient(90deg, #2DCB85, #4A8FE2)",
  },
  {
    icon: "🐍",
    level: "Beginner",
    levelClass: "begin",
    title: "Intro to Java",
    desc: "A beginner Java course covering a week structured, typed programming: declaring variables with explicit types, understanding how classes and objects work, control flow, arrays and ArrayLists, and the basics of inheritance. Students wrap up by building a project that puts OOP into practice, walking away with a solid grasp of how real-world Java applications are structured.",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1200",
    line: "linear-gradient(90deg, #4A8FE2, #9B6BFF)",
  },
  {
    icon: "🧠",
    level: "Beginner",
    levelClass: "inter",
    title: "AI Camp I - AI explorer",
    desc: "A hands-on AI Explorer camp where students discover how artificial intelligence actually works — no coding experience required. Over the course, students will work on projects are the focus throughout, wrapping up with a working AI demo students can show off to friends, family, and college applications.",
    meta: "No coding experience required",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1300",
    line: "linear-gradient(90deg, #FF9F1C, #FF6B4A)",
  },
  {
    icon: "🌐",
    level: "intermediate",
    levelClass: "begin",
    title: "AI Camp I - Computer Vision",
    desc: "teaches algorithms to interpret and understand visual data (images/videos), mimicking human sight to recognize objects, people, and scenes.",
    meta: "Python coding experience required",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1500",
    line: "linear-gradient(90deg, #9B6BFF, #FF6BA8)",
  },
  {
    icon: "🤖",
    level: "Advanced",
    levelClass: "adv",
    title: "AI Camp II - Generative AI (LLM)",
    desc: "Build with LLMs, image generators, and AI APIs. Create projects that impress any admissions officer.",
    meta: "Python coding experience required",
    time: "10:00AM-5:00PM, Jun 29 - July 3",
    price: "$1500",
    line: "linear-gradient(90deg, #FF6B4A, #FF6BA8)",
  },
];

export default function Courses() {
  return (
    <section id='courses' className={styles.section}>
      <div className={`${styles.top} reveal`}>
        <div>
          <div className='section-label'>
            <span className={styles.fire}>🔥</span>
            <span className={styles.summerLink}>2026 Summer Camp</span>{" "}
            {/* added */}
          </div>
          {/* <h2>Choose Your Path</h2> */}
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
                    color: "var(--coral)",
                    fontWeight: 800,
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
