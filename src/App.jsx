import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import PrivateLessons from "./components/PrivateLessons";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EnrollPage from "./components/EnrollPage";

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Courses />
      <Hero />
      <PrivateLessons />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}



export default function App() {
  return (
    <BrowserRouter basename="/frontend">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/enroll/:courseTitle' element={<EnrollPage />} />
      </Routes>
    </BrowserRouter>
  );
}