import styles from "./Footer.module.css";
import logo from "../assets/logo.png";

const LINKS = [
  ["#courses", "Courses"],
  ["#private", "Private Lessons"],
  ["#about", "About"],
  ["#faq", "FAQ"],
  ["#contact", "Contact"],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='/' className={styles.logo} aria-label='Happy Programming home'>
        <img src={logo} alt='Happy Programming' />
      </a>
      <p>© 2026 Happy Programming · McLean, VA</p>
      <div className={styles.links}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
