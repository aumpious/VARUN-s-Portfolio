import React, { useState, useEffect, useRef, useCallback } from "react";
import Frame from "../common/Frame";
import { SYSTEM_PROMPT, GREETING } from "../../data/resumeContext";
import { useTypewriter } from "../../hooks/useTypewriter";

export default function NovaCompanion() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  const typedGreeting = useTypewriter(GREETING, greeted, 18);

  const speak = useCallback(
    (text) => {
      if (!voiceOn || !("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1;
        u.pitch = 1;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    },
    [voiceOn]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setGreeted(true);
      speak(GREETING);
    }, 1200);
    return () => clearTimeout(t);
  }, [speak]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = useCallback(
    async (text) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;
      const next = [...messages, { role: "user", content }];
      setMessages(next);
      setInput("");
      setLoading(true);
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 300,
            system: SYSTEM_PROMPT,
            messages: next.map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await response.json();
        const reply =
          data?.content?.map((b) => (b.type === "text" ? b.text : "")).join("").trim() ||
          "Something interrupted that. Try again?";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        speak(reply);
      } catch (e) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Connection dropped for a moment. Try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, speak]
  );

  const toggleListen = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      send(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, [listening, send]);

  const hasSpeechIn =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <>
      {!open && greeted && (
        <div className="nova-bubble frame" role="status">
          {typedGreeting}
        </div>
      )}

      <button
        className="nova-orb"
        onClick={() => setOpen((o) => !o)}
        aria-label="Talk to NOVA, Varun's AI guide"
      >
        <span className="nova-orb__dot" />
        <span className="nova-orb__label">{open ? "CLOSE" : "ASK NOVA"}</span>
      </button>

      {open && (
        <Frame
          className="nova-panel beam-frame"
          label="NOVA, AI GUIDE"
          role="dialog"
          aria-label="Chat with NOVA"
        >
          <div className="beam-frame__inner">
            <div className="nova-panel__head">
              <span className="nova-panel__sub">Answers only from Varun's profile</span>
              <div className="nova-panel__actions">
                <button
                  className="icon-btn"
                  onClick={() => setVoiceOn((v) => !v)}
                  title={voiceOn ? "Mute voice" : "Unmute voice"}
                >
                  {voiceOn ? "SND" : "MUTE"}
                </button>
                <button className="icon-btn" onClick={() => setOpen(false)} title="Close">
                  ✕
                </button>
              </div>
            </div>

            <div className="nova-panel__body" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="nova-msg nova-msg--assistant">{GREETING}</div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`nova-msg nova-msg--${m.role}`}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="nova-msg nova-msg--assistant nova-typing">thinking…</div>
              )}
            </div>

            <div className="nova-panel__input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Varun's work…"
                aria-label="Message NOVA"
              />
              {hasSpeechIn && (
                <button
                  className={`icon-btn ${listening ? "icon-btn--rec" : ""}`}
                  onClick={toggleListen}
                  title="Voice input"
                >
                  MIC
                </button>
              )}
              <button className="nova-send" onClick={() => send()} disabled={loading}>
                →
              </button>
            </div>
          </div>
        </Frame>
      )}
    </>
  );
}
