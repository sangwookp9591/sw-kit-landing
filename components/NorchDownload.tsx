"use client";

import { useInView } from "@/hooks/useInView";

const NORCH_VERSION = "0.1.1";
const DMG_URL = `https://github.com/sangwookp9591/norch/releases/download/v${NORCH_VERSION}/norch-${NORCH_VERSION}.dmg`;

export default function NorchDownload() {
  const { ref, isInView } = useInView();

  return (
    <section className="bg-aing-dark py-20 px-6">
      <div
        ref={ref}
        className="max-w-3xl mx-auto"
        style={
          isInView
            ? { animation: "fadeInUp 0.6s ease-out both" }
            : { opacity: 0 }
        }
      >
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-aing-primary/10 text-aing-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
            macOS App
          </span>
          <h2 className="text-3xl font-bold text-white mb-2">
            norch
          </h2>
          <p className="text-white/50 text-sm">
            aing 에이전트 활동을 macOS 노치에서 실시간으로 확인하세요
          </p>
        </div>

        {/* Preview */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-800">
          {/* Notch mockup */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-end gap-0">
              {/* Left agents */}
              <div className="flex gap-0.5 bg-black px-3 py-2 rounded-bl-lg">
                {["sam", "able", "klay"].map((name) => (
                  <img
                    key={name}
                    src={`/agents/${name}.svg`}
                    alt={name}
                    width={24}
                    height={24}
                    style={{ imageRendering: "pixelated" }}
                  />
                ))}
              </div>
              {/* Notch */}
              <div className="w-24 h-8 bg-black rounded-b-xl" />
              {/* Right agents */}
              <div className="flex gap-0.5 bg-black px-3 py-2 rounded-br-lg">
                {["jay", "milla", "derek"].map((name) => (
                  <img
                    key={name}
                    src={`/agents/${name}.svg`}
                    alt={name}
                    width={24}
                    height={24}
                    style={{ imageRendering: "pixelated" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { title: "164KB", desc: "Electron 대비 1000배 경량" },
              { title: "자동 연결", desc: "aing 설치 시 자동 감지" },
              { title: "12 에이전트", desc: "전원 실시간 모니터링" },
            ].map((f) => (
              <div key={f.title}>
                <p className="text-white font-bold text-lg">{f.title}</p>
                <p className="text-white/40 text-[10px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="text-center">
          <a
            href={DMG_URL}
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-white text-aing-dark px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10"
          >
            {/* macOS icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span>norch v{NORCH_VERSION} 다운로드</span>
            <span className="text-aing-dark/40 text-sm font-normal">.dmg</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-aing-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          <p className="mt-4 text-white/30 text-xs">
            macOS 14+ (Apple Silicon) -- 코드사이닝 없음 (Gatekeeper에서 허용 필요)
          </p>
        </div>
      </div>
    </section>
  );
}
