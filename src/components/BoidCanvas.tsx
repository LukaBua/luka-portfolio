import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Boid {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  maxSpeed: number;
  maxForce: number;
  trail: Point[];
  isAmber: boolean;
}

interface BoidCanvasProps {
  agentCount?: number;
  inspectMode: boolean;
  purgeSignal: number;
  onTelemetryUpdate?: (fps: number, activeAgents: number) => void;
}

export const BoidCanvas: React.FC<BoidCanvasProps> = ({
  agentCount = 44,
  inspectMode,
  purgeSignal,
  onTelemetryUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inspectRef = useRef(inspectMode);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const boidsRef = useRef<Boid[]>([]);
  const purgeFlashRef = useRef<number>(0);

  useEffect(() => {
    inspectRef.current = inspectMode;
  }, [inspectMode]);

  // Handle "Purge Agents" scatter impulse
  useEffect(() => {
    if (purgeSignal === 0) return;
    purgeFlashRef.current = 1.0;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cx = mouseRef.current.active ? mouseRef.current.x : width * 0.5;
    const cy = mouseRef.current.active ? mouseRef.current.y : height * 0.5;

    for (const b of boidsRef.current) {
      const dx = b.x - cx;
      const dy = b.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
      const burstSpeed = 9 + Math.random() * 6;
      b.vx = Math.cos(angle) * burstSpeed;
      b.vy = Math.sin(angle) * burstSpeed;
      if (dist < 40) {
        b.x += Math.cos(angle) * 35;
        b.y += Math.sin(angle) * 35;
      }
    }
  }, [purgeSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize autonomous boid agents
    const boids: Boid[] = [];
    for (let i = 0; i < agentCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * 1.4;
      boids.push({
        id: i + 1,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        ax: 0,
        ay: 0,
        maxSpeed: 2.6 + Math.random() * 0.6,
        maxForce: 0.055,
        trail: [],
        isAmber: i % 9 === 0, // Subtle safety amber tactical leader agents
      });
    }
    boidsRef.current = boids;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let animId = 0;
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const limit = (vx: number, vy: number, max: number): [number, number] => {
      const magSq = vx * vx + vy * vy;
      if (magSq > max * max && magSq > 0) {
        const mag = Math.sqrt(magSq);
        return [(vx / mag) * max, (vy / mag) * max];
      }
      return [vx, vy];
    };

    const setMag = (vx: number, vy: number, magTarget: number): [number, number] => {
      const mag = Math.hypot(vx, vy);
      if (mag === 0) return [0, 0];
      return [(vx / mag) * magTarget, (vy / mag) * magTarget];
    };

    const render = (now: number) => {
      frameCount++;
      const elapsed = now - lastFpsUpdate;
      if (elapsed >= 400) {
        const currentFps = Math.min(120, Math.round((frameCount * 1000) / elapsed));
        onTelemetryUpdate?.(currentFps, boids.length);
        frameCount = 0;
        lastFpsUpdate = now;
      }

      ctx.clearRect(0, 0, width, height);

      // Optional purge shockwave ring
      if (purgeFlashRef.current > 0.01) {
        const cx = mouseRef.current.active ? mouseRef.current.x : width * 0.5;
        const cy = mouseRef.current.active ? mouseRef.current.y : height * 0.5;
        const radius = (1 - purgeFlashRef.current) * 520 + 20;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${purgeFlashRef.current * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
        purgeFlashRef.current *= 0.92;
      }

      const perceptionRadius = 85;
      const separationRadius = 34;
      const mouseRepelRadius = 150;
      const isInspect = inspectRef.current;

      // Flocking update
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        let alignX = 0;
        let alignY = 0;
        let cohX = 0;
        let cohY = 0;
        let sepX = 0;
        let sepY = 0;
        let total = 0;
        let sepTotal = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const other = boids[j];
          const dx = other.x - b.x;
          const dy = other.y - b.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < perceptionRadius * perceptionRadius && dSq > 0.0001) {
            const d = Math.sqrt(dSq);
            alignX += other.vx;
            alignY += other.vy;
            cohX += other.x;
            cohY += other.y;
            total++;

            if (d < separationRadius) {
              sepX -= dx / (d * d);
              sepY -= dy / (d * d);
              sepTotal++;
            }

            // Draw faint mesh link between close neighbors in Inspect Mode
            if (isInspect && j > i && d < 68) {
              ctx.beginPath();
              ctx.moveTo(b.x, b.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - d / 68) * 0.16})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }

        if (total > 0) {
          // Alignment
          alignX /= total;
          alignY /= total;
          [alignX, alignY] = setMag(alignX, alignY, b.maxSpeed);
          alignX -= b.vx;
          alignY -= b.vy;
          [alignX, alignY] = limit(alignX, alignY, b.maxForce);

          // Cohesion
          cohX = cohX / total - b.x;
          cohY = cohY / total - b.y;
          [cohX, cohY] = setMag(cohX, cohY, b.maxSpeed);
          cohX -= b.vx;
          cohY -= b.vy;
          [cohX, cohY] = limit(cohX, cohY, b.maxForce);
        }

        if (sepTotal > 0) {
          sepX /= sepTotal;
          sepY /= sepTotal;
          [sepX, sepY] = setMag(sepX, sepY, b.maxSpeed);
          sepX -= b.vx;
          sepY -= b.vy;
          [sepX, sepY] = limit(sepX, sepY, b.maxForce * 1.4);
        }

        b.ax += alignX * 1.05 + cohX * 0.85 + sepX * 1.65;
        b.ay += alignY * 1.05 + cohY * 0.85 + sepY * 1.65;

        // Mouse Repulsion field
        if (mouseRef.current.active) {
          const mdx = b.x - mouseRef.current.x;
          const mdy = b.y - mouseRef.current.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseRepelRadius * mouseRepelRadius && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const strength = (1 - mDist / mouseRepelRadius) * 0.42;
            b.ax += (mdx / mDist) * strength;
            b.ay += (mdy / mDist) * strength;

            // Tactical repulsion line to cursor when very close
            if (mDist < 110) {
              ctx.beginPath();
              ctx.moveTo(b.x, b.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - mDist / 110) * 0.22})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      // Integrate positions and draw directional triangle chevrons + velocity vectors + trails
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        b.vx += b.ax;
        b.vy += b.ay;

        // Smooth damping back to nominal cruise speed after purge burst
        const speed = Math.hypot(b.vx, b.vy);
        if (speed > b.maxSpeed) {
          const targetSpeed = b.maxSpeed + (speed - b.maxSpeed) * 0.94;
          b.vx = (b.vx / speed) * targetSpeed;
          b.vy = (b.vy / speed) * targetSpeed;
        } else if (speed < 1.1) {
          const [nvx, nvy] = setMag(b.vx || 1, b.vy || 0.5, 1.2);
          b.vx = nvx;
          b.vy = nvy;
        }

        b.x += b.vx;
        b.y += b.vy;
        b.ax = 0;
        b.ay = 0;

        // Screen wrap-around (clear trail jump on wrap)
        let wrapped = false;
        const margin = 24;
        if (b.x < -margin) {
          b.x = width + margin;
          wrapped = true;
        } else if (b.x > width + margin) {
          b.x = -margin;
          wrapped = true;
        }
        if (b.y < -margin) {
          b.y = height + margin;
          wrapped = true;
        } else if (b.y > height + margin) {
          b.y = -margin;
          wrapped = true;
        }

        if (wrapped) {
          b.trail.length = 0;
        } else {
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 14) {
            b.trail.shift();
          }
        }

        const primaryRgb = b.isAmber ? '245, 158, 11' : '0, 240, 255';

        // 1. Draw glowing wake trail
        if (b.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(b.trail[0].x, b.trail[0].y);
          for (let t = 1; t < b.trail.length; t++) {
            ctx.lineTo(b.trail[t].x, b.trail[t].y);
          }
          ctx.strokeStyle = `rgba(${primaryRgb}, 0.16)`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        const angle = Math.atan2(b.vy, b.vx);

        // 2. Draw forward velocity vector line (always visible, amplified in Inspect Mode)
        const vecLen = isInspect ? 18 + speed * 4.5 : 11 + speed * 2.5;
        const tipX = b.x + Math.cos(angle) * vecLen;
        const tipY = b.y + Math.sin(angle) * vecLen;

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(tipX, tipY);
        ctx.strokeStyle = isInspect
          ? `rgba(${primaryRgb}, 0.55)`
          : `rgba(${primaryRgb}, 0.28)`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // 3. Draw directional triangle chevron agent
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(7.5, 0); // Nose tip
        ctx.lineTo(-5.5, 4.2); // Left wingtip
        ctx.lineTo(-2.6, 0); // Inner chevron notch
        ctx.lineTo(-5.5, -4.2); // Right wingtip
        ctx.closePath();

        ctx.fillStyle = `rgba(${primaryRgb}, 0.22)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${primaryRgb}, 0.85)`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.restore();

        // 4. In Inspect Mode, render miniature bounding box & agent telemetry ID on select agents
        if (isInspect && i % 4 === 0) {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.55)';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText(
            `AG.${String(b.id).padStart(2, '0')} [${speed.toFixed(1)}]`,
            b.x + 9,
            b.y - 7
          );
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [agentCount, onTelemetryUpdate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
