import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import CardSpotlight from "./CardSpotlight";


// ─── EmailJS config ────────────────────────────────────────────────────────
// 1. Sign up free at https://emailjs.com (200 emails/month)
// 2. Add Gmail service → connect varunsharma2949@gmail.com
// 3. Create a template with variables: {{from_name}}, {{reply_to}}, {{message}}
// 4. Paste your IDs below
const EJS_SERVICE  = "service_rbw6fsa";
const EJS_TEMPLATE = "template_jtad8oh";
const EJS_PUBLIC   = "tMdw0x6Ua0-IJuX1b";

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => nameRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");

    try {
      const result = await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: form.name,
          reply_to:  form.email,
          message:   form.message,
        },
        { publicKey: EJS_PUBLIC }  // v4 requires an options object, not a plain string
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err?.text || err);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmodal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Varun Kumar"
    >
      <CardSpotlight className="cmodal-box">
        {/* Close */}
        <button className="cmodal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* LEFT: info panel */}
        <div className="cmodal-left">
          <span className="cmodal-kicker">CONTACT</span>
          <h2 className="cmodal-headline">Let's build<br />something.</h2>
          <p className="cmodal-desc">
            Open to Software Developer roles, freelance projects, and hard problems.
            The fastest way to reach me is right here.
          </p>

          <ul className="cmodal-links">
            <li>
              <span className="cmodal-link-icon">✉</span>
              <a href="mailto:varunsharma2949@gmail.com">varunsharma2949@gmail.com</a>
            </li>
            <li>
              <span className="cmodal-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </span>
              <a href="https://github.com/aumpious" target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <span className="cmodal-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </span>
              <a href="https://linkedin.com/in/aumpious" target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <span className="cmodal-link-icon">📍</span>
              <span>Delhi, India</span>
            </li>
          </ul>
        </div>

        {/* RIGHT: form */}
        <div className="cmodal-right">
          {status === "sent" ? (
            <div className="cmodal-success">
              <div className="cmodal-success-icon">✓</div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              <button className="cmodal-btn" onClick={onClose}>Close</button>
            </div>
          ) : (
            <form className="cmodal-form" onSubmit={handleSubmit} noValidate>
              <div className="cmodal-row">
                <div className="cmodal-field">
                  <label className="cmodal-label" htmlFor="cmodal-name">NAME</label>
                  <input
                    ref={nameRef}
                    id="cmodal-name"
                    className="cmodal-input"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="cmodal-field">
                  <label className="cmodal-label" htmlFor="cmodal-email">EMAIL</label>
                  <input
                    id="cmodal-email"
                    className="cmodal-input"
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="cmodal-field">
                <label className="cmodal-label" htmlFor="cmodal-message">MESSAGE</label>
                <textarea
                  id="cmodal-message"
                  className="cmodal-input cmodal-textarea"
                  name="message"
                  placeholder="Hey Varun, we're hiring and your work stood out."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <button
                className="cmodal-btn cmodal-send"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : <>Send message <span className="cmodal-arrow">→</span></>}
              </button>

              <p className="cmodal-note">I usually reply within 24 hours.</p>
            </form>
          )}
        </div>
      </CardSpotlight>
    </div>
  );
}
