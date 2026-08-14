import React, { useEffect, useRef } from "react";
import Frame from "../common/Frame";
import { SKILL_GROUPS } from "../../data/portfolioData";

export default function SkillsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(grid.querySelectorAll(".v-skill-card"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const mid = window.innerHeight / 2;
      let best = null;
      let bestDist = Infinity;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center < 0 || center > window.innerHeight) return;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = c;
        }
      });
      cards.forEach((c) => c.classList.toggle("is-colored", c === best));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="v-section" id="skills">
      <div className="v-section-head">
        <span className="v-section-num">02</span>
        <h2 className="v-section-title">Skills</h2>
      </div>
      <div className="v-skill-grid" ref={gridRef}>
        {SKILL_GROUPS.map((g, i) => (
          <Frame key={g.label} index={String(i + 1).padStart(2, "0")} className="v-skill-card">
            <h4>{g.label}</h4>
            <div className="chip-row">
              {g.items.map((it) => (
                <span className="chip" key={it}>
                  {it}
                </span>
              ))}
            </div>
          </Frame>
        ))}
      </div>
    </section>
  );
}
