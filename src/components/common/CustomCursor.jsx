import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const halo = ringRef.current;
    if (!dot || !halo) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onDown = () => {
      dot.classList.add("cursor--click");
      halo.classList.add("cursor--click");
    };
    const onUp = () => {
      dot.classList.remove("cursor--click");
      halo.classList.remove("cursor--click");
    };

    // Hoverable elements — enlarge ring
    const addHover = () => {
      halo.classList.add("cursor--hover");
      dot.classList.add("cursor--hover");
    };
    const removeHover = () => {
      halo.classList.remove("cursor--hover");
      dot.classList.remove("cursor--hover");
    };

    const bindHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", addHover);
          el.addEventListener("mouseleave", removeHover);
        });
    };
    bindHover();

    // Smooth lagging ring
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      halo.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div ref={dotRef} className="cursor__dot" aria-hidden="true" />
      {/* Ring — lags behind for that fluid feel */}
      <div ref={ringRef} className="cursor__ring" aria-hidden="true" />
    </>
  );
}
