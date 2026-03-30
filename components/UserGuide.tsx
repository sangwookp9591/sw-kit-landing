"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const situations = [
  {
    icon: "/agents/jay.svg",
    agent: "Jay",
    title: "뭔가 만들고 싶을 때",
    examples: [
      "로그인 기능 추가해줘",
      "댓글 기능 만들어줘",
      "결제 API 연동해줘",
    ],
    command: '/aing do "로그인 기능 추가해줘"',
    route: "auto",
    detail: "aing이 복잡도를 분석해서 적절한 에이전트 팀을 자동 배정합니다",
  },
  {
    icon: "/agents/klay.svg",
    agent: "Klay",
    title: "버그를 고치고 싶을 때",
    examples: [
      "로그인하면 500 에러가 나",
      "버튼 클릭하면 아무 반응이 없어",
      "배포하니까 깨졌어",
    ],
    command: '/aing do "로그인하면 500 에러"',
    route: "debug",
    detail: "4단계 체계적 디버깅: 증상 수집 → 가설 → 검증 → 수정",
  },
  {
    icon: "/agents/milla.svg",
    agent: "Milla",
    title: "코드를 리뷰받고 싶을 때",
    examples: [
      "내가 짠 코드 좀 봐줘",
      "PR 올리기 전에 리뷰해줘",
      "보안 문제 없는지 확인해줘",
    ],
    command: '/aing do "내 코드 리뷰해줘"',
    route: "review-pipeline",
    detail: "4-tier 리뷰: Eng(보안/품질) + CEO(전략) + Design(UI/UX) + Outside Voice",
  },
  {
    icon: "/agents/klay.svg",
    agent: "Klay",
    title: "코드를 이해하고 싶을 때",
    examples: [
      "이 프로젝트 구조 설명해줘",
      "auth 폴더가 뭐 하는 곳이야?",
      "이 함수가 어떻게 동작해?",
    ],
    command: '/aing do "프로젝트 구조 설명해줘"',
    route: "explore",
    detail: "Klay이 코드베이스를 스캔하고 아키텍처를 분석합니다",
  },
  {
    icon: "/agents/jun.svg",
    agent: "Jun",
    title: "성능이 느릴 때",
    examples: [
      "왜 이렇게 느리지?",
      "번들 사이즈 확인해줘",
      "페이지 로딩이 3초나 걸려",
    ],
    command: '/aing do "왜 이렇게 느리지"',
    route: "perf",
    detail: "Jun이 런타임/번들/쿼리를 프로파일링하고 병목을 찾습니다",
  },
  {
    icon: "/agents/jay.svg",
    agent: "Jay",
    title: "테스트를 작성하고 싶을 때",
    examples: [
      "이 기능 테스트 짜줘",
      "테스트 먼저 쓰고 코드 짤래",
      "커버리지 확인해줘",
    ],
    command: '/aing do "테스트 짜줘"',
    route: "tdd",
    detail: "TDD 사이클: RED(테스트 작성) → GREEN(코드 작성) → REFACTOR(개선)",
  },
  {
    icon: "/agents/sam.svg",
    agent: "Sam",
    title: "배포하고 싶을 때",
    examples: [
      "이거 PR 만들어줘",
      "배포할 준비 됐어",
      "버전 올려줘",
    ],
    command: "/aing ship",
    route: "ship",
    detail: "7단계 자동: merge → test → review → version → changelog → PR",
  },
  {
    icon: "/agents/kain.svg",
    agent: "Kain",
    title: "코드를 정리하고 싶을 때",
    examples: [
      "이 코드 리팩토링해줘",
      "안 쓰는 코드 정리해줘",
      "중복 코드 합쳐줘",
    ],
    command: '/aing do "리팩토링해줘"',
    route: "refactor",
    detail: "Kain(분석) → Jay(실행) → Milla(검증) 3단계 안전 리팩토링",
  },
];

const faqs = [
  {
    q: "명령어를 외워야 하나요?",
    a: '아닙니다. /aing do "하고 싶은 것" 하나만 기억하세요. 자연어로 말하면 aing이 알아서 적절한 기능을 선택합니다.',
  },
  {
    q: "실수하면 어떻게 되나요?",
    a: "/aing rollback으로 마지막 안전한 상태로 돌아갑니다. rm -rf 같은 위험한 명령은 자동으로 차단됩니다.",
  },
  {
    q: "비용이 얼마나 드나요?",
    a: "간단한 작업 ~15K 토큰, 전체 파이프라인 ~48K-123K 토큰. 복잡도에 따라 팀 규모가 자동 조절되어 비용을 최적화합니다.",
  },
  {
    q: "영어로도 되나요?",
    a: "네. 한국어/영어 자동 감지됩니다. 두 언어를 섞어서 써도 됩니다.",
  },
  {
    q: "테스트 없이 배포할 수 있나요?",
    a: "아닙니다. Evidence Chain이 PASS여야 /aing ship이 실행됩니다. '증거 없으면 완료 아님'이 원칙입니다.",
  },
];

