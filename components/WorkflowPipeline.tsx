"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const pipeline = [
  {
    phase: 1,
    label: "탐색",
    agents: [
      { name: "Klay", icon: "/agents/klay.svg", role: "아키텍처 스캔" },
    ],
    desc: "코드베이스 구조를 싹 훑어봐요. 컨벤션이랑 의존성도 자동으로 파악!",
    output: "구조 리포트 + 컨벤션 자동 감지 완료",
  },
  {
    phase: 2,
    label: "기획",
    agents: [
      { name: "Able", icon: "/agents/able.svg", role: "요구사항 분석" },
      { name: "Klay", icon: "/agents/klay.svg", role: "아키텍처 설계" },
    ],
    desc: "뭘 만들지, 어떻게 나눌지, 수락 기준까지 딱딱 정리해드립니다.",
    output: ".aing/plans/ 계획서 + Task 체크리스트 자동 생성",
  },
  {
    phase: 3,
    label: "구현",
    agents: [
      { name: "Jay", icon: "/agents/jay.svg", role: "Backend API" },
      { name: "Jerry", icon: "/agents/jerry.svg", role: "DB + 인프라" },
      { name: "Milla", icon: "/agents/milla.svg", role: "인증 + 보안" },
      { name: "Willji", icon: "/agents/willji.svg", role: "UI/UX 디자인" },
      { name: "Iron", icon: "/agents/iron.svg", role: "프론트엔드" },
      { name: "Derek", icon: "/agents/derek.svg", role: "모바일" },
      { name: "Rowan", icon: "/agents/rowan.svg", role: "인터랙션" },
    ],
    desc: "7명이 동시에 달려요! PDCA Auto-Scaling(complexity 0-15 기반 자동 iteration) + TDD(빨강-초록-파랑) 필수 적용이라 안전하게~",
    output: "서브태스크마다 PDCA + TDD + 체크리스트 자동 체크",
  },
  {
    phase: 4,
    label: "리뷰",
    agents: [
      { name: "Klay", icon: "/agents/klay.svg", role: "Eng Review" },
      { name: "Jay", icon: "/agents/jay.svg", role: "Eng Review" },
      { name: "Milla", icon: "/agents/milla.svg", role: "Eng Review + CSO" },
      { name: "Able", icon: "/agents/able.svg", role: "CEO Review" },
      { name: "Sam", icon: "/agents/sam.svg", role: "CEO Review" },
      { name: "Willji", icon: "/agents/willji.svg", role: "Design Review" },
      { name: "Iron", icon: "/agents/iron.svg", role: "Design Review" },
    ],
    desc: "4-tier 구조화 리뷰: Eng(Klay+Jay+Milla) + CEO(Able+Sam) + Design(Willji+Iron) + Outside Voice. CSO 14-phase 보안 감사 포함.",
    output: "4-tier Review PASS / Critical 발견 시 자동 롤백",
  },
  {
    phase: 5,
    label: "검증 + Ship",
    agents: [
      { name: "Sam", icon: "/agents/sam.svg", role: "최종 판정 + Ship" },
    ],
    desc: "증거 없으면 완료 아님! 테스트/빌드/린트 전부 증거로 수집. 7-step Ship 워크플로우(merge→test→version→changelog→tag→PR→deploy) 자동 처리 + 엔지니어링 회고(Retro).",
    output: "[test] PASS  [build] PASS  [lint] PASS  → Ship 완료! → Retro 기록",
  },
];

