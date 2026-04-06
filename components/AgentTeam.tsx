"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const team = [
  { name: "Sam", icon: "/agents/sam.svg", role: "CTO", dept: "CTO", model: "opus", screenColor: "#a78bfa" },
  { name: "Simon", icon: "/agents/simon.svg", role: "CEO / 제품 전략", dept: "경영", model: "opus", screenColor: "#94a3b8" },
  { name: "Able", icon: "/agents/able.svg", role: "기획", dept: "기획", model: "sonnet", screenColor: "#60a5fa" },
  { name: "Klay", icon: "/agents/klay.svg", role: "설계", dept: "기획", model: "opus", screenColor: "#5eead4" },
  { name: "Ryan", icon: "/agents/ryan.svg", role: "원칙 도출", dept: "기획", model: "sonnet", screenColor: "#84cc16" },
  { name: "Jay", icon: "/agents/jay.svg", role: "API", dept: "백엔드", model: "sonnet", screenColor: "#fb923c" },
  { name: "Jerry", icon: "/agents/jerry.svg", role: "DB", dept: "백엔드", model: "sonnet", screenColor: "#fbbf24" },
  { name: "Milla", icon: "/agents/milla.svg", role: "보안", dept: "백엔드", model: "sonnet", screenColor: "#4ade80" },
  { name: "Jun", icon: "/agents/jun.svg", role: "성능", dept: "백엔드", model: "sonnet", screenColor: "#f97316" },
  { name: "Kain", icon: "/agents/kain.svg", role: "코드분석", dept: "백엔드", model: "sonnet", screenColor: "#64748b" },
  { name: "Willji", icon: "/agents/willji.svg", role: "디자인", dept: "디자인", model: "sonnet", screenColor: "#f9a8d4" },
  { name: "Iron", icon: "/agents/iron.svg", role: "화면", dept: "프론트", model: "sonnet", screenColor: "#d946ef" },
  { name: "Rowan", icon: "/agents/rowan.svg", role: "모션", dept: "프론트", model: "sonnet", screenColor: "#a3e635" },
  { name: "Derek", icon: "/agents/derek.svg", role: "모바일", dept: "모바일", model: "sonnet", screenColor: "#22d3ee" },
  { name: "Hugg", icon: "/agents/hugg.svg", role: "AI 모델 리서치", dept: "AI", model: "sonnet", screenColor: "#fbbf24" },
  { name: "Jo", icon: "/agents/jo.svg", role: "AI 구현", dept: "AI", model: "sonnet", screenColor: "#818cf8" },
  { name: "Noa", icon: "/agents/noa.svg", role: "합의 검증", dept: "기획", model: "sonnet", screenColor: "#14b8a6" },
  { name: "Critic", icon: "/agents/critic.svg", role: "심의 비평", dept: "기획", model: "opus", screenColor: "#ef4444" },
  { name: "Teacher", icon: "/agents/teacher.svg", role: "교육", dept: "교육", model: "sonnet", screenColor: "#8b5cf6" },
  { name: "Progress", icon: "/agents/progress.svg", role: "진행도 분석", dept: "PDCA", model: "sonnet", screenColor: "#06b6d4" },
  { name: "Figma", icon: "/agents/figma.svg", role: "Figma 분석", dept: "디자인", model: "sonnet", screenColor: "#f472b6" },
];

const presets = [
  { name: "Solo", size: 1, cost: "~15K", when: "간단한 버그 수정", members: "Jay" },
  { name: "Duo", size: 2, cost: "~18K", when: "중간 기능 추가", members: "Jay + Milla" },
  { name: "Squad", size: 4, cost: "~48K", when: "풀스택 개발", members: "Able + Jay + Iron + Sam" },
  { name: "Full", size: 7, cost: "~123K", when: "아키텍처 변경", members: "7명 총출동" },
];

type Tab = "team" | "presets";