export default function UserGuide() {
  const { ref, isInView } = useInView();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedSituation, setExpandedSituation] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-6" id="guide">
      <div ref={ref} className="max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold text-aing-dark text-center mb-3"
          style={isInView ? { animation: "fadeInUp 0.6s ease-out both" } : { opacity: 0 }}
        >
          사용 가이드
        </h2>
        <p
          className="text-aing-dark/60 text-center mb-4 text-lg"
          style={isInView ? { animation: "fadeInUp 0.6s ease-out 0.1s both" } : { opacity: 0 }}
        >
          명령어를 외울 필요 없습니다. <strong>자연어로 말하면 됩니다.</strong>
        </p>
        <p
          className="text-center mb-12"
          style={isInView ? { animation: "fadeInUp 0.6s ease-out 0.15s both" } : { opacity: 0 }}
        >
          <code className="bg-aing-primary/10 text-aing-primary px-4 py-2 rounded-lg font-mono text-sm font-semibold">
            /aing do &quot;하고 싶은 것&quot;
          </code>
          <span className="text-aing-dark/40 ml-3 text-sm">이것만 기억하세요</span>
        </p>

        {/* Situation Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          style={isInView ? { animation: "fadeInUp 0.6s ease-out 0.2s both" } : { opacity: 0 }}
        >
          {situations.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setExpandedSituation(expandedSituation === i ? null : i)}
              className={`text-left bg-aing-light rounded-xl p-5 transition-all cursor-pointer hover:shadow-md ${
                expandedSituation === i ? "ring-2 ring-aing-primary shadow-md" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Image src={s.icon} alt={s.agent} width={28} height={28} className="rounded" />
                <span className="font-bold text-aing-dark">{s.title}</span>
                <span className="text-[10px] text-aing-dark/30 ml-auto">{s.agent}</span>
              </div>

              <div className="space-y-1.5 mb-3">
                {s.examples.map((ex, j) => (
                  <p key={j} className="text-sm text-aing-dark/60 pl-1">
                    &ldquo;{ex}&rdquo;
                  </p>
                ))}
              </div>

              {expandedSituation === i && (
                <div className="mt-3 pt-3 border-t border-aing-dark/10 space-y-2">
                  <code className="block text-xs text-aing-primary bg-aing-primary/10 px-3 py-2 rounded font-mono">
                    {s.command}
                  </code>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-aing-primary text-white px-2 py-0.5 rounded font-semibold">
                      → {s.route}
                    </span>
                    <span className="text-xs text-aing-dark/50">{s.detail}</span>
                  </div>
                </div>
              )}

              {expandedSituation !== i && (
                <p className="text-xs text-aing-dark/30 mt-1">클릭하면 명령어 보기</p>
              )}
            </button>
          ))}
        </div>

        {/* Development Flow */}
        <div
          className="bg-aing-light rounded-2xl p-8 mb-16"
          style={isInView ? { animation: "fadeInUp 0.6s ease-out 0.3s both" } : { opacity: 0 }}
        >
          <h3 className="text-xl font-bold text-aing-dark text-center mb-6">
            개발 플로우
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { step: "1", label: "Plan", desc: "계획 수립", cmd: "/aing plan", color: "bg-blue-500" },
              { step: "2", label: "Build", desc: "PDCA 구현", cmd: "/aing auto", color: "bg-emerald-500" },
              { step: "3", label: "Review", desc: "4-tier 리뷰", cmd: "/aing review-pipeline", color: "bg-amber-500" },
              { step: "4", label: "Ship", desc: "자동 배포", cmd: "/aing ship", color: "bg-rose-500" },
              { step: "5", label: "Retro", desc: "회고", cmd: "/aing retro", color: "bg-violet-500" },
            ].map((f, i) => (
              <div key={f.step} className="flex items-center gap-3">
                <div className="flex flex-col items-center text-center min-w-[80px]">
                  <span className={`${f.color} text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mb-1.5`}>
                    {f.step}
                  </span>
                  <span className="text-sm font-bold text-aing-dark">{f.label}</span>
                  <span className="text-xs text-aing-dark/50">{f.desc}</span>
                  <code className="text-[10px] text-aing-dark/30 font-mono mt-0.5">{f.cmd}</code>
                </div>
                {i < 4 && (
                  <span className="text-aing-dark/20 text-lg hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div
          style={isInView ? { animation: "fadeInUp 0.6s ease-out 0.4s both" } : { opacity: 0 }}
        >
          <h3 className="text-xl font-bold text-aing-dark text-center mb-6">
            자주 하는 질문
          </h3>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left bg-aing-light rounded-xl p-4 transition-all cursor-pointer hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-aing-dark text-sm">
                    Q. {faq.q}
                  </span>
                  <span className="text-aing-dark/30 text-lg ml-2">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                {openFaq === i && (
                  <p className="mt-2 text-sm text-aing-dark/60 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
