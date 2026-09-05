"use client";

import { useEffect, useRef } from "react";

interface Hexagon {
  x: number;
  y: number;
  glow: number;
}

const HEX_SIZE = 26;
const GLOW_RADIUS = 220;

/**
 * Cursor-reactive honeycomb background for the hero.
 * Canvas is used instead of hundreds of DOM elements because redrawing
 * one <canvas> 60x/sec is far cheaper than the browser tracking/repainting
 * hundreds of individual hexagon elements every frame.
 */
export default function Honeycomb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let hexagons: Hexagon[] = [];
    let rafId = 0;

    const mouse = { x: -9999, y: -9999 };
    const targetMouse = { x: -9999, y: -9999 };

    function buildGrid() {
      hexagons = [];
      const hexW = HEX_SIZE * 2;
      const hexH = Math.sqrt(3) * HEX_SIZE;
      const colSpacing = hexW * 0.75;
      const rowSpacing = hexH;

      for (let col = -1, x = 0; x < width + hexW; col++, x = col * colSpacing) {
        const offsetY = col % 2 !== 0 ? rowSpacing / 2 : 0;
        for (
          let row = -1, y = offsetY;
          y < height + hexH;
          row++, y = row * rowSpacing + offsetY
        ) {
          hexagons.push({ x, y, glow: 0 });
        }
      }
    }

    function resize() {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      buildGrid();
      if (prefersReducedMotion && ctx) {
        ctx.clearRect(0, 0, width, height);
        for (const hex of hexagons) {
          drawHexagon(hex.x, hex.y, HEX_SIZE - 2, 0);
        }
      }
    }

    function drawHexagon(cx: number, cy: number, size: number, glow: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(232, 183, 200, ${0.04 + glow * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      if (glow > 0.05) {
        ctx.fillStyle = `rgba(232, 183, 200, ${glow * 0.08})`;
        ctx.fill();
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      mouse.x += (targetMouse.x - mouse.x) * 0.12;
      mouse.y += (targetMouse.y - mouse.y) * 0.12;

      for (const hex of hexagons) {
        const dist = Math.hypot(hex.x - mouse.x, hex.y - mouse.y);
        const target = Math.max(0, 1 - dist / GLOW_RADIUS);
        hex.glow += (target - hex.glow) * 0.15;
        drawHexagon(hex.x, hex.y, HEX_SIZE - 2, hex.glow);
      }
      rafId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      targetMouse.x = -9999;
      targetMouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
