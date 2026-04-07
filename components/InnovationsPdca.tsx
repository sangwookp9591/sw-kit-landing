"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const innovations = [
  { id: 0, name: "Intent Router", desc: "자연어를 분석하여 auto/plan/team 중 최적 파이프라인을 자동 선택합니다. 앵커 탐지(파일/함수/에러) + complexity scoring 조합.", pdcaStage: "Plan", isNew: true },
  { id: 1, name: "Adaptive Routing", desc: "작업 복잡도에 따라 최적의 모델(haiku/sonnet/opus)과 팀 프리셋(Solo/Duo/Squad/Full)을 자동으로 선택합니다.", pdcaStage: "Do" },
  { id: 2, name: "Evidence Chain", desc: "test/build/lint/diff/design/visual-qa 증거를 체인으로 연결하여 완료를 구조적으로 증명합니다.", pdcaStage: "Check" },
  { id: 3, name: "Goal-Backward", desc: "완료 ≠ 달성을 구분합니다. ACHIEVED / COMPLETED_NOT_ACHIEVED / INCOMPLETE 3단계 판정으로 목표 달성 여부를 검증합니다.", pdcaStage: "Check", isNew: true },
  { id: 4, name: "4-Tier Review Pipeline", desc: "CEO/Eng/Design/Outside Voice 구조화 리뷰. 복잡도에 따라 tier를 자동 선택하고, 각 관점에서 독립적으로 리뷰합니다.", pdcaStage: "Check", isNew: true },
  { id: 5, name: "Ship Workflow", desc: "7단계 자동화 (merge→test→version→changelog→PR). 브랜치 머지부터 PR 생성까지 한 번에 처리합니다.", pdcaStage: "Act", isNew: true },
  { id: 6, name: "CSO Security Audit", desc: "14-phase OWASP+STRIDE 보안 감사. 인프라, 의존성, CI/CD, 신뢰 경계를 체계적으로 점검합니다.", pdcaStage: "Check", isNew: true },
  { id: 7, name: "AI Pipeline", desc: "AI 모델 탐색→벤치마크 비교→코드 생성→API 스캐폴딩→테스트까지 자동 파이프라인. Hugg(리서치) + Jo(구현) 협업.", pdcaStage: "Do", isNew: true },
  { id: 8, name: "PDCA Auto-Scaling", desc: "complexity(0-15) 기반 자동 iteration limit + review tier 선택. 작업 복잡도에 따라 PDCA 사이클 깊이가 자동 조절됩니다.", pdcaStage: "Plan", isNew: true },
  { id: 9, name: "AING-DR 합의 프로세스", desc: "Ryan(원칙 도출) → Able(설계) → Klay(반론) → Noah(검증) → Critic(비평). 다중 관점 합의 기반 의사결정.", pdcaStage: "Plan", isNew: true },
  { id: 10, name: "Design System Engine", desc: "토큰 생성 → 비교 → 반복 개선 → 진화적 최적화 → 갤러리. CSS/Tailwind 자동 출력.", pdcaStage: "Do", isNew: true },
  { id: 11, name: "Teacher Agent", desc: "소크라틱 교육 — 답을 주지 않고 질문으로 이끔. 학습자 수준 자동 추적 + 난이도 조절.", pdcaStage: "Review", isNew: true },
  { id: 12, name: "Ship→Deploy Full Chain", desc: "land-orchestrator: PR check → merge → deploy wait → canary. /aing ship(7) + land(4) = 11 steps.", pdcaStage: "Act", isNew: true },
  { id: 13, name: "Progress Check", desc: "기획 문서 vs 코드베이스 구현 진행도를 비교 분석. 진행률%, 미구현 항목을 자동 리포트합니다.", pdcaStage: "Check" },
  { id: 14, name: "Harness Architect", desc: "메타 스킬: 자동 설계 + 검증 + 패턴 갤러리 + 시뮬레이션 + 멀티 하네스 조합 + 런타임 진단.", pdcaStage: "Plan", isNew: true },
  { id: 15, name: "Context Budget", desc: "훅 단위 토큰 소비 추적. 예산 초과 시 자동 경고 + 모델 다운그레이드.", pdcaStage: "Plan" },
  { id: 16, name: "Cross-Session Learning", desc: "세션 간 패턴 재사용. 30일 confidence decay로 오래된 학습 자동 퇴화.", pdcaStage: "Act" },
  { id: 17, name: "AI Slop Detection", desc: "10가지 안티패턴 + 7개 리트머스 테스트로 AI 생성 코드의 품질 저하를 자동 감지.", pdcaStage: "Check" },
  { id: 18, name: "Prompt Injection Guard", desc: "7가지 패턴 + XML trust boundary로 프롬프트 인젝션 공격 차단.", pdcaStage: "Check" },
  { id: 19, name: "Autoplan Engine", desc: "6원칙 기반 자동 의사결정. 복잡도/앵커/히스토리 조합으로 최적 실행 경로 선택.", pdcaStage: "Plan" },
  { id: 20, name: "AST Grep", desc: "@ast-grep/napi 기반 구조적 코드 검색/치환. 정규식이 아닌 AST 레벨 정확도.", pdcaStage: "Do" },
  { id: 21, name: "3-Tier Notepad", desc: "Priority/Working/Manual 3단계 메모. 컴팩션에서도 살아남는 영속 메모리.", pdcaStage: "Plan" },
  { id: 22, name: "Team Heartbeat", desc: "워커 헬스 모니터링 + phase gate 검증. 멈춘 에이전트 자동 감지.", pdcaStage: "Check" },
  { id: 23, name: "Learner Hook", desc: "재사용 가능한 명령/파일/에러 수정 패턴을 자동 감지하여 학습 DB에 저장.", pdcaStage: "Act" },
  { id: 24, name: "Persistent Mode", desc: "세션 복구 기반 Don't-stop 실행. 컨텍스트 리셋에서도 작업 상태 유지.", pdcaStage: "Do" },
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
