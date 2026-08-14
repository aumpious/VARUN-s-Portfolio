import React, { useEffect, useRef } from "react";

const GOLD = [216, 170, 110];
const WARM = [255, 243, 224];
const FAINT = [150, 130, 100];

const makeSprite = (r) => {
  const s = document.createElement("canvas");
  const size = Math.max(4, Math.ceil(r * 3));
  s.width = s.height = size;
  const c = s.getContext("2d");
  const grad = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(232,190,130,0.95)");
  grad.addColorStop(1, "rgba(216,170,110,0)");
  c.fillStyle = grad;
  c.fillRect(0, 0, size, size);
  return s;
};

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars = [];
    let sprite = null;
    let rafId = 0;
    let running = true;
    let scrollY = window.scrollY;
    let targetScroll = scrollY;
    let scrollVel = 0;
    let lastScroll = scrollY;
    let lastTime = performance.now();
    let lastPx = 0;

    const STAR_RADIUS = 4.4;
    const BASE_SPEED = 0.16;
    const MAX_DEPTH = 4.5;

    const buildStars = () => {
      const count = Math.max(220, Math.min(950, Math.floor((width * height) / 1900)));
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * MAX_DEPTH,
        size: (Math.random() * STAR_RADIUS) | 0,
        tint: Math.random() < 0.72 ? GOLD : Math.random() < 0.5 ? WARM : FAINT,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.25 + Math.random() * 0.75,
      }));
      sprite = makeSprite(STAR_RADIUS * dpr * 3);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const draw = (now) => {
      rafId = requestAnimationFrame(draw);
      if (!running || document.hidden) return;

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      scrollY += (targetScroll - scrollY) * 0.08;
      scrollVel = (scrollY - lastScroll) / Math.max(1, now - lastPx);
      lastScroll = scrollY;
      lastPx = now;

      const flow = BASE_SPEED + Math.min(2.2, Math.abs(scrollVel) * 3.2) * (scrollVel < 0 ? -1 : 1);
      const scrollOffset = scrollY * 0.35;

      ctx.clearRect(0, 0, width, height);
      const scale = 1 / (width * 0.5 + 260);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= flow * dt;

        if (s.z <= 0.05) {
          s.x = Math.random() * width;
          s.y = Math.random() * height;
          s.z = MAX_DEPTH;
        }

        const depth = s.z / MAX_DEPTH;
        const projected = 260 / (260 + s.z * 90);

        let sx = (s.x - width / 2) * projected + width / 2;
        let sy = ((s.y - scrollOffset) % (height + 40)) * projected;
        if (sy < 0) sy += height + 40;

        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) continue;

        const tw = 0.55 + 0.45 * Math.sin(now * 0.002 * s.twinkle + s.phase);
        const alpha = (0.35 + 0.65 * depth) * tw;
        const size = Math.max(1, s.size * projected * (0.7 + depth));

        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, sx - size, sy - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;
    };

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) lastTime = performance.now();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduced) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw(performance.now());
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="v-starfield" aria-hidden="true" />;
};

export default StarfieldBackground;
