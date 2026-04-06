"use client";

import { Terminal } from "@/components/Terminal";
import { GitHubStars } from "@/components/GitHubStars";
import { SITE_CONFIG } from "@/lib/config";

const terminalLines = [
  "$ /aing do \"로그인 기능 추가해줘\"",
  "",
  "━━━ aing 자동 라우팅 ━━━",
  "분석: complexity 5, 앵커 없음",
  "라우팅: /aing team (팀 파이프라인)",
  "━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "[Klay] 코드베이스 분석 중...",
  "[Able] 계획 수립 완료",
  "[Jay] Backend API 구현 (TDD)",
  "[Iron] Frontend 화면 구현",
  "[Milla] 보안 리뷰: PASS",
  "[Sam] Goal-Backward: ACHIEVED",
  "",
  "Pipeline completed!",
];

export default function Hero() {
  return (
    <section className="flex items-center py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Left column */}
        <div style={{ animation: "fadeInUp 0.8s ease-out" }}>
          <h1 className="text-5xl font-extrabold text-aing-dark md:text-6xl">
            {SITE_CONFIG.title}
            <span className="ml-3 inline-block rounded-full bg-aing-primary/10 px-2 py-1 text-xs text-aing-primary">
              v{SITE_CONFIG.version}
            </span>
          </h1>

          <p className="mt-4 text-xl text-aing-dark/60 md:text-2xl">
            개발자를 위한 최고의 AI 도우미
          </p>

          <p className="mt-3 text-sm font-medium text-aing-dark/50">
            21 Agents · 42 Skills · 0 Runtime Dependencies
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-aing-primary/10 px-3 py-1 text-xs font-medium text-aing-primary">
              Harness Architect
            </span>
            <span className="rounded-full bg-aing-primary/10 px-3 py-1 text-xs font-medium text-aing-primary">
              AING-DR 합의 프로세스
            </span>
            <span className="rounded-full bg-aing-primary/10 px-3 py-1 text-xs font-medium text-aing-primary">
              Teacher Agent
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#install"
              className="rounded-lg bg-aing-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              설치하기
            </a>
            <a
              href="#guide"
              className="rounded-lg border border-aing-primary/30 px-6 py-3 font-semibold text-aing-primary transition hover:bg-aing-primary/5"
            >
              사용 가이드
            </a>
            <GitHubStars />
          </div>
        </div>

        {/* Right column — mascot + terminal */}
        <div className="relative" style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}>
          {/* Mascot behind terminal */}
          <img
            src="/ai-ing.png"
            alt="aing mascot"
            className="absolute -top-16 -right-4 z-0 w-40 md:w-52 drop-shadow-lg pointer-events-none select-none"
            style={{ opacity: 0.95 }}
          />
          <div className="relative z-10">
            <Terminal lines={terminalLines} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
