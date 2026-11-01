'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/*
 * Big hero logo that, on scroll, shrinks and flies into the header's logo slot
 * (the element marked with `data-logo-slot`). It tilts slightly toward the pointer
 * while it sits in the hero. While the logo is in flight the header's own logo is
 * hidden via `html[data-logo-flight='on']` (see globals.css); once docked they swap back.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function FlyingLogo({ className }: { className?: string }) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ph = placeholderRef.current;
    const img = imgRef.current;
    const slot = document.querySelector<HTMLElement>('[data-logo-slot]');
    if (!ph || !img || !slot) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const finePointer = matchMedia('(pointer: fine)').matches;
    const start = { x: 0, y: 0, w: 1 };
    const end = { x: 0, y: 0, w: 1 };
    let range = 1;

    const measure = () => {
      const prevTransform = img.style.transform;
      img.style.transform = 'none';
      const pr = ph.getBoundingClientRect();
      start.x = pr.left;
      start.y = pr.top + window.scrollY; // position at scrollY = 0
      start.w = pr.width;
      const sr = slot.getBoundingClientRect(); // header is sticky, so this is constant
      end.x = sr.left;
      end.y = sr.top;
      end.w = sr.width;
      range = Math.max(1, window.innerHeight * 0.45);
      img.style.width = `${start.w}px`;
      img.style.height = `${start.w}px`;
      img.style.transform = prevTransform;
    };

    // Take the image out of the flow; the placeholder keeps its space.
    Object.assign(img.style, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      zIndex: '60',
      transformOrigin: '0 0',
      pointerEvents: 'none',
      willChange: 'transform',
    });
    measure();

    let sy = window.scrollY;
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let last = performance.now();
    let raf = 0;
    let docked: boolean | null = null;

    const render = () => {
      const p = clamp(sy / range);
      const e = ease(p);
      const scale = Math.pow(end.w / start.w, e);
      const x = lerp(start.x, end.x, ease(clamp(p * 1.1 - 0.05)));
      const y = lerp(start.y, end.y, e);
      const tilt = 1 - e;
      img.style.transform =
        `translate3d(${x}px, ${y}px, 0) scale(${scale})` +
        (finePointer
          ? ` perspective(1400px) rotateX(${-ry * tilt}deg) rotateY(${rx * tilt}deg)`
          : '');
      img.style.filter =
        tilt > 0.01
          ? `drop-shadow(${-rx * 2 * tilt}px ${(18 + ry * 4) * tilt}px ${26 * tilt}px rgba(67,197,231,${0.18 * tilt}))`
          : 'none';

      root.style.setProperty('--hero-p', p.toFixed(4));
      const isDocked = p >= 0.999;
      if (isDocked !== docked) {
        docked = isDocked;
        root.dataset.logoFlight = isDocked ? 'docked' : 'on';
        img.style.opacity = isDocked ? '0' : '1';
      }
    };

    // Spring-smoothed scroll and pointer; the loop stops once everything settles.
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 10);
      sy += (window.scrollY - sy) * k;
      if (Math.abs(window.scrollY - sy) < 0.3) sy = window.scrollY;
      const kt = 1 - Math.exp(-dt * 4);
      rx += (tx * 5 - rx) * kt;
      ry += (ty * 4 - ry) * kt;
      render();
      const settled =
        sy === window.scrollY && Math.abs(tx * 5 - rx) < 0.01 && Math.abs(ty * 4 - ry) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };
    const onResize = () => {
      measure();
      render();
    };

    render();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      delete root.dataset.logoFlight;
      root.style.removeProperty('--hero-p');
    };
  }, []);

  return (
    <div ref={placeholderRef} className={cn('relative aspect-square', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- transformed every frame */}
      <img
        ref={imgRef}
        src="/logo.png"
        alt="DIT Coding Club logo"
        width={350}
        height={350}
        className="size-full"
        fetchPriority="high"
      />
    </div>
  );
}
