# Woni Kim - Frontend Developer Portfolio

> 모던하고 반응형 포트폴리오 웹사이트

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)

## ✨ 특징

- 🎨 **모던한 디자인**: 다크 모드 지원 및 그라데이션 배경
- ⚡ **고성능**: Next.js 16 App Router + SSG (Static Site Generation)
- 🎭 **부드러운 애니메이션**: GSAP을 활용한 스크롤 기반 애니메이션
- 📱 **완전 반응형**: 모바일, 태블릿, 데스크탑 최적화
- ♿ **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- 🎯 **SEO 최적화**: Metadata API, JSON-LD 구조화 데이터, Open Graph

## 🛠️ 기술 스택

### Core

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.2.0

### Styling

- **CSS Framework**: Tailwind CSS v4
- **Icons**: Simple Icons CDN
- **Animations**: GSAP 3.x + ScrollTrigger

### Architecture

- **Pattern**: Feature-Sliced Design (FSD)
- **Structure**: Flat (no src/)
- **Layers**: shared → entities → features → widgets → app

### Development

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode

## 📁 프로젝트 구조

```
who-am-codeliner/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── entities/            # 비즈니스 엔티티
│   ├── portfolio/       # 포트폴리오 데이터
│   ├── project/         # 프로젝트 정보
│   └── skill/           # 기술 스택
├── features/            # 기능 모듈
│   └── navigation/      # 네비게이션 기능
├── widgets/             # UI 위젯
│   ├── header/          # 헤더
│   ├── hero/            # 히어로 섹션
│   ├── about/           # 소개 섹션
│   ├── skills/          # 기술 스택 섹션
│   ├── projects/        # 프로젝트 섹션
│   └── contacts/        # 연락처 섹션
├── shared/              # 공유 리소스
│   ├── ui/              # 재사용 가능 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   └── config/          # 설정 파일
└── public/              # 정적 파일
    └── images/          # 이미지 리소스
```

## 🚀 시작하기

### 요구사항

- Node.js 18.x 이상
- pnpm 8.x 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/code1iners/who-am-codeliner.git

# 프로젝트 디렉토리로 이동
cd who-am-codeliner

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
# 프로덕션 빌드 생성
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 타입 체크 및 린트

```bash
# TypeScript 타입 체크
pnpm tsc --noEmit

# ESLint 검사
pnpm lint
```

## 🎨 주요 섹션

### 1. Hero Section

- 이름, 직무, 소개글
- 애니메이션된 프로필 이미지
- 그라데이션 배경 효과

### 2. About Me

- 자기소개
- 스크롤 기반 페이드인 애니메이션

### 3. Skills

- 기술 스택 그리드 (11개 기술)
- 아이콘 + 이름 카드 레이아웃
- Stagger 애니메이션

### 4. Projects

- 프로젝트 카드 (3개)
- 이미지, 설명, 기술 스택, 링크
- 호버 효과 및 애니메이션

### 5. Contact

- GitHub 프로필 링크
- 그라데이션 배경

## 📝 커스터마이징

### 사이트 설정 변경

`shared/config/site.ts` 파일을 수정하세요:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your Description',
  url: 'https://your-domain.com',
  githubUrl: 'https://github.com/your-username',
  keywords: ['keyword1', 'keyword2'],
};
```

### 포트폴리오 데이터 수정

- **개인 정보**: `entities/portfolio/model/portfolio.data.ts`
- **기술 스택**: `entities/skill/model/skills.data.ts`
- **프로젝트**: `entities/project/model/projects.data.ts`

### 이미지 추가

이미지를 `public/images/` 폴더에 추가하고 경로를 업데이트하세요.

## 🎯 성능 최적화

- ✅ Static Site Generation (SSG)
- ✅ Image Optimization (next/image)
- ✅ Code Splitting
- ✅ CSS Lightning (Tailwind v4)
- ✅ Font Optimization (Geist)

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.

## 👤 개발자

**Woni Kim (Codeliner)**

- Website: [https://codeliners.cc](https://codeliners.cc)
- GitHub: [@code1iners](https://github.com/code1iners)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [GSAP](https://greensock.com/gsap/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Simple Icons](https://simpleicons.org/)

---

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!
