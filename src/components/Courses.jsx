import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { COURSES } from "../data/courses";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  function handleEnroll() {
    if (selectedCourse) {
      navigate(`/enroll/${encodeURIComponent(selectedCourse)}`);
    }
  }

  return (
    <section id='courses' className={styles.section}>
      <div className={`${styles.top} reveal`}>
        <div>
          <div className='section-label'>
            <span className={styles.fire}>🔥</span>
            <span className={styles.summerLink}>2026 Fall</span>{" "}
          </div>
          <p className='section-sub'>
            At Happy Programming, every course is project-based and led by
            experienced engineers, research scientists, and university
            professors. Carefully designed for students of all ages and
            backgrounds, our programs blend fun, deep learning, inspiration, and
            cutting-edge technology—creating an engaging, hands-on experience
            with no boring lectures, only meaningful learning.
          </p>
        </div>
        <div className={styles.enrollDropdown}>
          <select
            className={styles.dropdownSelect}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value=''>View All Courses</option>
            {COURSES.map((c) => (
              <option key={c.title} value={c.title}>
                {c.icon} {c.title}
              </option>
            ))}
          </select>
          <button
            className='btn-primary'
            onClick={handleEnroll}
            disabled={!selectedCourse}
          >
            Enroll →
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {COURSES.map((c) =>
          c.poster ? (
            <div
              key={c.title}
              className={`${styles.card} ${styles.posterCard} reveal`}
              style={{ "--line": c.line }}
            >
              <button
                type='button'
                className={styles.posterBtn}
                onClick={() => setLightbox(c)}
              >
                <img
                  src={c.poster}
                  alt={`${c.title} course flyer`}
                  className={styles.posterImg}
                  loading='lazy'
                />
                <span className={styles.posterZoom}>Click to enlarge</span>
              </button>
              <h3>{c.title}</h3>
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
                <Link
                  to={`/enroll/${encodeURIComponent(c.title)}`}
                  className={styles.link}
                >
                  Enroll →
                </Link>
              </div>
            </div>
          ) : (
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
              <p>Grade: {c.grade}</p>
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
                <Link
                  to={`/enroll/${encodeURIComponent(c.title)}`}
                  className={styles.link}
                >
                  Enroll →
                </Link>
              </div>
            </div>
          ),
        )}
      </div>

      {lightbox && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role='dialog'
          aria-modal='true'
          aria-label={`${lightbox.title} course flyer`}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label='Close'
            >
              ✕
            </button>
            <img
              src={lightbox.poster}
              alt={`${lightbox.title} course flyer`}
              className={styles.lightboxImg}
            />
          </div>
        </div>
      )}
    </section>
  );
}
