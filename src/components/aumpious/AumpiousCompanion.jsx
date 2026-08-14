import React, { useState, useEffect, useRef, useCallback } from "react";
import Frame from "../common/Frame";
import { SYSTEM_PROMPT, GREETING } from "../../data/resumeContext";
import { JARVIS_COMMANDS, getJarvisResponse } from "../../data/aumpiousJarvis";
import { useTypewriter } from "../../hooks/useTypewriter";

const fetchWithTimeout = async (url, options = {}, ms = 12000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

const FEMALE_PATTERNS = /female|zira|aria|jenny|susan|hazel|heera|sara|jen|fiona|sonia|amy|emma|karen|olivia|moira|vicki|veena|nancy/i;

const MALE_PATTERNS = [
  /google uk english male/i,
  /google (us|usa) english/i,
  /microsoft (guy|christopher|james|eric|david|mark|alex|fred|junior|keith|roger|rian)/i,
  /^david\b/i,
  /^alex\b/i,
  /^daniel\b/i,
  /^mark\b/i,
];

const pickNaturalVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const isMaleName = (v) =>
    /natural|neural|guy|christopher|james|eric|david|mark|alex|daniel|fred|junior|keith|roger|rian|male/i.test(
      v.name
    ) && !FEMALE_PATTERNS.test(v.name);

  let v = voices.find((x) => /natural|neural/i.test(x.name) && isMaleName(x));
  if (v) return v;

  for (const re of MALE_PATTERNS) {
    v = voices.find((x) => re.test(x.name) && !FEMALE_PATTERNS.test(x.name));
    if (v) return v;
  }

  v = voices.find((x) => /natural|neural/i.test(x.name));
  if (v) return v;

  v = voices.find(
    (x) => /en[-_]/i.test(x.lang) && !FEMALE_PATTERNS.test(x.name) && !/female/i.test(x.name)
  );
  if (v) return v;

  v = voices.find((x) => /en[-_]/i.test(x.lang));
  return v || voices[0];
};

