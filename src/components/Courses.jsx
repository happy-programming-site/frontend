import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { COURSES } from "../data/courses";

const ROTATE_MS = 3000; // advance one row every 3s
const TRANSITION_MS = 450; // scroll animation length
const MOBILE_MQ = "(max-width: 768px)";

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

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

  // On phones only one course fits per row, so advance one course at a time;
  // on wider screens rows hold two courses.
  const [perRow, setPerRow] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia(MOBILE_MQ).matches
      ? 1
      : 2,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => setPerRow(mq.matches ? 1 : 2);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const rows = useMemo(() => chunk(COURSES, perRow), [perRow]);
  const visibleRows = perRow === 1 ? 3 : 2;
  // Only clone as many rows as the window shows — enough for a seamless
  // wrap without tabbing through every course twice.
  const loopRows = useMemo(
    () => [...rows, ...rows.slice(0, visibleRows)],
    [rows, visibleRows],
  );

  // Reset the carousel to the top whenever the grouping changes
  // (the track remounts via key={perRow}, so refs re-attach on their own).
  useEffect(() => {
    setRow(0);
    setAnimate(true);
  }, [perRow]);

  // Measure the height of `visibleRows` rows (capped so tall poster rows
  // don't make the window enormous).
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const els = rowRefs.current;
      if (!els[0]) return;
      const bottom = els[visibleRows] || els[rows.length - 1];
      if (!bottom) return;
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
  }, [reducedMotion, visibleRows, rows.length]);

  // Advance one row on an interval.
  useEffect(() => {
    if (paused || lightbox || reducedMotion) return;
    const t = setTimeout(() => setRow((r) => r + 1), ROTATE_MS);
    return () => clearTimeout(t);
  }, [row, paused, lightbox, reducedMotion]);

  // After scrolling through one full set, jump back to the top with no
  // transition so the loop looks continuous.
  useEffect(() => {
    if (row < rows.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setRow((r) => r - rows.length);
    }, TRANSITION_MS + 20);
    return () => clearTimeout(t);
  }, [row, rows.length]);

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

  const rowsToRender = reducedMotion ? rows : loopRows;

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
          key={perRow}
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
          {rowsToRender.map((r, ri) => {
            const clone = ri >= rows.length;
            return (
              <div
                className={styles.carRow}
                key={ri}
                ref={(el) => (rowRefs.current[ri] = el)}
                aria-hidden={clone ? "true" : undefined}
                {...(clone ? { inert: "" } : {})}
              >
                {r.map(renderCard)}
              </div>
            );
          })}
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
