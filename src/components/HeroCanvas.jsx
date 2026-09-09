import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/useReveal.js";

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let W, H, DPR;
    let raf;

    function isDark() {
      const stamp = document.documentElement.getAttribute("data-theme");
      if (stamp === "dark") return true;
      if (stamp === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.round((W * H) / 9000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.85,
          r: Math.random() * 1.3 + 0.3,
          p: Math.random() * Math.PI * 2,
          s: Math.random() * 0.6 + 0.3,
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const starColor = dark ? "243,236,220" : "251,247,236";

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        const tw = prefersReducedMotion ? 0.7 : 0.55 + 0.45 * Math.sin(t * 0.001 * st.s + st.p);
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + starColor + "," + (0.15 + tw * 0.65) + ")";
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const cx = W * 0.72;
      const cy = H * 0.4;
      const R = Math.min(W, H) * 0.3;

      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 2.4);
      glow.addColorStop(0, "rgba(240,166,63,0.35)");
      glow.addColorStop(1, "rgba(240,166,63,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.4, 0, Math.PI * 2);
      ctx.fill();

      const rays = 16;
      ctx.save();
      ctx.translate(cx, cy);
      const rot = prefersReducedMotion ? 0 : t * 0.00004;
      ctx.rotate(rot);
      ctx.strokeStyle = "rgba(240,166,63,0.55)";
      ctx.lineWidth = 2;
      for (let r = 0; r < rays; r++) {
        const a = (r / rays) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * R * 1.08, Math.sin(a) * R * 1.08);
        ctx.lineTo(Math.cos(a) * R * 1.32, Math.sin(a) * R * 1.32);
        ctx.stroke();
      }
      ctx.restore();

      const sunGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
      sunGrad.addColorStop(0, "#FBD38A");
      sunGrad.addColorStop(0.55, "#F0A63F");
      sunGrad.addColorStop(1, "#D9821F");
      ctx.beginPath();
      ctx.fillStyle = sunGrad;
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      const offset = prefersReducedMotion ? R * 0.62 : R * 0.62 + Math.sin(t * 0.00012) * R * 0.02;
      const moonColor = dark ? "5,4,3" : "16,12,8";
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + moonColor + ",1)";
      ctx.arc(cx - offset, cy - R * 0.08, R * 1.08, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop(t) {
      draw(t);
      if (!prefersReducedMotion) raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    resize();
    if (prefersReducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onThemeChange = () => {
      if (prefersReducedMotion) draw(0);
    };
    mq.addEventListener("change", onThemeChange);

    return () => {
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", onThemeChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
}
