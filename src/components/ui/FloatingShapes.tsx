"use client";

import { useEffect, useRef } from "react";

const symbols = [
  "{ }", "[ ]", "( )", "</>", "=>", "//",
  "&&", "||", "!==", "===", "->", "=>",
  "fn", "let", "if", "for", "try", "new",
];

export default function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      symbol: string;
      size: number;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 14 + Math.random() * 18,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -80) p.x = canvas.width + 80;
        if (p.x > canvas.width + 80) p.x = -80;
        if (p.y < -40) p.y = canvas.height + 40;
        if (p.y > canvas.height + 40) p.y = -40;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px "DM Sans", "JetBrains Mono", monospace`;
        ctx.fillStyle = "rgba(56, 189, 248, 0.06)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
