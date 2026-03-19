"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Terminal } from "@/components/Terminal";

const commands = [
  { name: "/swkit start <name>", desc: "PDCA 사이클 시작", agent: "" },
  { name: "/swkit auto <f> <task>", desc: "전체 파이프라인 자동 실행", agent: "Klay > Able > Jay+Derek > Milla > Sam" },
  { name: "/swkit status", desc: "대시보드 (PDCA + TDD + Task + Budget)", agent: "" },
  { name: "/swkit next", desc: "다음 PDCA 단계 진행", agent: "" },
  { name: "/swkit tdd start", desc: "TDD Red-Green-Refactor", agent: "" },
  { name: "/swkit explore <target>", desc: "코드베이스 탐색", agent: "Klay" },
  { name: "/swkit plan <task>", desc: "계획 수립", agent: "Able + Klay" },
  { name: "/swkit execute <task>", desc: "코드 구현 (TDD)", agent: "Jay + Derek" },
  { name: "/swkit review", desc: "보안 리뷰", agent: "Milla" },
  { name: "/swkit verify", desc: "최종 검증 + 증거 체인", agent: "Sam" },
  { name: "/swkit wizard", desc: "비개발자 마술사 모드", agent: "Iron" },
  { name: "/swkit rollback", desc: "체크포인트 롤백", agent: "" },
  { name: "/swkit task create", desc: "Task 체크리스트 생성", agent: "" },
  { name: "/swkit learn show", desc: "학습 기록 조회", agent: "" },
  { name: "/swkit help", desc: "도움말", agent: "" },
];

const modes = [
  { name: "auto", desc: "10인 팀 풀 파이프라인 자동 실행", trigger: "/swkit auto" },
  { name: "tdd", desc: "Red > Green > Refactor 자동 전환", trigger: "/swkit tdd start" },
  { name: "wizard", desc: "비개발자 가이디드 워크플로우", trigger: "/swkit wizard" },
  { name: "rollback", desc: "Git 체크포인트 기반 안전 복구", trigger: "/swkit rollback" },
  { name: "task", desc: "체크리스트 계층 추적 관리", trigger: "/swkit task" },
  { name: "evidence", desc: "증거 체인 수집 + 완료 판정", trigger: "/swkit verify" },
];

const terminalLines = [
  "$ /swkit auto user-auth \"JWT auth\"",
  "",
  "[Klay] 코드베이스 스캔...",
  "[Able] 계획 수립 + Task 체크리스트 생성",
  "[Jay] Backend API 구현 (TDD)",
  "[Derek] Frontend 화면 구현",
  "[Milla] 보안 리뷰: PASS",
  "[Sam] Evidence Chain: PASS",
  "",
  "Pipeline completed!",
];

type Tab = "commands" | "modes";

export default function Commands() {
  const { ref, isInView } = useInView();
  const [tab, setTab] = useState<Tab>("commands");

  return (
    <section className="bg-swkit-light py-20 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-swkit-dark text-center mb-4">
          Commands & Modes
        </h2>
        <p className="text-swkit-dark/60 text-center mb-8">
          <code className="bg-swkit-dark/5 px-2 py-1 rounded text-swkit-orange font-mono text-sm">/swkit</code>
          {" "}하나로 모든 기능을 사용하세요
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setTab("commands")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "commands"
                ? "bg-swkit-orange text-white shadow-md"
                : "bg-white border border-swkit-dark/20 text-swkit-dark hover:border-swkit-orange/50"
            }`}
          >
            Commands
          </button>
          <button
            type="button"
            onClick={() => setTab("modes")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === "modes"
                ? "bg-swkit-orange text-white shadow-md"
                : "bg-white border border-swkit-dark/20 text-swkit-dark hover:border-swkit-orange/50"
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
                  <div key={cmd.name} className="flex items-start gap-3 py-1">
                    <span className="font-mono text-xs font-semibold text-swkit-orange bg-swkit-dark/5 px-2 py-1 rounded whitespace-nowrap">
                      {cmd.name}
                    </span>
                    <span className="text-sm text-swkit-dark/70 pt-0.5 flex-1">
                      {cmd.desc}
                    </span>
                    {cmd.agent && (
                      <span className="text-xs text-swkit-dark/40 pt-1 whitespace-nowrap">
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
                      <span className="font-bold text-swkit-dark">
                        {mode.name}
                      </span>
                      <code className="text-xs text-swkit-orange bg-swkit-orange/10 px-2 py-0.5 rounded font-mono">
                        {mode.trigger}
                      </code>
                    </div>
                    <p className="text-sm text-swkit-dark/60">{mode.desc}</p>
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
