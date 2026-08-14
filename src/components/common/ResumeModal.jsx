import React from "react";
import Frame from "./Frame";

const RESUME_PDF = `${import.meta.env.BASE_URL}assets-resume/Varun-Kumar-Resume.pdf`;

export default function ResumeModal({ isOpen, onClose, onCopyEmail }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.open(RESUME_PDF, "_blank");
  };

  return (
    <div className="v-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="v-modal-content v-modal-content--resume" onClick={(e) => e.stopPropagation()}>
        <Frame label="CURRICULUM VITAE" className="v-resume-frame">
          <div className="v-resume-header">
            <div>
              <h2 className="v-resume-title">VARUN KUMAR</h2>
              <p className="v-resume-subtitle">Software Engineer</p>
              <div className="v-resume-meta">
                <button className="v-resume-link-btn" onClick={onCopyEmail}>
                  ✉️ varunsharma2949@gmail.com
                </button>
                <span> | </span>
                <a href="https://linkedin.com/in/aumpious" target="_blank" rel="noreferrer">
                  linkedin.com/in/aumpious
                </a>
                <span> | </span>
                <a href="https://github.com/aumpious" target="_blank" rel="noreferrer">
                  github.com/aumpious
                </a>
              </div>
            </div>
            <div className="v-resume-actions">
              <a
                className="btn btn--primary v-resume-action-btn"
                href={RESUME_PDF}
                target="_blank"
                rel="noreferrer"
                download="Varun-Kumar-Resume.pdf"
              >
                ⬇️ Download PDF
              </a>
              <button className="icon-btn v-resume-close-btn" onClick={onClose} title="Close Resume">
                ✕
              </button>
            </div>
          </div>

          <div className="v-resume-viewer">
            <iframe
              src={RESUME_PDF}
              title="Varun Kumar Resume"
              className="v-resume-pdf"
              loading="lazy"
            />
          </div>
        </Frame>
      </div>
    </div>
  );
}