export default function WorkflowPipeline() {
  const { ref, isInView } = useInView();
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => { setIsAutoPlaying(true); setActivePhase(0); }, 500);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(() => {
      setActivePhase((prev) => {
        if (prev >= pipeline.length - 1) { setIsAutoPlaying(false); return prev; }
        return prev + 1;
      });
    }, 2800);
    return () => clearInterval(t);
  }, [isAutoPlaying]);

  const active = pipeline[activePhase];

  return (
    <section className="py-20 px-6 bg-aing-light" id="workflow" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold text-aing-dark text-center mb-2"
          style={isInView ? { animation: "fadeInUp 0.5s ease-out both" } : { opacity: 0 }}
        >
          이렇게 동작해요
        </h2>
        <p
          className="text-aing-dark/50 text-center mb-12"
          style={isInView ? { animation: "fadeInUp 0.5s ease-out 0.1s both" } : { opacity: 0 }}
        >
          <code className="bg-aing-primary/10 px-2 py-1 rounded text-aing-primary font-mono text-sm">
            /aing auto
          </code>{" "}
          한 줄이면 전체 파이프라인이 돌아갑니다
        </p>

        {/* Phase timeline */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 flex-wrap">
          {pipeline.map((step, i) => {
            const done = i < activePhase;
            const current = i === activePhase;
            return (
              <div key={step.phase} className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAutoPlaying(false); setActivePhase(i); }}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-500 cursor-pointer ${
                    current
                      ? "bg-aing-primary text-white scale-110 shadow-lg shadow-aing-primary/20"
                      : done
                        ? "bg-aing-primary/10 text-aing-primary"
                        : "bg-white border border-aing-dark/10 text-aing-dark/40 hover:border-aing-primary/30 hover:text-aing-dark/60"
                  }`}
                >
                  <div className="flex -space-x-1.5">
                    {step.agents.slice(0, 3).map((a) => (
                      <img
                        key={a.name}
                        src={a.icon}
                        alt={a.name}
                        width={20}
                        height={20}
                        className={`rounded border transition-all duration-300 ${
                          current ? "border-white/40 scale-110" : "border-aing-dark/10 opacity-60"
                        }`}
                        style={{ imageRendering: "pixelated" }}
                      />
                    ))}
                    {step.agents.length > 3 && (
                      <span className={`flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold ${
                        current ? "bg-white/20 text-white" : "bg-aing-dark/5 text-aing-dark/40"
                      }`}>
                        +{step.agents.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                  {done && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-aing-primary">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <polyline points="4 7 6 9.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
                {i < pipeline.length - 1 && (
                  <div className={`w-4 sm:w-6 h-0.5 rounded transition-colors duration-500 ${done ? "bg-aing-primary/40" : "bg-aing-dark/10"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Active phase detail card */}
        <div
          className="rounded-2xl border border-aing-primary/15 bg-white overflow-hidden shadow-sm transition-all duration-500"
          key={activePhase}
          style={{ animation: "fadeInUp 0.4s ease-out both" }}
        >
          {/* Phase header */}
          <div className="bg-aing-primary/5 px-6 py-4 flex items-center justify-between border-b border-aing-primary/10">
            <div className="flex items-center gap-3">
              <span className="bg-aing-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                {active.phase}
              </span>
              <span className="text-aing-dark font-bold text-lg">{active.label}</span>
            </div>
            <span className="text-aing-primary text-sm font-medium">
              {active.agents.length === 1 ? active.agents[0].name : `${active.agents.length}명 투입`}
            </span>
          </div>

          <div className="p-6">
            {/* Agent cards */}
            <div className="flex flex-wrap gap-3 mb-5">
              {active.agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className="flex items-center gap-2.5 bg-aing-light border border-aing-dark/5 rounded-xl px-3 py-2 hover:border-aing-primary/30 hover:shadow-sm transition-all"
                  style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.06}s both` }}
                >
                  <img
                    src={agent.icon}
                    alt={agent.name}
                    width={28}
                    height={28}
                    className="rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div>
                    <p className="text-aing-dark text-sm font-bold leading-none">{agent.name}</p>
                    <p className="text-aing-dark/40 text-xs">{agent.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-aing-dark/70 mb-4 leading-relaxed">{active.desc}</p>

            {/* Output */}
            <div className="bg-aing-dark rounded-lg px-4 py-3 font-mono text-sm flex items-start gap-2">
              <span className="text-aing-primary shrink-0">$</span>
              <span className="text-green-400">{active.output}</span>
            </div>
          </div>
        </div>

        {/* Replay */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => { setActivePhase(0); setIsAutoPlaying(true); }}
            className="px-5 py-2.5 rounded-xl bg-aing-light text-aing-dark/50 text-sm font-medium hover:bg-aing-dark/5 hover:text-aing-dark transition-all cursor-pointer border border-aing-dark/10"
          >
            다시 보기
          </button>
        </div>
      </div>
    </section>
  );
}
