"use client";

import { useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { SITE_CONFIG } from "@/lib/config";

const INSTALL_LINE1 = `/plugin marketplace add sangwookp9591/ai-ng-kit-claude`;
const INSTALL_LINE2 = `/plugin install aing`;

const UPDATE_CODE = `claude plugin update aing@aing-marketplace`;

const TERMINAL_CODE = `claude plugin marketplace add sangwookp9591/ai-ng-kit-claude && claude plugin install aing`;

type CopyState = "idle" | "copying" | "copied";

function CopyBlock({ code, label }: { code: string; label: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);

      navigator.clipboard.writeText(code);
      setState("copying");
      setTimeout(() => setState("copied"), 150);
      setTimeout(() => setState("idle"), 2000);
    },
    [code]
  );

  return (
    <div className="mb-4">
      <p className="text-xs text-aing-dark/40 mb-2 font-semibold">
        {label}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="group relative w-full overflow-hidden rounded-xl bg-aing-dark p-5 text-left transition-all duration-300 hover:shadow-lg hover:shadow-aing-orange/10 hover:ring-1 hover:ring-aing-orange/20 cursor-pointer"
      >
        {/* Ripple effect */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-aing-orange/20"
            style={{
              left: r.x - 50,
              top: r.y - 50,
              width: 100,
              height: 100,
              animation: "ripple-expand 0.6s ease-out forwards",
            }}
          />
        ))}

        {/* Code content */}
        <pre className="font-mono text-sm leading-relaxed mb-3">
          {code.split("\n").map((line, i) => (
            <div
              key={i}
              className="text-gray-300 group-hover:text-white transition-colors duration-200"
            >
              {line || "\u00A0"}
            </div>
          ))}
        </pre>

        {/* Copy button — below code, not overlapping */}
        <div className="flex justify-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              state === "copied"
                ? "bg-green-500/20 text-green-400 scale-105"
                : state === "copying"
                  ? "bg-aing-orange/20 text-aing-orange scale-95"
                  : "bg-white/10 text-gray-400 group-hover:bg-aing-orange/20 group-hover:text-aing-orange"
            }`}
          >
            {state === "copied" ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="2 6 5 9 10 3" />
                </svg>
                복사 완료!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="1" width="7" height="7" rx="1" />
                  <rect x="1" y="4" width="7" height="7" rx="1" />
                </svg>
                클릭해서 복사
              </>
            )}
          </span>
        </div>

        {/* Shine sweep */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </div>
  );
}

export default function InstallCta() {
  const { ref, isInView } = useInView();

  return (
    <section id="install" className="bg-white py-20 px-6">
      <div
        ref={ref}
        className="max-w-2xl mx-auto text-center"
        style={
          isInView
            ? { animation: "fadeInUp 0.6s ease-out both" }
            : { opacity: 0 }
        }
      >
        <h2 className="text-3xl font-bold text-aing-dark mb-2">
          30초면 끝나요
        </h2>
        <p className="text-aing-dark/50 mb-8 text-sm">
          블록을 클릭하면 바로 복사됩니다
        </p>

        <div className="text-left">
          <CopyBlock code={INSTALL_LINE1} label="Claude Code 세션에서 — 1단계" />
          <CopyBlock code={INSTALL_LINE2} label="Claude Code 세션에서 — 2단계" />
          <CopyBlock code={TERMINAL_CODE} label="터미널에서 한 줄로" />
          <CopyBlock code={UPDATE_CODE} label="업데이트할 때" />
        </div>

        <p className="mt-6 text-xs text-aing-dark/30">
          Claude Code v2.1.69+ · Node.js 18+
        </p>

        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 relative inline-flex items-center gap-2 overflow-hidden bg-aing-orange text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-aing-orange/20"
        >
          <span>GitHub에서 보기</span>
          <svg viewBox="0 0 16 16" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </a>
      </div>
    </section>
  );
}
