"use client";

import { useEffect, useState, useRef } from "react";
import { SITE_CONFIG } from "@/lib/config";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    fetch(SITE_CONFIG.githubApi)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  // Count-up animation
  useEffect(() => {
    if (stars === null) return;
    const duration = 1200;
    const steps = 30;
    const increment = stars / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), stars);
      setDisplayCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stars]);

  // Sparkle on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setSparkles((prev) => [...prev.slice(-5), { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  return (
    <a
      ref={buttonRef}
      href={SITE_CONFIG.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-aing-dark/20 bg-white px-4 py-2.5 text-sm font-medium text-aing-dark transition-all duration-300 hover:border-aing-orange/60 hover:shadow-md hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none absolute"
          style={{
            left: s.x,
            top: s.y,
            animation: "sparkle-float 0.6s ease-out forwards",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 0L4.9 2.6L7.8 3L5.5 5L6.2 8L4 6.4L1.8 8L2.5 5L0.2 3L3.1 2.6Z" fill="#f97316" />
          </svg>
        </span>
      ))}

      {/* Star icon with bounce on hover */}
      <svg
        viewBox="0 0 16 16"
        className={`h-5 w-5 transition-all duration-300 ${isHovered ? "text-aing-orange scale-125 rotate-12" : ""}`}
        fill="currentColor"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>

      <span className={`transition-colors duration-300 ${isHovered ? "text-aing-orange" : ""}`}>
        Star
      </span>

      {stars !== null && (
        <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums transition-all duration-300 ${
          isHovered ? "bg-aing-orange/10 text-aing-orange scale-110" : "bg-aing-dark/5"
        }`}>
          {displayCount}
        </span>
      )}

      {/* Shine sweep on hover */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </a>
  );
}
