"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const innovations = [
  { id: 0, name: "Intent Router", desc: "자연어를 분석하여 auto/plan/team/wizard 중 최적 파이프라인을 자동 선택합니다. 앵커 탐지(파일/함수/에러) + complexity scoring 조합.", pdcaStage: "Plan", isNew: true },
  { id: 1, name: "Adaptive Routing", desc: "작업 복잡도에 따라 최적의 모델(haiku/sonnet/opus)과 팀 프리셋(Solo/Duo/Squad/Full)을 자동으로 선택합니다.", pdcaStage: "Do" },
  { id: 2, name: "Evidence Chain", desc: "test/build/lint/diff/design/visual-qa/component-ast 7가지 증거를 체인으로 연결하여 완료를 구조적으로 증명합니다.", pdcaStage: "Check" },
  { id: 3, name: "Goal-Backward", desc: "완료 ≠ 달성을 구분합니다. ACHIEVED / COMPLETED_NOT_ACHIEVED / INCOMPLETE 3단계 판정으로 목표 달성 여부를 검증합니다.", pdcaStage: "Check", isNew: true },
  { id: 4, name: "Self-Healing", desc: "장애를 자동으로 감지하고 복구합니다. State GC로 좀비 feature를 자동 정리합니다.", pdcaStage: "Act" },
  { id: 5, name: "Cross-Session Learning", desc: "성공 패턴을 캡처하여 다음 세션에 자동으로 적용합니다. 디버그 상태도 세션 간 재개 가능.", pdcaStage: "Review" },
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
        <h2 className="text-3xl font-bold text-swkit-dark text-center mb-12">
          6 Innovations + PDCA
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
                  ? "bg-swkit-orange text-white"
                  : "bg-white border border-swkit-dark/20 text-swkit-dark hover:border-swkit-orange/50"
              }`}
            >
              {item.name}
              {item.isNew && <span className="ml-1.5 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12 min-h-[100px]">
          <p className="text-xl font-bold text-swkit-dark">{active.name}</p>
          <p className="text-swkit-dark/70 mt-2">{active.desc}</p>
          <p className="mt-3 text-sm">
            연결 PDCA 단계:{" "}
            <span className="bg-swkit-orange text-white px-2 py-0.5 rounded text-xs">
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
                    ? "bg-swkit-orange text-white scale-110 shadow-lg"
                    : "bg-gray-100 text-swkit-dark/50"
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
