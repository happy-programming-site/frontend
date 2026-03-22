import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <a href='#' className={styles.logo}>
        Happy Programming
      </a>
      <ul className={styles.links}>
        <li>
          <a
            href='#courses'
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span className={styles.fire}>🔥</span>
            <span className={styles.summerLink}>2026 Summer Camp</span>
          </a>
        </li>

        {/* <li>
          <a href='#pricing'>Pricing</a>
        </li> */}
        <li>
          <a href='#private'>Private</a>
        </li>
        <li>
          <a href='#about'>About</a>
        </li>
        <li>
          <a href='#faq'>FAQ</a>
        </li>
      </ul>
      <a href='#contact' className={styles.cta}>
        Enroll Now
      </a>
    </nav>
  );
}
