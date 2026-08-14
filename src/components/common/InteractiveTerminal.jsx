import React, { useEffect, useRef, useState, useCallback } from "react";
import { TERMINAL_WELCOME, runTerminalCommand, AVAILABLE_COMMANDS } from "../../data/terminalCommands";

const QUICK_COMMANDS = ["/about", "/skills", "/projects"];

export default function InteractiveTerminal() {
  const [lines, setLines] = useState(TERMINAL_WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestIdx, setSuggestIdx] = useState(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const slashOpen = input.trimStart().startsWith("/");
  const matches = slashOpen
    ? AVAILABLE_COMMANDS.filter((c) => c.startsWith(input.trimStart().slice(1)))
    : [];

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (slashOpen && matches.length > 0 && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [slashOpen, matches.length]);

  useEffect(() => {
    setSuggestIdx(0);
  }, [input]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const execute = useCallback((raw) => {
    const trimmed = raw.trim();
    const name = trimmed.replace(/^\//, "").split(/\s+/)[0]?.toLowerCase();
    if (name === "clear") {
      setLines([]);
      if (trimmed) setHistory((h) => [...h, trimmed]);
      setInput("");
      setHistIdx(-1);
      return;
    }
    setLines((prev) => [...prev, { type: "cmd", content: raw }, ...runTerminalCommand(raw)]);
    if (trimmed) setHistory((h) => [...h, trimmed]);
    setInput("");
    setHistIdx(-1);
    inputRef.current?.focus();
  }, []);

  const onKeyDown = (e) => {
    if (slashOpen && matches.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSuggestIdx((i) => (i + 1) % matches.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSuggestIdx((i) => (i - 1 + matches.length) % matches.length);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setInput("/" + matches[suggestIdx]);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const query = input.trimStart().slice(1);
        if (query === "") {
          execute("/help");
        } else {
          execute("/" + matches[suggestIdx]);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setInput("");
        return;
      }
    }
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="v-terminal"
      onMouseDown={() => inputRef.current?.focus()}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="v-terminal__bar">
        <span className="v-terminal__dot" style={{ background: "#FF5F57" }} />
        <span className="v-terminal__dot" style={{ background: "#FEBC2E" }} />
        <span className="v-terminal__dot" style={{ background: "#28C840" }} />
        <span className="v-terminal__label">PORTFOLIO SHELL</span>
      </div>
      <div className="v-terminal__body" ref={bodyRef}>
        {lines.map((line, i) => {
          if (line.type === "clear") return null;
          if (line.type === "cmd") {
            return (
              <div key={i} className="v-terminal__line terminal-line terminal-line--cmd">
                <span className="v-terminal__prefix">C:\Users\varun&gt;</span>
                {line.content}
              </div>
            );
          }
          if (line.type === "err") {
            return (
              <div key={i} className="v-terminal__line terminal-line terminal-line--err">
                {line.content}
              </div>
            );
          }
          if (line.type === "link") {
            return (
              <div key={i} className="v-terminal__line terminal-line terminal-line--link">
                {line.url ? (
                  <a href={line.url} target="_blank" rel="noreferrer">
                    {line.label}
                  </a>
                ) : (
                  <span>
                    <span className="terminal-cmd-name">{line.label}</span> {line.hint}
                  </span>
                )}
              </div>
            );
          }
          return (
            <div key={i} className="v-terminal__line terminal-line terminal-line--out">
              {typeof line === "string" ? line : line.content}
            </div>
          );
        })}
        <div className="v-terminal__line terminal-prompt">
          <span className="v-terminal__prefix">C:\Users\varun&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="/ for commands"
            aria-label="Terminal command input"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          <span className="terminal-caret" />
        </div>
        {slashOpen && matches.length > 0 && (
          <div className="terminal-suggest">
            <div className="terminal-suggest__head">
              {input.trimStart().slice(1) === "" ? "ALL COMMANDS" : `COMMANDS MATCHING "/${input.trimStart().slice(1)}"`}
            </div>
            {matches.map((cmd, i) => (
              <button
                key={cmd}
                type="button"
                className={`terminal-suggest__item${i === suggestIdx ? " is-active" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  execute("/" + cmd);
                }}
                onMouseEnter={() => setSuggestIdx(i)}
              >
                <span className="terminal-suggest__slash">/</span>
                <span className="terminal-suggest__name">{cmd}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="terminal-chips">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            className="terminal-chip"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              execute(cmd);
              inputRef.current?.focus();
            }}
          >
            {cmd}
          </button>
        ))}
        <button
          className="terminal-chip terminal-chip--more"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            execute("/help");
            inputRef.current?.focus();
          }}
        >
          / more commands
        </button>
      </div>
    </div>
  );
}
