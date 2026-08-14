import React, { useRef } from "react";

export default function CardSpotlight({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={`card-spotlight ${className}`}>
      <div className="card-spotlight__spot" aria-hidden="true" />
      <div className="card-spotlight__grid" aria-hidden="true" />
      {children}
    </div>
  );
}
