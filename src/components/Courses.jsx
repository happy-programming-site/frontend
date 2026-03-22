// REPLACE WITH these 3 lines:
import styles from "./Courses.module.css";
import { Link } from "react-router-dom";
import { COURSES } from "../data/courses";


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

              <Link to={`/enroll/${encodeURIComponent(c.title)}`} className={styles.link}>
               Enroll → 
               </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
