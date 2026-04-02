"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const innovations = [
  { id: 0, name: "Intent Router", desc: "자연어를 분석하여 auto/plan/team 중 최적 파이프라인을 자동 선택합니다. 앵커 탐지(파일/함수/에러) + complexity scoring 조합.", pdcaStage: "Plan", isNew: true },
  { id: 1, name: "Adaptive Routing", desc: "작업 복잡도에 따라 최적의 모델(haiku/sonnet/opus)과 팀 프리셋(Solo/Duo/Squad/Full)을 자동으로 선택합니다.", pdcaStage: "Do" },
  { id: 2, name: "Evidence Chain", desc: "test/build/lint/diff/design/visual-qa/component-ast 7가지 증거를 체인으로 연결하여 완료를 구조적으로 증명합니다.", pdcaStage: "Check" },
  { id: 3, name: "Goal-Backward", desc: "완료 ≠ 달성을 구분합니다. ACHIEVED / COMPLETED_NOT_ACHIEVED / INCOMPLETE 3단계 판정으로 목표 달성 여부를 검증합니다.", pdcaStage: "Check", isNew: true },
  { id: 4, name: "Self-Healing", desc: "장애를 자동으로 감지하고 복구합니다. State GC로 좀비 feature를 자동 정리합니다.", pdcaStage: "Act" },
  { id: 5, name: "Cross-Session Learning", desc: "성공 패턴을 캡처하여 다음 세션에 자동으로 적용합니다. 디버그 상태도 세션 간 재개 가능.", pdcaStage: "Review" },
  { id: 6, name: "4-Tier Review Pipeline", desc: "CEO/Eng/Design/Outside Voice 구조화 리뷰. 복잡도에 따라 tier를 자동 선택하고, 각 관점에서 독립적으로 리뷰합니다.", pdcaStage: "Check", isNew: true },
  { id: 7, name: "Ship Workflow", desc: "7단계 자동화 (merge→test→version→changelog→PR). 브랜치 머지부터 PR 생성까지 한 번에 처리합니다.", pdcaStage: "Act", isNew: true },
  { id: 8, name: "CSO Security Audit", desc: "14-phase OWASP+STRIDE 보안 감사. 인프라, 의존성, CI/CD, 신뢰 경계를 체계적으로 점검합니다.", pdcaStage: "Check", isNew: true },
  { id: 9, name: "AI Slop Detection", desc: "10가지 안티패턴 + 디자인 스코어링. AI가 생성한 코드의 품질 저하 패턴을 자동 탐지하고 개선합니다.", pdcaStage: "Review" },
  { id: 10, name: "Multi-AI Consensus", desc: "Claude + Codex + Gemini 3-voice 투표 엔진. cli-bridge factory로 다중 AI 관점을 통합하여 더 정확한 판단을 내립니다.", pdcaStage: "Check", isNew: true },
  { id: 11, name: "PDCA Auto-Scaling", desc: "complexity(0-15) 기반 자동 iteration limit + review tier 선택. 작업 복잡도에 따라 PDCA 사이클 깊이가 자동 조절됩니다.", pdcaStage: "Plan", isNew: true },
  { id: 12, name: "Confidence Decay", desc: "관찰 기반 학습 항목은 -1/30일 자연 감쇠, 사용자 명시 항목은 영구 유지. 오래된 패턴은 자동으로 잊고 최신 패턴을 우선합니다.", pdcaStage: "Review", isNew: true },
  { id: 13, name: "Prompt Injection Guard", desc: "7개 regex 패턴 + XML trust boundary wrapping. 프롬프트 인젝션 공격을 자동 탐지하고 차단합니다.", pdcaStage: "Check", isNew: true },
  { id: 14, name: "Design System Engine", desc: "토큰 생성 → 비교 → 반복 개선 → 진화적 최적화 → 갤러리. CSS/Tailwind 자동 출력.", pdcaStage: "Do", isNew: true },
  { id: 15, name: "Teacher Agent", desc: "소크라틱 교육 — 답을 주지 않고 질문으로 이끔. 학습자 수준 자동 추적 + 난이도 조절.", pdcaStage: "Review", isNew: true },
  { id: 16, name: "40 Skills Ecosystem", desc: "investigate, office-hours, retro, benchmark, design-*, careful, freeze, land-and-deploy, harness 등 40개 스킬.", pdcaStage: "Do", isNew: true },
  { id: 17, name: "60 Browse Commands", desc: "cookie-import-browser, connect-chrome, dialog control, frame, state save/load 등 60개 브라우저 명령어.", pdcaStage: "Check" },
  { id: 18, name: "Production Browse Server", desc: "1,706 LOC 서버: session 관리, activity pub/sub, bearer token auth, crash auto-restart, graceful shutdown.", pdcaStage: "Do", isNew: true },
  { id: 19, name: "Eval E2E Infrastructure", desc: "session-runner + eval-store + touchfiles. 10개 스킬별 E2E 테스트(131 pass). git diff 기반 선택적 실행.", pdcaStage: "Check", isNew: true },
  { id: 20, name: "Ship→Deploy Full Chain", desc: "land-orchestrator: PR check → merge → deploy wait → canary. /aing ship(7) + land(4) = 11 steps.", pdcaStage: "Act", isNew: true },
  { id: 21, name: "ETHOS 8 Principles", desc: "No Evidence No Done, PDCA는 방향, 에이전트는 역할, 자가 치유, Hook은 눈, Zero Dependencies, 사용자가 결정.", pdcaStage: "Review", isNew: true },
  { id: 22, name: "AST Grep", desc: "구조적 코드 검색/변환. @ast-grep/napi 기반. TypeScript, JavaScript, TSX, CSS, HTML 지원.", pdcaStage: "Check" },
  { id: 23, name: "3-Tier Notepad", desc: "Priority(영구)/Working(7일)/Manual(영구). Context compaction 생존. 세션 간 정보 유지.", pdcaStage: "Review" },
  { id: 24, name: "Harness Architect", desc: "7-feature 메타 스킬: 자동 설계(adaptive) + 검증(check) + 패턴 갤러리(find) + 시뮬레이션(sim) + 버전 이력(log) + 멀티 하네스 조합(chain) + 런타임 진단(fix). 9 TS 모듈, 2,523 LOC.", pdcaStage: "Plan", isNew: true },
];

