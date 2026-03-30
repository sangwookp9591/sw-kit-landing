"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Terminal } from "@/components/Terminal";

const commands = [
  { name: "/aing do <자연어>", desc: "자동 라우팅 — 의도 분석 후 최적 파이프라인 선택", agent: "Intent Router", highlight: true },
  { name: "/aing wizard", desc: "자연어로 모든 것을 해결 (GSD 수준 라우팅)", agent: "Iron", highlight: true },
  { name: "/aing init <프로젝트>", desc: "질문 기반 문맥 수집 → 프로젝트 문서 생성", agent: "Klay", highlight: true },
  { name: "/aing auto <task>", desc: "전체 파이프라인 자동 실행", agent: "Klay > Able > Jay+Iron > Milla > Sam" },
  { name: "/aing team [agents] <task>", desc: "plan→exec→verify→fix 품질 루프", agent: "Staged Pipeline" },
  { name: "/aing plan <task>", desc: "다중 관점 계획 수립 (복잡도 자동 리뷰)", agent: "Able + Klay + Milla" },
  { name: "/aing explore <target>", desc: "코드베이스 탐색 + 구조 분석", agent: "Klay" },
  { name: "/aing debug <증상>", desc: "과학적 디버깅 — 가설→테스트→결론 (영구 상태)", agent: "Klay + Jay + Milla", highlight: true },
  { name: "/aing design", desc: "UI 디자인 생성/편집 (Figma MCP 연동)", agent: "Willji", highlight: true },
  { name: "/aing figma-read <url>", desc: "Figma → 기획 문서 자동 추출 (화면/플로우/컴포넌트)", agent: "Figma Reader", highlight: true },
  { name: "/aing progress-check", desc: "기획 문서 vs 코드베이스 구현 진행도 비교", agent: "Progress Checker", highlight: true },
  { name: "/aing refactor", desc: "구조적 리팩토링 — 영향 분석→실행→검증", agent: "Klay + Jay/Derek + Milla" },
  { name: "/aing test", desc: "테스트 실행/커버리지/누락 테스트 생성", agent: "Auto Test" },
  { name: "/aing perf", desc: "성능 프로파일링 — bundle/runtime/query 분석", agent: "Jun + Klay" },
  { name: "/aing lsp", desc: "죽은 코드 탐지 — LSP/AST/Grep 3단계", agent: "Simon" },
  { name: "/aing review-code", desc: "다중 관점 코드 리뷰 (보안 + 품질 + 성능)", agent: "Milla" },
  { name: "/aing qa-loop", desc: "QA 자동 루프 — test→fix→retest (max 5회)", agent: "Auto QA" },
  { name: "/aing start <name>", desc: "PDCA 사이클 시작", agent: "" },
  { name: "/aing tdd start", desc: "TDD Red-Green-Refactor", agent: "" },
  { name: "/aing verify", desc: "증거 체인 + 목표 달성 검증", agent: "Sam" },
  { name: "/aing rollback", desc: "Git 체크포인트 롤백", agent: "" },
  { name: "/aing agent-ui", desc: "에이전트 활동 모니터 (3D Office)", agent: "" },
  { name: "/aing status", desc: "대시보드 (PDCA + TDD + Task)", agent: "" },
  { name: "/aing help", desc: "베스트 프랙티스 가이드 + 도움말", agent: "" },
  { name: "/aing review-pipeline", desc: "4-tier 리뷰 파이프라인 (복잡도 기반 자동 선택)", agent: "Klay+Jay+Milla+Able+Sam+Willji+Iron", highlight: true },
  { name: "/aing review-pipeline eng", desc: "Eng Review (아키텍처, 테스트, 보안)", agent: "Klay + Jay + Milla" },
  { name: "/aing review-pipeline full", desc: "전체 4-tier + Outside Voice", agent: "All Reviewers" },
  { name: "/aing ship", desc: "7단계 자동 Ship (merge→test→version→changelog→PR)", agent: "Auto Ship", highlight: true },
  { name: "/aing freeze <dir>", desc: "디렉토리 편집 제한", agent: "" },
  { name: "/aing unfreeze", desc: "제한 해제", agent: "" },
  { name: "/aing retro", desc: "엔지니어링 회고", agent: "" },
  { name: "aing-learn", desc: "JSONL 학습 데이터 관리 (추가/검색/감쇠 확인)", agent: "CLI", highlight: true },
  { name: "aing-bench", desc: "벤치마크 실행 (LLM judge 7 criteria + eval store)", agent: "CLI", highlight: true },
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
  { name: "review-pipeline", desc: "4-tier 구조화 리뷰", trigger: "/aing review-pipeline" },
  { name: "ship", desc: "자동 배포 파이프라인", trigger: "/aing ship" },
  { name: "consensus", desc: "Multi-AI 3-voice 투표 (Claude + Codex + Gemini)", trigger: "/aing consensus" },
  { name: "pdca-auto", desc: "complexity(0-15) 기반 자동 PDCA 스케일링", trigger: "/aing auto" },
];

