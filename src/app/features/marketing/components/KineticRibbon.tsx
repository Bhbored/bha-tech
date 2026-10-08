import { useEffect, useRef, useState } from "react";

export function KineticRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionState = useRef({ phase: 0, x: 0, y: 0 });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let phase = motionState.current.phase;
    let previous = 0;
    const pointer = { x: 0, y: 0 };
    const eased = { x: motionState.current.x, y: motionState.current.y };
    const ribbons = Array.from({ length: 150 }, (_, index) => {
      const t = (index / 150) * Math.PI * 2;
      return {
        t,
        sin: Math.sin(t),
        cos: Math.cos(t),
        depth: 0,
        points: new Float32Array(66),
      };
    });

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.255;
      const angle = -0.38 + Math.sin(phase * 0.35) * 0.17 + eased.x * 0.2;
      const tilt = 0.72 + eased.y * 0.16;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      for (const ribbon of ribbons) {
        const { t, points } = ribbon;
        const twistCos = Math.cos(t * 1.5 + phase * 0.25);
        const twistSin = Math.sin(t * 1.5 + phase * 0.25);
        const wave = 0.34 * Math.sin(t * 3 + phase * 0.3);
        let depth = 0;
        for (let j = 0; j <= 32; j++) {
          const band = (j / 32 - 0.5) * 0.94;
          const radius = 1.18 + band * twistCos;
          const x = radius * ribbon.cos;
          const y = radius * ribbon.sin;
          const z = band * twistSin + wave;
          const rx = x * cosAngle - y * sinAngle;
          const ry = x * sinAngle + y * cosAngle;
          const py = ry * cosTilt - z * sinTilt;
          const pz = ry * sinTilt + z * cosTilt;
          const perspective = 3.7 / (3.7 - pz);
          points[j * 2] = width / 2 + rx * scale * perspective;
          points[j * 2 + 1] = height / 2 + py * scale * perspective;
          depth += pz;
        }
        ribbon.depth = depth / 33;
      }
      ribbons.sort((a, b) => a.depth - b.depth);
      for (const ribbon of ribbons) {
        const light = 39 + (ribbon.depth + 1.6) * 13;
        context.strokeStyle = `hsl(${16 + Math.sin(ribbon.t) * 9} 92% ${light}%)`;
        context.lineWidth = width < 500 ? 1.25 : 1.8;
        context.beginPath();
        context.moveTo(ribbon.points[0], ribbon.points[1]);
        for (let index = 2; index < ribbon.points.length; index += 2) {
          context.lineTo(ribbon.points[index], ribbon.points[index + 1]);
        }
        context.stroke();
      }
    };
    const animate = (now: number) => {
      if (now - previous >= 1000 / 30) {
        phase += Math.min((now - previous) / 1000, 0.05);
        previous = now;
        eased.x += (pointer.x - eased.x) * 0.06;
        eased.y += (pointer.y - eased.y) * 0.06;
        draw();
      }
      frame = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      draw();
      if (!paused && !motion.matches && visible && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sync();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const move = (event: PointerEvent) => {
      if (motion.matches || paused || event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    };
    resize.observe(canvas);
    intersection.observe(canvas);
    canvas.addEventListener("pointermove", move, { passive: true });
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      motionState.current = { phase, x: eased.x, y: eased.y };
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <div className="ribbon-stage">
      <div className="ribbon-orbit" aria-hidden="true" />
      <canvas ref={canvasRef} className="ribbon-canvas" aria-hidden="true" />
      <span
        className="ribbon-coordinate ribbon-coordinate-top"
        aria-hidden="true"
      >
        BHA / FORM STUDY 001
      </span>
      <span
        className="ribbon-coordinate ribbon-coordinate-bottom"
        aria-hidden="true"
      >
        CONTINUOUS BY DESIGN
      </span>
      <button
        type="button"
        className="motion-toggle"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
      >
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{" "}
        {paused ? "Play motion" : "Pause motion"}
      </button>
    </div>
  );
}
