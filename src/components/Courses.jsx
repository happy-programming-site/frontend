import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { COURSES } from "../data/courses";

const ROTATE_MS = 3000; // advance one row every 3s
const TRANSITION_MS = 450; // scroll animation length
const VISIBLE_ROWS = 2;
const PER_ROW = 2;

// Group the courses into rows, then duplicate the set for a seamless loop.
const ROWS = [];
for (let i = 0; i < COURSES.length; i += PER_ROW) {
  ROWS.push(COURSES.slice(i, i + PER_ROW));
}
const LOOP_ROWS = [...ROWS, ...ROWS];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const navigate = useNavigate();

  // --- auto-rotating carousel state ---
  const [row, setRow] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [viewportH, setViewportH] = useState(null);
  const rowRefs = useRef([]);
  const reducedMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Measure the height of VISIBLE_ROWS rows (capped so tall poster rows
  // don't make the window enormous).
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const els = rowRefs.current;
      if (!els[0]) return;
      const bottom = els[VISIBLE_ROWS] || els[ROWS.length - 1];
      const h = bottom.offsetTop - els[0].offsetTop;
      const cap = Math.round(window.innerHeight * 0.85);
      setViewportH(Math.min(h, cap));
    };
    measure();
    const ro = new ResizeObserver(measure);
    rowRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion]);

  // Advance one row on an interval.
  useEffect(() => {
    if (paused || lightbox || reducedMotion) return;
    const t = setTimeout(() => setRow((r) => r + 1), ROTATE_MS);
    return () => clearTimeout(t);
  }, [row, paused, lightbox, reducedMotion]);

  // After scrolling through one full set, jump back to the top with no
  // transition so the loop looks continuous.
  useEffect(() => {
    if (row < ROWS.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setRow((r) => r - ROWS.length);
    }, TRANSITION_MS + 20);
    return () => clearTimeout(t);
  }, [row]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

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

  // translateY that puts `row` at the top of the window.
  const els = rowRefs.current;
  const shiftY =
    els[row] && els[0] ? els[row].offsetTop - els[0].offsetTop : 0;

  const renderCard = (c) =>
    c.poster ? (
      <div
        key={c.title}
        className={`${styles.card} ${styles.posterCard}`}
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
            <span className={styles.priceTag}>
              In-person {c.price}
              {c.onlinePrice && (
                <>
                  {" · "}
                  Online {c.onlinePrice}
                </>
              )}
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
      <div key={c.title} className={styles.card} style={{ "--line": c.line }}>
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
    );

  const rowsToRender = reducedMotion ? ROWS : LOOP_ROWS;

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

      <div
        className={`${styles.carousel} ${reducedMotion ? styles.carouselStatic : ""} reveal`}
        style={!reducedMotion && viewportH ? { height: viewportH } : undefined}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={styles.track}
          style={
            reducedMotion
              ? undefined
              : {
                  transform: `translateY(-${shiftY}px)`,
                  transition: animate
                    ? `transform ${TRANSITION_MS}ms ease`
                    : "none",
                }
          }
        >
          {rowsToRender.map((r, ri) => (
            <div
              className={styles.carRow}
              key={ri}
              ref={(el) => (rowRefs.current[ri] = el)}
              aria-hidden={ri >= ROWS.length ? "true" : undefined}
            >
              {r.map(renderCard)}
            </div>
          ))}
        </div>
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
