"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const innovations = [
  { id: 0, name: "Context Budget", desc: "토큰 소비를 추적하고 예산 내에서 최적화합니다. 비용 효율적인 AI 사용을 보장합니다.", pdcaStage: "Plan" },
  { id: 1, name: "Adaptive Routing", desc: "작업 복잡도에 따라 최적의 모델(haiku/sonnet/opus)을 자동으로 선택합니다.", pdcaStage: "Do" },
  { id: 2, name: "Evidence Chain", desc: "테스트, 빌드, 린트 결과를 체인으로 연결하여 완료를 구조적으로 증명합니다.", pdcaStage: "Check" },
  { id: 3, name: "Self-Healing", desc: "장애를 자동으로 감지하고 복구합니다. 서킷 브레이커로 반복 실패를 차단합니다.", pdcaStage: "Act" },
  { id: 4, name: "Cross-Session Learning", desc: "성공 패턴을 캡처하여 다음 세션에 자동으로 적용합니다.", pdcaStage: "Review" },
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
          5 Innovations + PDCA
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
