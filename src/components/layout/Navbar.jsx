import React, { useState, useEffect } from "react";
import { NAV } from "../../data/portfolioData";

export default function Navbar({ onGetInTouch }) {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (navOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [navOpen]);

  return (
    <>
      <nav className="v-nav">
        <a className="v-nav__name" href="#top">Varun</a>
        <div className="v-nav__links">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "is-active" : ""}
            >
              {n.label}
            </a>
          ))}
        </div>
        <button
          className="v-nav__cta"
          onClick={onGetInTouch}
          title="Get in touch"
        >
          Get in touch
          <span className="v-nav__cta-arrow" aria-hidden="true">→</span>
        </button>
        <button
          className="v-nav__burger"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
        >
          MENU
        </button>
      </nav>

      {navOpen && (
        <div className="v-nav__mobile open">
          <button
            className="v-nav__mobile-close"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setNavOpen(false)}>
              {n.label}
            </a>
          ))}
          <button
            className="btn btn--primary"
            onClick={() => {
              setNavOpen(false);
              onGetInTouch();
            }}
          >
            Get in touch
          </button>
        </div>
      )}
    </>
  );
}
