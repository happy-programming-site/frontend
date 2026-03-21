import styles from "./Hero.module.css";

const CODE_LINES = [
  {
    parts: [
      { c: "cyan", t: "import " },
      { c: "white", t: "tensorflow " },
      { c: "cyan", t: "as " },
      { c: "white", t: "tf" },
    ],
  },
  {
    parts: [
      { c: "cyan", t: "from " },
      { c: "white", t: "openai " },
      { c: "cyan", t: "import " },
      { c: "white", t: "OpenAI" },
    ],
  },
  { parts: [{ c: "muted", t: " " }] },
  { parts: [{ c: "muted", t: "# Build your AI model 🚀" }] },
  {
    parts: [
      { c: "purple", t: "model" },
      { c: "white", t: " = tf.keras." },
      { c: "pink", t: "Sequential" },
      { c: "white", t: "([" },
    ],
  },
  {
    parts: [
      { c: "white", t: "  layers." },
      { c: "pink", t: "Dense" },
      { c: "white", t: "(" },
      { c: "green", t: "256" },
      { c: "white", t: ", activation=" },
      { c: "green", t: "'relu'" },
      { c: "white", t: ")," },
    ],
  },
  {
    parts: [
      { c: "white", t: "  layers." },
      { c: "pink", t: "Dense" },
      { c: "white", t: "(" },
      { c: "green", t: "10" },
      { c: "white", t: ", activation=" },
      { c: "green", t: "'softmax'" },
      { c: "white", t: ")" },
    ],
  },
  { parts: [{ c: "white", t: "])" }] },
  { parts: [{ c: "muted", t: " " }] },
  {
    parts: [
      { c: "muted", t: "✦ Accuracy: " },
      { c: "green", t: "96.4%" },
      { c: "muted", t: " — great work!" },
    ],
  },
];

const colorMap = {
  cyan: "#00F5FF",
  purple: "#9B5DFF",
  pink: "#FF2D9B",
  green: "#00FF88",
  white: "#fff",
  muted: "#6B6B9A",
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ${styles.glow1}`} />
      <div className={`${styles.glow} ${styles.glow2}`} />
      <div className={`${styles.glow} ${styles.glow3}`} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            DMV area · For High School Students
          </div>
          <h1 className={styles.h1}>
            <span className='grad-text'>Happy Programming</span>
          </h1>
          <p className={styles.sub}>
            Learn to code. Build with AI. Shape the future. Our programs turn
            curious high schoolers into confident builders — through real
            projects and expert mentors.
          </p>
          <div className={styles.actions}>
            <a href='#courses' className='btn-primary'>
              Explore Courses →
            </a>
            <a href='#about' className='btn-ghost'>
              How it works
            </a>
          </div>
          <div className={styles.stats}>
            {[
              ["200+", "Students trained"],
              ["12", "Courses"],
              ["4.9★", "Avg rating"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.terminal}>
            <div className={styles.termBar}>
              <span className={`${styles.dot} ${styles.dotR}`} />
              <span className={`${styles.dot} ${styles.dotY}`} />
              <span className={`${styles.dot} ${styles.dotG}`} />
              <span className={styles.termTitle}>happy_ai_project.py</span>
            </div>
            <div className={styles.termBody}>
              {CODE_LINES.map((line, i) => (
                <div key={i} className={styles.codeLine}>
                  {line.parts.map((p, j) => (
                    <span key={j} style={{ color: colorMap[p.c] }}>
                      {p.t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.aiPill}>
            <div className={styles.aiIcon}>🤖</div>
            <div>
              <strong>AI Mentor Feedback</strong>
              <p>
                Your model is performing excellently! Try dropout layers to push
                past 97%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