export default function AumpiousCompanion() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [bubbleCollapsed, setBubbleCollapsed] = useState(false);
  const [bubbleMounted, setBubbleMounted] = useState(true);
  const [buttonCompact, setButtonCompact] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [voice, setVoice] = useState(null);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => setVoice(pickNaturalVoice());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const typedGreeting = useTypewriter(GREETING, greeted, 16);

  const speak = useCallback(
    (text) => {
      if (!voiceOn || !("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (voice) u.voice = voice;
        u.rate = 0.98;
        u.pitch = 0.9;
        u.volume = 1.0;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    },
    [voiceOn, voice]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setGreeted(true);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!greeted) return;
    const t1 = setTimeout(() => setBubbleCollapsed(true), 10000);
    const t2 = setTimeout(() => {
      setBubbleMounted(false);
      setButtonCompact(true);
    }, 10800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [greeted]);

  const openingMessage = `${GREETING} How may I assist you today?`;

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => speak(openingMessage), 250);
      return () => clearTimeout(t);
    }
  }, [open, speak, openingMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const callGroq = useCallback(async (system, history) => {
    const key = import.meta.env.VITE_GROQ_API_KEY;
    if (!key) throw new Error("No Groq API key configured");
    const res = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 180,
        messages: [{ role: "system", content: system }, ...history],
      }),
    }, 8000);
    if (!res.ok) throw new Error(`Groq API error ${res.status}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty Groq reply");
    return text;
  }, []);

  const callOpenRouter = useCallback(async (system, history) => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!key) throw new Error("No OpenRouter key configured");
    const res = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        temperature: 0.7,
        max_tokens: 180,
        messages: [{ role: "system", content: system }, ...history],
      }),
    }, 8000);
    if (!res.ok) throw new Error(`OpenRouter API error ${res.status}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty OpenRouter reply");
    return text;
  }, []);

  const send = useCallback(
    async (text) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      const next = [...messages, { role: "user", content }];
      setMessages(next);
      setInput("");
      setLoading(true);

      const localReply = getJarvisResponse(content, next);
      const now = new Date();
      const todayLine = `Today is ${now.toDateString()} and the current time is ${now.toLocaleTimeString()}. If asked for the date or time, answer directly using this information.`;
      const promptSystem = `${SYSTEM_PROMPT}\n${todayLine}\nBe concise (2-4 sentences max), highly intelligent, professional, and speak in character as Aumpious.`;
      const history = next.slice(-6).map((m) => ({ role: m.role, content: m.content }));

      try {
        let reply = null;

        // 1. Groq (llama-3.1-8b-instant) — fast, requires VITE_GROQ_API_KEY
        if (import.meta.env.VITE_GROQ_API_KEY) {
          try {
            reply = await callGroq(promptSystem, history);
          } catch (e) {
            reply = null;
          }
        }

        // 2. OpenRouter (free :free models) — requires VITE_OPENROUTER_API_KEY
        if (!reply && import.meta.env.VITE_OPENROUTER_API_KEY) {
          try {
            reply = await callOpenRouter(promptSystem, history);
          } catch (e) {
            reply = null;
          }
        }

        // 3. Free Public LLM API via Pollinations AI (No key required!)
        if (!reply) {
          try {
            const response = await fetchWithTimeout(
              "https://text.pollinations.ai/",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  messages: [{ role: "system", content: promptSystem }, ...history],
                  model: "openai",
                }),
              },
              5000
            );

            if (response.ok) {
              const aiText = await response.text();
              if (aiText && aiText.trim().length > 0 && !aiText.includes("<!DOCTYPE") && !aiText.includes("<html>")) {
                reply = aiText.trim();
              }
            }
          } catch (e) {
            reply = null;
          }
        }

        // 4. Keyless single-turn fallback (Pollinations GET)
        if (!reply) {
          try {
            const shortPrompt = `${content}\n(You are Aumpious, Varun Kumar's AI assistant. Be concise.)`;
            const response = await fetchWithTimeout(
              `https://text.pollinations.ai/${encodeURIComponent(shortPrompt)}?model=openai`,
              {},
              5000
            );
            if (response.ok) {
              const aiText = await response.text();
              if (aiText && aiText.trim().length > 0 && !aiText.includes("<!DOCTYPE") && !aiText.includes("<html>")) {
                reply = aiText.trim();
              }
            }
          } catch (e) {
            reply = null;
          }
        }

        if (!reply) throw new Error("LLM fallback triggered");

        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        speak(reply);
      } catch (e) {
        // Instant response from expanded local JARVIS engine if offline/network fails
        setMessages((m) => [...m, { role: "assistant", content: localReply }]);
        speak(localReply);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, speak, callGroq, callOpenRouter]
  );

  const runCommand = (cmd) => {
    send(cmd.prompt);
  };

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
      {!open && greeted && bubbleMounted && (
        <div
          className={`nova-bubble frame jarvis-bubble${bubbleCollapsed ? " jarvis-bubble--collapse" : ""}`}
          role="status"
        >
          <span className="jarvis-badge">Aumpious AI</span>
          {typedGreeting}
        </div>
      )}

      <button
        className={`animated-shiny-button${buttonCompact ? " animated-shiny-button--compact" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Activate Aumpious AI"
        title="Activate Aumpious AI"
      >
        <span className="aumpious-icon" aria-hidden="true">✦</span>
        {!open && buttonCompact && (
          <>
            <span className="aumpious-ping" aria-hidden="true" />
            <span className="aumpious-ping aumpious-ping--2" aria-hidden="true" />
          </>
        )}
        <span className="shiny-text">{open ? "Close" : "Aumpious"}</span>
      </button>

      {open && (
        <Frame
          className="nova-panel jarvis-panel"
          label="Aumpious, TASK & AI CORE v3.6"
          role="dialog"
          aria-label="Aumpious AI Companion"
        >
          <div className="jarvis-panel__inner">
            <div className="nova-panel__head jarvis-head">
              <div>
                <span className="nova-panel__sub jarvis-sub">
                  SYS: ONLINE | VARUN'S ARTIFICIAL INTELLIGENCE
                </span>
              </div>
              <div className="nova-panel__actions">
                <button
                  className="icon-btn"
                  onClick={() => setVoiceOn((v) => !v)}
                  title={voiceOn ? "Mute Aumpious voice" : "Unmute Aumpious voice"}
                >
                  {voiceOn ? "🔊 AUDIO" : "🔇 MUTE"}
                </button>
                <button className="icon-btn" onClick={() => setOpen(false)} title="Close Panel">
                  ✕
                </button>
              </div>
            </div>

            <div className="nova-panel__body jarvis-body" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="nova-msg nova-msg--assistant jarvis-msg--welcome">
                  <div className="jarvis-welcome-title">🛡️ Aumpious TASK PROTOCOLS ACTIVE</div>
                  <div>{GREETING} How may I assist you today?</div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`nova-msg nova-msg--${m.role} jarvis-msg`}>
                  {m.role === "assistant" ? (
                    <span className="jarvis-msg-author">AUMPIOUS:</span>
                  ) : (
                    <span className="jarvis-msg-author jarvis-user-author">YOU:</span>
                  )}
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="nova-msg nova-msg--assistant nova-typing jarvis-msg">
                  <span className="jarvis-msg-author">AUMPIOUS:</span> Accessing task telemetry...
                </div>
              )}
            </div>

            {/* JARVIS System Command Shortcuts */}
            <div className="jarvis-commands-bar">
              <span className="jarvis-cmd-title">COMMANDS:</span>
              <div className="jarvis-cmd-list">
                {JARVIS_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    className="jarvis-cmd-btn"
                    onClick={() => runCommand(cmd)}
                    title={cmd.prompt}
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="nova-panel__input jarvis-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Instruct Aumpious (e.g., 'Run system diagnostics')..."
                aria-label="Message Aumpious AI"
              />
              {hasSpeechIn && (
                <button
                  className={`icon-btn ${listening ? "icon-btn--rec" : ""}`}
                  onClick={toggleListen}
                  title="Voice command"
                >
                  🎙️
                </button>
              )}
              <button className="nova-send jarvis-send" onClick={() => send()} disabled={loading}>
                RUN →
              </button>
            </div>
          </div>
        </Frame>
      )}
    </>
  );
}

