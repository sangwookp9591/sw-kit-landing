"use client";

import { useInView } from "@/hooks/useInView";

const beforeItems = [
  "수동 작업 반복",
  "컨텍스트 손실",
  "검증 없는 완료 선언",
  "매번 같은 실수",
];

const afterItems = [
  "1,712 테스트 통과 (99.7% pass rate)",
  "증거 기반 완료 증명 (No Evidence, No Done)",
  "Production Browse Server (1,706 LOC)",
  "16명의 전문 에이전트 + Teacher 교육 엔진",
];

export default function WhyAing() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-aing-dark text-center mb-12">
          Why aing?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Card */}
          <div
            className="bg-aing-dark text-white rounded-2xl p-8"
            style={
              isInView
                ? { animation: "fadeInLeft 0.6s ease-out both" }
                : { opacity: 0 }
            }
          >
            <h3 className="text-xl font-bold mb-6 text-red-400">Before</h3>
            {beforeItems.map((item) => (
              <div key={item} className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">
                  X
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          {/* After Card */}
          <div
            className="bg-white border-l-4 border-aing-primary rounded-2xl p-8 shadow-lg"
            style={
              isInView
                ? { animation: "fadeInRight 0.6s ease-out 0.3s both" }
                : { opacity: 0 }
            }
          >
            <h3 className="text-xl font-bold mb-6 text-aing-primary">After</h3>
            {afterItems.map((item) => (
              <div key={item} className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-aing-primary/20 text-aing-primary flex items-center justify-center text-sm font-bold">
                  {"\u2713"}
                </div>
                <span className="text-aing-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Scorecard: ai-ng vs gstack */}
        <div
          className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          style={
            isInView
              ? { animation: "fadeInUp 0.6s ease-out 0.6s both" }
              : { opacity: 0 }
          }
        >
          <h3 className="text-xl font-bold text-aing-dark text-center mb-6">
            ai-ng vs gstack — Scorecard
          </h3>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-aing-primary">86</p>
              <p className="text-sm text-aing-dark/60">ai-ng / 110</p>
            </div>
            <span className="text-2xl font-bold text-aing-dark/30">vs</span>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-aing-dark/40">61</p>
              <p className="text-sm text-aing-dark/60">gstack / 110</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Tests", aing: "1,712", gstack: "~100" },
              { label: "Browse Server", aing: "1,706", gstack: "1,218" },
              { label: "Eval Suites", aing: "10", gstack: "10" },
              { label: "Ship Steps", aing: "11", gstack: "prompt" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <p className="text-xs font-medium text-aing-dark/50 mb-2">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-aing-primary">
                  {stat.aing}
                </p>
                <p className="text-xs text-aing-dark/40">vs {stat.gstack}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
