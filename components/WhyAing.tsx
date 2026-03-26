"use client";

import { useInView } from "@/hooks/useInView";

const beforeItems = [
  "수동 작업 반복",
  "컨텍스트 손실",
  "검증 없는 완료 선언",
  "매번 같은 실수",
];

const afterItems = [
  "자동 학습으로 진화",
  "증거 기반 완료 증명",
  "PDCA로 구조화된 워크플로우",
  "10명의 전문 에이전트 팀",
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
      </div>
    </section>
  );
}
