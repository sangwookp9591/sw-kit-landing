"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Terminal } from "@/components/Terminal";

const commands = [
  { name: "/aing do <자연어>", desc: "자동 라우팅 — 의도 분석 후 최적 파이프라인 선택", agent: "Intent Router", highlight: true },
  { name: "/aing wizard", desc: "자연어로 모든 것을 해결 (GSD 수준 라우팅)", agent: "Iron", highlight: true },
  { name: "/aing init <프로젝트>", desc: "질문 기반 문맥 수집 → 프로젝트 문서 생성", agent: "Klay", highlight: true },
  { name: "/aing auto <task>", desc: "전체 파이프라인 자동 실행", agent: "Klay > Able > Jay+Derek > Milla > Sam" },
  { name: "/aing team [agents] <task>", desc: "plan→exec→verify→fix 품질 루프", agent: "Staged Pipeline" },
  { name: "/aing plan <task>", desc: "다중 관점 계획 수립 (복잡도 자동 리뷰)", agent: "Able + Klay + Milla" },
  { name: "/aing explore <target>", desc: "코드베이스 탐색 + 구조 분석", agent: "Klay" },
  { name: "/aing debug <증상>", desc: "과학적 디버깅 — 가설→테스트→결론 (영구 상태)", agent: "Klay + Jay + Milla", highlight: true },
  { name: "/aing design", desc: "UI 디자인 생성/편집 (Figma MCP 연동)", agent: "Willji", highlight: true },
  { name: "/aing figma-read <url>", desc: "Figma → 기획 문서 자동 추출 (화면/플로우/컴포넌트)", agent: "Figma Reader", highlight: true },
  { name: "/aing progress-check", desc: "기획 문서 vs 코드베이스 구현 진행도 비교", agent: "Progress Checker", highlight: true },
  { name: "/aing review-code", desc: "다중 관점 코드 리뷰 (보안 + 품질 + 성능)", agent: "Milla" },
  { name: "/aing qa-loop", desc: "QA 자동 루프 — test→fix→retest (max 5회)", agent: "Auto QA" },
  { name: "/aing start <name>", desc: "PDCA 사이클 시작", agent: "" },
  { name: "/aing tdd start", desc: "TDD Red-Green-Refactor", agent: "" },
  { name: "/aing verify", desc: "증거 체인 + 목표 달성 검증", agent: "Sam" },
  { name: "/aing rollback", desc: "Git 체크포인트 롤백", agent: "" },
  { name: "/aing agent-ui", desc: "에이전트 활동 모니터 (3D Office)", agent: "" },
  { name: "/aing status", desc: "대시보드 (PDCA + TDD + Task)", agent: "" },
  { name: "/aing help", desc: "베스트 프랙티스 가이드 + 도움말", agent: "" },
];

const modes = [
  { name: "vibe-coding", desc: "자연어만 입력하면 최적 파이프라인 자동 선택", trigger: "/aing do" },
  { name: "auto", desc: "Complexity scoring으로 팀 자동 구성 + 병렬 실행", trigger: "/aing auto" },
  { name: "team", desc: "plan→exec→verify→fix 품질 보장 루프 (max 3회 자동 수정)", trigger: "/aing team" },
  { name: "wizard", desc: "GSD 수준 자동 라우팅 + 비기술 번역 레이어", trigger: "/aing wizard" },
  { name: "debug", desc: "과학적 디버깅 — 가설→테스트→결론, 세션 간 재개", trigger: "/aing debug" },
  { name: "figma→code", desc: "Figma 파일 분석 → 기획 문서 → 구현 진행도 추적", trigger: "/aing figma-read" },
  { name: "qa-loop", desc: "test→fix→retest 자동 반복 (동일 에러 감지 시 중단)", trigger: "/aing qa-loop" },
  { name: "tdd", desc: "Red → Green → Refactor 자동 전환", trigger: "/aing tdd start" },
  { name: "goal-backward", desc: "완료 ≠ 달성 구분 — ACHIEVED / COMPLETED_NOT_ACHIEVED / INCOMPLETE", trigger: "/aing verify" },
  { name: "evidence", desc: "test/build/lint/diff/design/visual-qa 증거 체인", trigger: "/aing verify" },
];

const terminalLines = [
  "$ /aing do \"인증 기능 추가해줘\"",
  "",
  "━━━ aing 자동 라우팅 ━━━",
  "라우팅: /aing team (팀 파이프라인)",
  "━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "[Klay] 코드베이스 스캔...",
  "[Able] 계획 수립 + Task 생성",
  "[Jay] Backend API (TDD: 12/12)",
  "[Derek] Frontend UI 구현",
  "[Milla] 보안 리뷰: PASS",
  "[Sam] Goal-Backward: ACHIEVED",
  "",
  "Pipeline completed!",
];

type Tab = "commands" | "modes";

export default function Commands() {
  const { ref, isInView } = useInView();
  const [tab, setTab] = useState<Tab>("commands");

  return (
    <section className="bg-aing-light py-20 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-aing-dark text-center mb-4">
          Commands & Modes
        </h2>
        <p className="text-aing-dark/60 text-center mb-8">
          <code className="bg-aing-dark/5 px-2 py-1 rounded text-aing-primary font-mono text-sm">/aing</code>
          {" "}하나로 모든 기능을 사용하세요
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setTab("commands")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "commands"
                ? "bg-aing-primary text-white shadow-md"
                : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-primary/50"
            }`}
          >
            Commands
          </button>
          <button
            type="button"
            onClick={() => setTab("modes")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "modes"
                ? "bg-aing-primary text-white shadow-md"
                : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-primary/50"
            }`}
          >
            Modes & Skills
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div
            style={
              isInView
                ? { animation: "fadeInLeft 0.6s ease-out both" }
                : { opacity: 0 }
            }
          >
            {tab === "commands" && (
              <div className="space-y-2">
                {commands.map((cmd) => (
                  <div key={cmd.name} className={`flex items-start gap-3 py-1 ${cmd.highlight ? "bg-aing-primary/5 -mx-2 px-2 rounded-lg" : ""}`}>
                    <span className={`font-mono text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${cmd.highlight ? "text-white bg-aing-primary" : "text-aing-primary bg-aing-dark/5"}`}>
                      {cmd.name}
                    </span>
                    <span className="text-sm text-aing-dark/70 pt-0.5 flex-1">
                      {cmd.desc}
                    </span>
                    {cmd.agent && (
                      <span className="text-xs text-aing-dark/40 pt-1 whitespace-nowrap">
                        {cmd.agent}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === "modes" && (
              <div className="space-y-4">
                {modes.map((mode) => (
                  <div
                    key={mode.name}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-aing-dark">
                        {mode.name}
                      </span>
                      <code className="text-xs text-aing-primary bg-aing-primary/10 px-2 py-0.5 rounded font-mono">
                        {mode.trigger}
                      </code>
                    </div>
                    <p className="text-sm text-aing-dark/60">{mode.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={
              isInView
                ? { animation: "fadeInRight 0.6s ease-out 0.3s both" }
                : { opacity: 0 }
            }
          >
            <Terminal lines={terminalLines} loop={false} active={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
