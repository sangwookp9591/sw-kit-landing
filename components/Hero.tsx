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
            개발자에게는 최고의 도우미
            <br />
            비개발자에게는 최고의 마술사
          </p>

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

        {/* Right column */}
        <div style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}>
          <Terminal lines={terminalLines} loop={true} />
        </div>
      </div>
    </section>
  );
}
