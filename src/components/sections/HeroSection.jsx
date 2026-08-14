import React, { useRef } from "react";
import InteractiveTerminal from "../common/InteractiveTerminal";

export default function HeroSection({ onOpenResume }) {
  const workBtnRef = useRef(null);

  const handleWorkMove = (e) => {
    const btn = workBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transition = "transform 0.12s ease-out";
    btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
  };

  const handleWorkLeave = () => {
    const btn = workBtnRef.current;
    if (!btn) return;
    btn.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    btn.style.transform = "";
  };
  return (
    <header id="top" className="v-hero">

      {/* LEFT — Content */}
      <div className="v-hero__left">
        <div className="v-hero__status">
          <span className="v-hero__status-dot" />
          Open to Software Developer roles
        </div>

        <h1 className="v-h1 v-hero__headline">
          I build across<br />
          the full stack,<br />
          from the interface<br />
          to the <span className="v-hero__accent">systems beneath it.</span>
        </h1>

        <p className="v-lede">
          I build full-stack software{" "}
          <span className="v-hero__hl">people actually use</span>, and I
          understand it{" "}
          <span className="v-hero__hl">the whole way down</span> to the
          systems most apps just sit on top of. Give me the hardest problem in
          your stack, the one that has to hold, and I'll{" "}
          <span className="v-hero__hl">own it end to end</span>.
        </p>

        <div className="v-hero-actions">
          <a
            ref={workBtnRef}
            className="btn btn--primary btn--magnetic"
            href="#projects"
            onMouseMove={handleWorkMove}
            onMouseLeave={handleWorkLeave}
          >
            See the work <span className="btn-arrow">→</span>
          </a>
          <button className="btn btn--text" onClick={onOpenResume}>RESUME ↗</button>
        </div>
      </div>

      {/* RIGHT — Terminal */}
      <div className="v-hero__right">
        <InteractiveTerminal />
      </div>

    </header>
  );
}
