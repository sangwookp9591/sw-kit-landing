# aing Landing Page

> **aing** — Harness Engineering Agent for Claude Code

aing의 공식 랜딩 페이지입니다. 10명의 AI 에이전트 팀이 협업하는 엔지니어링 워크플로우를 소개합니다.

**Live**: [배포 URL] | **aing 본체**: [github.com/sangwookp9591/ai-ng-kit](https://github.com/sangwookp9591/ai-ng-kit)

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Geist** (Vercel Typography)
- **TypeScript 5**

## Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## Project Structure

```
app/
  layout.tsx          # Root layout (Geist fonts, metadata)
  page.tsx            # 홈페이지 구성
  globals.css         # Tailwind 테마, 커스텀 애니메이션

components/
  Hero.tsx            # 히어로 섹션 + 터미널 애니메이션
  Terminal.tsx        # 타이핑 애니메이션 컴포넌트
  AgentTeam.tsx       # 픽셀아트 에이전트 오피스
  WorkflowPipeline.tsx # 5단계 PDCA 파이프라인
  Commands.tsx        # CLI 커맨드 & 모드 레퍼런스
  WhyAing.tsx        # 가치 제안
  InnovationsPdca.tsx # PDCA 사이클 설명
  InstallCta.tsx      # 설치 CTA
  GitHubStars.tsx     # GitHub 스타 배지
  Footer.tsx          # 푸터

hooks/
  useInView.ts        # IntersectionObserver 스크롤 애니메이션

lib/
  config.ts           # 사이트 설정 (버전, GitHub URL)

public/
  agents/             # 10명의 에이전트 픽셀아트 SVG
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |

## Deploy

Vercel에 자동 배포됩니다. `main` 브랜치에 push하면 프로덕션 배포가 트리거됩니다.

## License

Apache-2.0