/** Pixel art desk + monitor + character scene */
function DeskAgent({ agent, index, isInView }: {
  agent: typeof team[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col items-center cursor-default transition-all duration-300 ${
        hovered ? "-translate-y-1" : ""
      }`}
      style={
        isInView
          ? { animation: `fadeInUp 0.4s ease-out ${index * 0.07}s both` }
          : { opacity: 0 }
      }
    >
      {/* Speech bubble tooltip */}
      <div className={`absolute -top-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
        hovered ? "opacity-100 -translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90 pointer-events-none"
      }`}>
        <div className="bg-aing-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg relative">
          {agent.role} · {agent.model}
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-aing-primary rotate-45 rounded-sm" />
        </div>
      </div>

      {/* Character with wave animation on hover */}
      <div className={`relative transition-all duration-300 ${hovered ? "-translate-y-2" : ""}`}
        style={hovered ? { animation: "agent-wave 0.6s ease-in-out" } : {}}
      >
        <img
          src={agent.icon}
          alt={agent.name}
          width={44}
          height={44}
          className="relative z-10"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Desk with monitor (pixel art inline SVG) */}
      <svg
        width="72"
        height="36"
        viewBox="0 0 18 9"
        className={`-mt-1 transition-all duration-300 ${hovered ? "drop-shadow-md" : ""}`}
        style={{ imageRendering: "pixelated" as any }}
      >
        {/* Monitor */}
        <rect x="4" y="0" width="10" height="5" rx="0.5" fill="#374151" />
        <rect x="5" y="1" width="8" height="3" fill={agent.screenColor} opacity={hovered ? 1 : 0.6}>
          {hovered && (
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          )}
        </rect>
        {/* Monitor stand */}
        <rect x="8" y="5" width="2" height="1" fill="#6b7280" />
        <rect x="6" y="6" width="6" height="0.5" fill="#9ca3af" />
        {/* Desk surface */}
        <rect x="0" y="7" width="18" height="2" rx="0.3" fill="#d97706" />
        <rect x="0" y="7" width="18" height="0.5" fill="#f59e0b" />
      </svg>

      {/* Name tag */}
      <span className={`mt-1.5 text-sm font-extrabold transition-colors duration-200 ${
        hovered ? "text-aing-primary" : "text-aing-dark"
      }`}>
        {agent.name}
      </span>
      <span className="text-xs font-semibold text-aing-dark/50">{agent.dept}</span>
    </div>
  );
}

export default function AgentTeam() {
  const { ref, isInView } = useInView();
  const [tab, setTab] = useState<Tab>("team");

  return (
    <section className="bg-white py-20 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-aing-dark text-center mb-2">
          우리 팀을 소개할게요
        </h2>
        <p className="text-aing-dark/50 text-center mb-8 text-sm">
          21명의 전문가가 각자 책상에서 열일하고 있어요
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setTab("team")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "team"
                ? "bg-aing-primary text-white shadow-md"
                : "bg-aing-light border border-aing-dark/15 text-aing-dark/70 hover:border-aing-primary/40"
            }`}
          >
            사무실 구경하기
          </button>
          <button
            type="button"
            onClick={() => setTab("presets")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "presets"
                ? "bg-aing-primary text-white shadow-md"
                : "bg-aing-light border border-aing-dark/15 text-aing-dark/70 hover:border-aing-primary/40"
            }`}
          >
            자동 팀 구성
          </button>
        </div>

        {tab === "team" && (
          <div className="bg-aing-light rounded-2xl p-8 border border-aing-dark/5">
            {/* Office floor label */}
            <div className="text-center mb-6">
              <span className="inline-block bg-aing-primary/10 text-aing-primary text-xs font-bold px-3 py-1 rounded-full">
                aing 사무실
              </span>
            </div>

            {/* Office grid - agents at desks */}
            <div className="grid grid-cols-7 gap-x-2 gap-y-6 max-w-4xl mx-auto">
              {/* Row 1: Sam, Simon, Able, Klay, Ryan, Noa, Critic */}
              {[team[0], team[1], team[2], team[3], team[4], team[16], team[17]].map((agent, i) => (
                <DeskAgent key={agent.name} agent={agent} index={i} isInView={isInView} />
              ))}
              {/* Row 2: Jay, Jerry, Milla, Jun, Kain, Hugg, Jo */}
              {[team[5], team[6], team[7], team[8], team[9], team[14], team[15]].map((agent, i) => (
                <DeskAgent key={agent.name} agent={agent} index={i + 7} isInView={isInView} />
              ))}
              {/* Row 3: Willji, Iron, Rowan, Derek, Teacher, Progress, Figma */}
              {[team[10], team[11], team[12], team[13], team[18], team[19], team[20]].map((agent, i) => (
                <DeskAgent key={agent.name} agent={agent} index={i + 14} isInView={isInView} />
              ))}
            </div>

            {/* Office floor decoration */}
            <div className="flex justify-center gap-1 mt-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-aing-dark/5" />
              ))}
            </div>
          </div>
        )}

        {tab === "presets" && (
          <div>
            <p className="text-center text-xs text-aing-dark/40 mb-5">
              복잡도를 분석해서{" "}
              <span className="text-aing-primary font-semibold">자동으로</span>{" "}
              딱 맞는 팀을 구성해요
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presets.map((preset, index) => (
                <div
                  key={preset.name}
                  className="bg-aing-light rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
                  style={
                    isInView
                      ? { animation: `fadeInUp 0.3s ease-out ${index * 0.08}s both` }
                      : { opacity: 0 }
                  }
                >
                  <p className="text-lg font-bold text-aing-dark">{preset.name}</p>
                  <p className="text-aing-primary font-mono text-sm font-bold mt-1">{preset.cost}</p>
                  <p className="text-[10px] text-aing-dark/40 mt-1">{preset.when}</p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {Array.from({ length: preset.size }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-aing-primary" />
                    ))}
                    {Array.from({ length: 7 - preset.size }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    ))}
                  </div>
                  <p className="text-[9px] text-aing-dark/30 mt-2">{preset.members}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
