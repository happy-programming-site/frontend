import { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <a href='/' className={styles.logo} aria-label='Happy Programming home'>
        <img src={logo} alt='Happy Programming' />
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        <li>
          <a
            href='#courses'
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span className={styles.fire}>🔥</span>
            <span className={styles.summerLink}>2026 Fall</span>
          </a>
        </li>
        <li>
          <a href='#private'>Private</a>
        </li>
        <li>
          <a href='#about'>About</a>
        </li>
        <li>
          <a href='https://happyresearch.org/' target='_blank' rel='noreferrer'>
            happyResearch
          </a>
        </li>
        <li>
          <a href='#faq'>FAQ</a>
        </li>
      </ul>

      <a href='#contact' className={styles.cta}>
        Contact Us
      </a>

      {/* Hamburger button */}
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {open && (
        <ul className={styles.mobileMenu} onClick={() => setOpen(false)}>
          <li>
            <a href='#courses'>🔥 2026 Fall</a>
          </li>
          <li>
            <a href='#private'>Private</a>
          </li>
          <li>
            <a href='#about'>About</a>
          </li>
          <li>
            <a
              href='https://happyresearch.org/'
              target='_blank'
              rel='noreferrer'
            >
              happy research
            </a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
          <li>
            <a href='#contact'>Contact Us</a>
          </li>
        </ul>
      )}
    </nav>
  );
}