const pdcaStages = ["Plan", "Do", "Check", "Act", "Review"];

export default function InnovationsPdca() {
  const { ref, isInView } = useInView();
  const [activeTab, setActiveTab] = useState(0);

  const active = innovations[activeTab];

  return (
    <section className="py-20 px-6">
      <div
        ref={ref}
        className="max-w-7xl mx-auto"
        style={
          isInView
            ? { animation: "fadeInUp 0.5s ease-out both" }
            : { opacity: 0 }
        }
      >
        <h2 className="text-3xl font-bold text-aing-dark text-center mb-12">
          25 Innovations + PDCA
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {innovations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-aing-primary text-white"
                  : "bg-white border border-aing-dark/20 text-aing-dark hover:border-aing-primary/50"
              }`}
            >
              {item.name}
              {item.isNew && <span className="ml-1.5 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12 min-h-[100px]">
          <p className="text-xl font-bold text-aing-dark">{active.name}</p>
          <p className="text-aing-dark/70 mt-2">{active.desc}</p>
          <p className="mt-3 text-sm">
            연결 PDCA 단계:{" "}
            <span className="bg-aing-primary text-white px-2 py-0.5 rounded text-xs">
              {active.pdcaStage}
            </span>
          </p>
        </div>

        {/* PDCA flow */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {pdcaStages.map((stage, index) => (
            <div key={stage} className="flex items-center gap-2">
              <span
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active.pdcaStage === stage
                    ? "bg-aing-primary text-white scale-110 shadow-lg"
                    : "bg-gray-100 text-aing-dark/50"
                }`}
              >
                {stage}
              </span>
              {index < pdcaStages.length - 1 && (
                <span className="text-gray-300 text-lg">{"\u2192"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
