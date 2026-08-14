import React from "react";
import { EXPERIENCE } from "../../data/portfolioData";

export default function ExperienceSection() {
  return (
    <section className="v-section" id="experience">
      <div className="v-section-head">
        <span className="v-section-num">03</span>
        <h2 className="v-section-title">Experience</h2>
      </div>
      <div className="v-timeline">
        {EXPERIENCE.map((e) => (
          <div className="v-tl-item" key={e.role + e.org}>
            <div className="v-tl-time">{e.time}</div>
            <div>
              <h3 className="v-tl-role">{e.role}</h3>
              <div className="v-tl-org">{e.org}</div>
              <ul className="v-tl-points">
                {e.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
