import React, { useEffect, useRef } from "react";
import Frame from "../common/Frame";
import { PROJECTS } from "../../data/portfolioData";

function handleMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function ProjectsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = Array.from(grid.querySelectorAll(".v-project-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v-section" id="projects">
      <div className="v-section-head">
        <span className="v-section-num">04</span>
        <h2 className="v-section-title">Projects</h2>
      </div>
      <div className="v-project-grid" ref={gridRef}>
        {PROJECTS.map((p, i) => (
          <Frame
            key={p.name}
            index={String(i + 1).padStart(2, "0")}
            className="v-project-card"
            onMouseMove={handleMove}
          >
            <h3>{p.name}</h3>
            <div className="v-project-org">{p.org}</div>
            <p className="v-project-desc">{p.desc}</p>
            {p.link && (
              <a className="v-project-link" href={p.link} target="_blank" rel="noreferrer">
                View on GitHub &#8599;
              </a>
            )}
            <div className="stat-row">
              {p.stats.map((s) => (
                <div key={s.l}>
                  <div className="stat-n">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </Frame>
        ))}
      </div>
    </section>
  );
}
