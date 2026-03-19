"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const team = [
  { name: "Sam", icon: "/agents/sam.svg", role: "CTO", dept: "CTO", model: "opus", screenColor: "#a78bfa" },
  { name: "Able", icon: "/agents/able.svg", role: "기획", dept: "기획", model: "sonnet", screenColor: "#60a5fa" },
  { name: "Klay", icon: "/agents/klay.svg", role: "설계", dept: "기획", model: "opus", screenColor: "#5eead4" },
  { name: "Jay", icon: "/agents/jay.svg", role: "API", dept: "백엔드", model: "sonnet", screenColor: "#fb923c" },
  { name: "Jerry", icon: "/agents/jerry.svg", role: "DB", dept: "백엔드", model: "sonnet", screenColor: "#fbbf24" },
  { name: "Milla", icon: "/agents/milla.svg", role: "보안", dept: "백엔드", model: "sonnet", screenColor: "#4ade80" },
  { name: "Willji", icon: "/agents/willji.svg", role: "디자인", dept: "디자인", model: "sonnet", screenColor: "#f9a8d4" },
  { name: "Derek", icon: "/agents/derek.svg", role: "화면", dept: "프론트", model: "sonnet", screenColor: "#22d3ee" },
  { name: "Rowan", icon: "/agents/rowan.svg", role: "모션", dept: "프론트", model: "sonnet", screenColor: "#a3e635" },
  { name: "Iron", icon: "/agents/iron.svg", role: "마법사", dept: "마법", model: "sonnet", screenColor: "#d946ef", highlight: true },
];

const presets = [
  { name: "Solo", size: 1, cost: "~15K", when: "간단한 버그 수정", members: "Jay" },
  { name: "Duo", size: 2, cost: "~18K", when: "중간 기능 추가", members: "Jay + Milla" },
  { name: "Squad", size: 4, cost: "~48K", when: "풀스택 개발", members: "Able + Jay + Derek + Sam" },
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
        <div className="bg-swkit-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg relative">
          {agent.role} · {agent.model}
          {agent.highlight && " · 비개발자 OK!"}
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-swkit-orange rotate-45 rounded-sm" />
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
        hovered ? "text-swkit-orange" : "text-swkit-dark"
      }`}>
        {agent.name}
      </span>
      <span className="text-xs font-semibold text-swkit-dark/50">{agent.dept}</span>
    </div>
  );
}

export default function AgentTeam() {
  const { ref, isInView } = useInView();
  const [tab, setTab] = useState<Tab>("team");

  return (
    <section className="bg-white py-20 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-swkit-dark text-center mb-2">
          우리 팀을 소개할게요
        </h2>
        <p className="text-swkit-dark/50 text-center mb-8 text-sm">
          10명의 전문가가 각자 책상에서 열일하고 있어요
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setTab("team")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "team"
                ? "bg-swkit-orange text-white shadow-md"
                : "bg-swkit-light border border-swkit-dark/15 text-swkit-dark/70 hover:border-swkit-orange/40"
            }`}
          >
            사무실 구경하기
          </button>
          <button
            type="button"
            onClick={() => setTab("presets")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "presets"
                ? "bg-swkit-orange text-white shadow-md"
                : "bg-swkit-light border border-swkit-dark/15 text-swkit-dark/70 hover:border-swkit-orange/40"
            }`}
          >
            자동 팀 구성
          </button>
        </div>

        {tab === "team" && (
          <div className="bg-swkit-light rounded-2xl p-8 border border-swkit-dark/5">
            {/* Office floor label */}
            <div className="text-center mb-6">
              <span className="inline-block bg-swkit-orange/10 text-swkit-orange text-xs font-bold px-3 py-1 rounded-full">
                sw-kit 사무실
              </span>
            </div>

            {/* Office grid - agents at desks */}
            <div className="grid grid-cols-5 gap-x-2 gap-y-6 max-w-xl mx-auto">
              {/* Row 1: Sam, Able, Klay, Willji, Iron */}
              {[team[0], team[1], team[2], team[6], team[9]].map((agent, i) => (
                <DeskAgent key={agent.name} agent={agent} index={i} isInView={isInView} />
              ))}
              {/* Row 2: Jay, Jerry, Milla, Derek, Rowan */}
              {[team[3], team[4], team[5], team[7], team[8]].map((agent, i) => (
                <DeskAgent key={agent.name} agent={agent} index={i + 5} isInView={isInView} />
              ))}
            </div>

            {/* Office floor decoration */}
            <div className="flex justify-center gap-1 mt-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-swkit-dark/5" />
              ))}
            </div>
          </div>
        )}

        {tab === "presets" && (
          <div>
            <p className="text-center text-xs text-swkit-dark/40 mb-5">
              복잡도를 분석해서{" "}
              <span className="text-swkit-orange font-semibold">자동으로</span>{" "}
              딱 맞는 팀을 구성해요
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presets.map((preset, index) => (
                <div
                  key={preset.name}
                  className="bg-swkit-light rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
                  style={
                    isInView
                      ? { animation: `fadeInUp 0.3s ease-out ${index * 0.08}s both` }
                      : { opacity: 0 }
                  }
                >
                  <p className="text-lg font-bold text-swkit-dark">{preset.name}</p>
                  <p className="text-swkit-orange font-mono text-sm font-bold mt-1">{preset.cost}</p>
                  <p className="text-[10px] text-swkit-dark/40 mt-1">{preset.when}</p>
                  <div className="flex justify-center gap-0.5 mt-2">
                    {Array.from({ length: preset.size }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-swkit-orange" />
                    ))}
                    {Array.from({ length: 7 - preset.size }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    ))}
                  </div>
                  <p className="text-[9px] text-swkit-dark/30 mt-2">{preset.members}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
