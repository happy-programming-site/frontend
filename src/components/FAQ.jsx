import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    q: "Do I need any prior experience to enroll?",
    a: "Not at all! Our beginner courses (Introduction to Python and Introduction to Java) are designed for students with zero experience. We start from the very basics and build up from there.",
  },
  {
    q: "What age group do you teach?",
    a: "Our programs are designed for middle and high school students in grades 7–12. All content, pacing, and projects are tailored to this age group.",
  },
  {
    q: "Are classes in-person or online?",
    a: "We offer both! Group courses are available in-person at our McLean, VA location and fully online. Private lessons can be done either way — your choice.",
  },
  {
    q: "How many students are in each class?",
    a: "We cap group courses at 5 students to ensure every student gets personal attention from the instructor. For private lessons, it's just you and your mentor.",
  },
  {
    q: "Will I get a certificate when I finish?",
    a: "Yes! All students who complete a course receive a certificate of completion, and research-track students finish with a science-fair-ready project and poster.",
  },
  {
    q: "When do courses start?",
    a: "Courses run on a semester schedule — our next term is Fall 2026 (September through December). Seats are limited, so we recommend enrolling early. Reach out via the contact form with any questions.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id='faq' className={styles.section}>
      <div className={`${styles.header} reveal`}>
        <div className='section-label'>FAQ</div>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className={styles.list}>
        {FAQS.map((item, i) => (
          <div key={i} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{item.q}</span>
              <span
                className={`${styles.icon} ${open === i ? styles.iconOpen : ""}`}
                aria-hidden='true'
              >
                +
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role='region'
              className={`${styles.answer} ${open === i ? styles.answerOpen : ""}`}
            >
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