const usagePatterns = [
  { id: "A", name: "Quick Task", command: "/aing do \"task\"", desc: "자동 라우팅", detail: "의도를 분석해 최적 파이프라인을 자동 선택합니다" },
  { id: "B", name: "Full Pipeline", command: "/aing auto feat \"task\"", desc: "15명 에이전트 전체 파이프라인", detail: "탐색→기획→구현→리뷰→검증 전 과정을 자동 실행합니다" },
  { id: "C", name: "Review Only", command: "/aing review-pipeline", desc: "4-tier 리뷰", detail: "Eng + CEO + Design + Outside Voice 구조화 리뷰만 실행합니다" },
  { id: "D", name: "Custom Team", command: "/aing team agents \"task\"", desc: "팀 직접 구성", detail: "원하는 에이전트를 직접 선택해 팀을 구성합니다" },
  { id: "E", name: "Wizard", command: "/aing wizard", desc: "비개발자 모드", detail: "기술 용어 없이 자연어만으로 모든 기능을 사용합니다" },
];

const devFlow = [
  { step: 1, label: "Plan", desc: "다중 관점 계획 수립" },
  { step: 2, label: "Build", desc: "PDCA 사이클 기반 구현" },
  { step: 3, label: "Review", desc: "4-tier 구조화 리뷰" },
  { step: 4, label: "Ship", desc: "7-step 자동 배포" },
  { step: 5, label: "Retro", desc: "엔지니어링 회고" },
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
  "[Iron] Frontend UI 구현",
  "[Milla] 보안 리뷰: PASS",
  "[Sam] Goal-Backward: ACHIEVED",
  "",
  "Pipeline completed!",
];

type Tab = "patterns" | "commands" | "modes";

export default function Commands() {
  const { ref, isInView } = useInView();
  const [tab, setTab] = useState<Tab>("patterns");

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
            onClick={() => setTab("patterns")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "patterns"
                ? "bg-aing-primary text-white shadow-md"
                : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-primary/50"
            }`}
          >
            Usage Patterns
          </button>
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
            {tab === "patterns" && (
              <div className="space-y-3">
                {/* Usage Patterns */}
                {usagePatterns.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-aing-primary text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs">
                        {p.id}
                      </span>
                      <span className="font-bold text-aing-dark">{p.name}</span>
                      <span className="text-xs text-aing-dark/40 ml-auto">{p.desc}</span>
                    </div>
                    <code className="block text-xs text-aing-primary bg-aing-primary/10 px-3 py-1.5 rounded font-mono mb-2">
                      {p.command}
                    </code>
                    <p className="text-sm text-aing-dark/60">{p.detail}</p>
                  </div>
                ))}

                {/* Dev Flow */}
                <div className="mt-6 pt-4 border-t border-aing-dark/10">
                  <p className="text-sm font-semibold text-aing-dark mb-3">Development Flow</p>
                  <div className="flex items-center justify-between gap-1">
                    {devFlow.map((f, i) => (
                      <div key={f.step} className="flex items-center gap-1 flex-1">
                        <div className="flex flex-col items-center text-center flex-1">
                          <span className="bg-aing-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1">
                            {f.step}
                          </span>
                          <span className="text-xs font-bold text-aing-dark">{f.label}</span>
                          <span className="text-[10px] text-aing-dark/40">{f.desc}</span>
                        </div>
                        {i < devFlow.length - 1 && (
                          <div className="w-4 h-0.5 bg-aing-primary/30 rounded shrink-0 mt-[-12px]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
