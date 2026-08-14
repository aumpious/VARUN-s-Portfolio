import React, { useState } from "react";
import Frame from "../common/Frame";
import { ACHIEVEMENTS, VOLUNTEER } from "../../data/portfolioData";

const CERTIFICATES = [
  {
    src: "/assets-certificate/fitt-iit-delhi.jpg",
    label: "INNOVATIVE BHARAT 3.0, FITT, IIT DELHI",
    sub: "Finalist, National Incubation Program",
  },
  {
    src: "/assets-certificate/tie-iit-kanpur.jpg",
    label: "TiE-U GLOBAL UP, IIT KANPUR",
    sub: "Rank 2, Team Lead, DDoS Protection SaaS",
  },
  {
    src: "/assets-certificate/innovative-bharat.jpg",
    label: "INNOVATIVE BHARAT 3.0",
    sub: "Rank 1, National Winner",
  },
];

export default function AchievementsSection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="v-section" id="achievements">
      <div className="v-section-head">
        <span className="v-section-num">05</span>
        <h2 className="v-section-title">Achievements &amp; leadership</h2>
      </div>
      <div className="v-cert-label">NATIONAL CERTIFICATES</div>
      <div className="v-cert-grid">
        {CERTIFICATES.map((c) => (
          <button
            key={c.src}
            className="v-cert-card"
            type="button"
            onClick={() => setLightbox(c)}
            aria-label={`View certificate: ${c.label}`}
          >
            <span className="v-cert-thumb">
              <img src={c.src} alt={c.label} loading="lazy" />
            </span>
            <div className="v-cert-meta">
              <span className="v-cert-title">{c.label}</span>
              <span className="v-cert-sub">{c.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="v-lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <figure className="v-lightbox__card" onClick={(e) => e.stopPropagation()}>
            <button
              className="v-lightbox__close"
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close certificate"
            >
              ✕
            </button>
            <img src={lightbox.src} alt={lightbox.label} />
            <figcaption>
              <div className="v-cert-title">{lightbox.label}</div>
              <div className="v-cert-sub">{lightbox.sub}</div>
            </figcaption>
          </figure>
        </div>
      )}

      <div className="v-ach-list">
        {ACHIEVEMENTS.map((a, i) => (
          <div className="v-ach-item" key={i}>
            <span className="v-ach-mark">{String(i + 1).padStart(2, "0")}</span>
            <span className="v-ach-text">{a}</span>
          </div>
        ))}
      </div>

      <div className="v-vol-grid">
        {VOLUNTEER.map((v) => (
          <Frame key={v.role} className="v-vol-card">
            <div className="v-vol-role">{v.role}</div>
            <div className="v-vol-meta">
              {v.org}, {v.time}
            </div>
            <div className="v-vol-desc">{v.desc}</div>
          </Frame>
        ))}
      </div>
    </section>
  );
}
