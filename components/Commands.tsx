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
  { name: "/aing plan <task>", desc: "요구사항 분석 → 작업 분해", agent: "Able + Klay" },
  { name: "/aing explore <target>", desc: "코드베이스 탐색 + 구조 분석", agent: "Klay" },
  { name: "/aing start <name>", desc: "PDCA 사이클 시작", agent: "" },
  { name: "/aing tdd start", desc: "TDD Red-Green-Refactor", agent: "" },
  { name: "/aing execute <task>", desc: "Backend + Frontend 구현 (TDD)", agent: "Jay + Derek" },
  { name: "/aing debug <증상>", desc: "과학적 디버깅 — 가설→테스트→결론 (영구 상태)", agent: "Klay + Debugger", highlight: true },
  { name: "/aing review", desc: "보안 + 코드 품질 리뷰", agent: "Milla" },
  { name: "/aing verify", desc: "증거 체인 + 목표 달성 검증", agent: "Sam" },
  { name: "/aing cost", desc: "에이전트별 토큰/비용 추정 보고", agent: "", highlight: true },
  { name: "/aing rollback", desc: "Git 체크포인트 롤백", agent: "" },
  { name: "/aing agent-ui", desc: "3D Agent Office 브라우저 오픈", agent: "" },
  { name: "/aing status", desc: "대시보드 (PDCA + TDD + Task)", agent: "" },
  { name: "/aing help", desc: "베스트 프랙티스 가이드 + 도움말", agent: "" },
];

const modes = [
  { name: "vibe-coding", desc: "자연어만 입력하면 최적 파이프라인 자동 선택", trigger: "/aing do" },
  { name: "auto", desc: "Complexity scoring으로 팀 자동 구성 + 병렬 실행", trigger: "/aing auto" },
  { name: "team", desc: "plan→exec→verify→fix 품질 보장 루프 (max 3회 자동 수정)", trigger: "/aing team" },
  { name: "wizard", desc: "GSD 수준 자동 라우팅 + 비기술 번역 레이어", trigger: "/aing wizard" },
  { name: "debug", desc: "과학적 디버깅 — 가설→테스트→결론, 세션 간 재개", trigger: "/aing debug" },
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
          <code className="bg-aing-dark/5 px-2 py-1 rounded text-aing-orange font-mono text-sm">/aing</code>
          {" "}하나로 모든 기능을 사용하세요
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setTab("commands")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "commands"
                ? "bg-aing-orange text-white shadow-md"
                : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-orange/50"
            }`}
          >
            Commands
          </button>
          <button
            type="button"
            onClick={() => setTab("modes")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "modes"
                ? "bg-aing-orange text-white shadow-md"
                : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-orange/50"
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
                  <div key={cmd.name} className={`flex items-start gap-3 py-1 ${cmd.highlight ? "bg-aing-orange/5 -mx-2 px-2 rounded-lg" : ""}`}>
                    <span className={`font-mono text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${cmd.highlight ? "text-white bg-aing-orange" : "text-aing-orange bg-aing-dark/5"}`}>
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
                      <code className="text-xs text-aing-orange bg-aing-orange/10 px-2 py-0.5 rounded font-mono">
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
