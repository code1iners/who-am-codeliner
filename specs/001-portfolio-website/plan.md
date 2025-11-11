````markdown
# 구현 계획: 개발자 포트폴리오 웹사이트

**브랜치**: `001-portfolio-website` | **날짜**: 2025-11-11 | **명세서**: [spec.md](./spec.md)
**입력**: `/specs/001-portfolio-website/spec.md`의 기능 명세서

**참고**: 이 템플릿은 `/speckit.plan` 명령어로 작성됩니다. 실행 워크플로는 `.specify/templates/commands/plan.md`를 참조하세요.

## 요약

개발자 포트폴리오를 위한 싱글 페이지 웹사이트를 구축합니다. 채용 담당자와 면접관이 개발자의 기술 스택, 프로젝트 경험, 연락처를 효과적으로 확인할 수 있는 반응형 디자인을 제공합니다. Next.js 16 App Router를 사용하며, FSD 아키텍처로 구성하고, TypeScript로 정적 데이터를 관리합니다. **SSG(Static Site Generation)로 빌드하여 최적의 성능과 SEO를 제공**하며, **Tailwind CSS v4**를 사용하여 현대적인 스타일링을 구현합니다. 주요 섹션은 헤더, 히어로, About Me, Skills, Projects(캐러셀), Contacts이며, 모든 기기에서 최적화된 경험을 제공합니다.

## 기술적 맥락

**언어/버전**: TypeScript 5.x, React 19.2.0, Next.js 16.0.1  
**주요 의존성**: Next.js (App Router, Image, Metadata API), Tailwind CSS 4.x (v4), react-hook-form (선택적)  
**스토리지**: 정적 TypeScript/JSON 파일 (빌드 타임 데이터), 외부 CDN (기술 아이콘)  
**테스트**: Vitest + React Testing Library (컴포넌트 테스트), Playwright (E2E - 선택적)  
**대상 플랫폼**: 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge), 모바일 뷰포트 지원  
**프로젝트 타입**: Static Site Generation (SSG) - 싱글 페이지, 빌드 타임 사전 렌더링  
**렌더링 전략**: SSG (Static Site Generation) - app/page.tsx에 `export const dynamic = 'force-static'` 적용  
**SEO 전략**: "codeliner" 및 "codeliners" 키워드 최적화, 구조화된 데이터 (JSON-LD), Open Graph, 시맨틱 HTML  
**성능 목표**: 초기 로딩 < 3초 (FR-032), Lighthouse 접근성 > 90점 (SC-006), 60fps 애니메이션 (SC-009), **Lighthouse SEO > 95점**  
**제약사항**: 싱글 페이지(/) 라우트만, 외부 API 없음, 정적 데이터만, 빠른 로딩 필수  
**규모/범위**: 6개 섹션, 3-5개 프로젝트, 10-20개 기술 스택, 반응형 3개 브레이크포인트

## 헌법 검사

_게이트: Phase 0 연구 전에 통과해야 함. Phase 1 설계 후 재검사._

- [x] **FSD 아키텍처**: 기능이 적절한 레이어로 구성되었는가 (app/pages/widgets/features/entities/shared)?

  - ✅ 포트폴리오는 entities/portfolio, features/navigation, features/projects-carousel, widgets/hero, widgets/skills-grid로 구성
  - ✅ App 레이어는 global styles, providers, root layout만 포함
  - ✅ Page 레이어(app/page.tsx)는 widgets 구성만 담당

- [x] **기능 격리**: 기능을 독립적으로 개발 및 테스트할 수 있는가?

  - ✅ 각 위젯(Hero, Skills, Projects, Contacts)은 독립적으로 개발 가능
  - ✅ 캐러셀 기능은 features/projects-carousel로 격리
  - ✅ 네비게이션 기능은 features/navigation으로 격리

- [x] **Import 규칙**: 하위→상위 레이어 import 없음, 순환 의존성 없음? (상위가 하위를 import: app→pages→widgets→features→entities→shared)

  - ✅ pages → widgets → features → entities → shared 흐름 준수
  - ✅ entities/portfolio는 다른 엔티티를 import하지 않음
  - ✅ features는 entities와 shared만 import
  - ✅ widgets는 features, entities, shared만 import

- [x] **Public API**: 각 슬라이스가 index 파일을 통해 계약을 노출하는가?

  - ✅ 모든 FSD 슬라이스에 index.ts 필수
  - ✅ UI 컴포넌트, 타입, 훅만 export

- [x] **타입 안정성**: 모든 코드가 strict 모드의 TypeScript를 사용하며, 정당화되지 않은 `any` 타입이 없는가?

  - ✅ tsconfig.json의 strict: true 활성화됨
  - ✅ 모든 엔티티에 Zod 스키마 또는 TypeScript 인터페이스 정의
  - ✅ Props 인터페이스 필수

- [x] **컴포넌트 계약**: 모든 컴포넌트에 타입이 지정된 props 인터페이스가 있는가?

  - ✅ 모든 UI 컴포넌트는 명시적 Props 타입 필요
  - ✅ Server/Client 컴포넌트 구분 명시 ('use client' 지시어)

- [x] **테스트 요구사항**: 테스트가 필요한 경우, 인수 기준이 먼저 정의되었는가?
  - ✅ spec.md에 각 사용자 스토리의 인수 시나리오 정의됨
  - ✅ 컴포넌트 테스트는 선택적 (초기 MVP에서는 수동 테스트)

## 프로젝트 구조

### 문서 (이 기능)

```text
specs/[###-feature]/
├── plan.md              # 이 파일 (/speckit.plan 명령 출력)
├── research.md          # Phase 0 출력 (/speckit.plan 명령)
├── data-model.md        # Phase 1 출력 (/speckit.plan 명령)
├── quickstart.md        # Phase 1 출력 (/speckit.plan 명령)
├── contracts/           # Phase 1 출력 (/speckit.plan 명령)
└── tasks.md             # Phase 2 출력 (/speckit.tasks 명령 - /speckit.plan으로 생성되지 않음)
```
````

### 소스 코드 (저장소 루트)

```text
# Next.js + FSD 구조 (플랫 구조 - src/ 없이)

app/                                    # Next.js App Router + App 레이어
├── layout.tsx                          # 루트 레이아웃 (헤더 포함)
├── page.tsx                            # 홈 페이지 (위젯 구성)
├── globals.css                         # 전역 스타일 (Tailwind base)
└── favicon.ico                         # 파비콘

entities/                               # Entity 레이어 (비즈니스 객체)
├── portfolio/
│   ├── model/
│   │   ├── types.ts                   # PortfolioData 타입
│   │   ├── portfolio.data.ts          # 정적 포트폴리오 데이터
│   │   └── portfolio.schema.ts        # Zod 검증 스키마 (선택적)
│   └── index.ts                       # Public API
│
├── skill/
│   ├── model/
│   │   ├── types.ts                   # Skill 타입
│   │   └── skills.data.ts             # 정적 기술 스택 데이터
│   ├── ui/
│   │   └── SkillCard.tsx             # 기술 카드 컴포넌트
│   └── index.ts                       # Public API
│
└── project/
    ├── model/
    │   ├── types.ts                   # Project 타입
    │   └── projects.data.ts           # 정적 프로젝트 데이터
    ├── ui/
    │   └── ProjectCard.tsx           # 프로젝트 카드 컴포넌트
    └── index.ts                       # Public API

features/                               # Feature 레이어 (사용자 기능)
├── navigation/
│   ├── ui/
│   │   ├── Navigation.tsx            # 데스크톱 네비게이션
│   │   └── MobileMenu.tsx            # 모바일 햄버거 메뉴
│   ├── lib/
│   │   └── scroll-to-section.ts      # 섹션 스크롤 유틸리티
│   └── index.ts                       # Public API
│
└── projects-carousel/
    ├── ui/
    │   ├── ProjectCarousel.tsx       # 캐러셀 컨테이너
    │   └── CarouselControls.tsx      # 좌우 버튼, 인디케이터
    ├── lib/
    │   └── use-carousel.ts           # Embla Carousel 훅
    └── index.ts                       # Public API

widgets/                                # Widget 레이어 (복합 UI 블록)
├── header/
│   ├── ui/
│   │   └── Header.tsx                # 헤더 (로고 + 네비게이션)
│   └── index.ts
│
├── hero/
│   ├── ui/
│   │   └── HeroSection.tsx           # 히어로 섹션
│   └── index.ts
│
├── about/
│   ├── ui/
│   │   └── AboutSection.tsx          # About Me 섹션
│   └── index.ts
│
├── skills/
│   ├── ui/
│   │   └── SkillsSection.tsx         # Skills 그리드 섹션
│   └── index.ts
│
├── projects/
│   ├── ui/
│   │   └── ProjectsSection.tsx       # Projects 섹션 (캐러셀 포함)
│   └── index.ts
│
└── contacts/
    ├── ui/
    │   └── ContactsSection.tsx       # Contacts 섹션
    └── index.ts

shared/                                 # Shared 레이어 (재사용 코드)
├── ui/
│   ├── Button.tsx                    # 공용 버튼
│   ├── OptimizedImage.tsx            # Next.js Image 래퍼
│   └── Section.tsx                   # 섹션 레이아웃 래퍼
│
├── lib/
│   └── cn.ts                         # Tailwind 클래스 병합 유틸
│
├── config/
│   ├── site.ts                       # 사이트 메타데이터
│   └── theme.ts                      # Tailwind 테마 토큰 (선택적)
│
└── types/
    └── common.ts                     # 공통 타입 (있을 경우)

public/                                 # 정적 파일
├── images/
│   ├── profile.png                   # 프로필 사진
│   ├── logo.svg                      # 로고
│   ├── placeholder.png               # 이미지 로딩 실패 시 대체
│   └── projects/                     # 프로젝트 이미지들
│       └── *.png
└── fonts/                             # 웹 폰트 (선택적)

specs/                                  # 기능 명세 및 계획
└── 001-portfolio-website/
    ├── spec.md
    ├── plan.md                       # 이 파일
    ├── research.md
    ├── data-model.md
    ├── quickstart.md                 # (다음에 생성)
    └── tasks.md                       # (Phase 2에서 생성)
```

**구조 결정**:

- **플랫 구조 선택**: src/ 디렉토리 없이 루트에서 FSD 레이어 시작
- **레이어 사용**: entities (portfolio, skill, project) + features (navigation, carousel) + widgets (6개 섹션) + shared (공통 컴포넌트)
- **App Router**: app/ 디렉토리에서 Next.js 라우팅 처리 (싱글 페이지이므로 page.tsx만 존재)
- **Public API**: 모든 FSD 슬라이스는 index.ts를 통해 export
- **정적 에셋**: public/images/에 프로필 및 프로젝트 이미지 배치

## 복잡도 추적

> **모든 헌법 검사 항목이 통과했습니다. 위반사항 없음.**

이 기능은 FSD 아키텍처 원칙을 완전히 준수하며, 추가 정당화가 필요한 복잡도나 위반사항이 없습니다.

---

## 구현 계획 완료 상태

### Phase 0: 연구 및 개요 ✅

- [x] 기술적 맥락 정의 (언어, 의존성, 성능 목표)
- [x] 헌법 검사 수행 (모든 항목 통과)
- [x] `research.md` 생성 (11가지 기술 결정 문서화)
- [x] 기술 스택 최종 확정

**주요 결정사항**:

- 정적 TypeScript 상수로 데이터 관리
- Simple Icons CDN 사용
- Embla Carousel (경량 라이브러리)
- CSS scroll-behavior (네이티브)
- **Tailwind CSS v4** (Lightning CSS 엔진, 향상된 성능)
- Tailwind dark mode (prefers-color-scheme)
- Next.js Image 최적화
- Headless UI (접근성)
- **SSG (Static Site Generation)** with `force-static`
- **SEO 최적화** (Metadata API, JSON-LD, Open Graph)

### Phase 1: 설계 및 계약 ✅

- [x] `data-model.md` 생성 (3개 엔티티 정의)
- [x] `contracts/data-contracts.md` 생성 (타입 계약)
- [x] `quickstart.md` 생성 (개발 환경 설정 가이드)
- [x] 프로젝트 구조 문서화 (FSD 레이어별 파일 트리)
- [x] Agent context 업데이트 (`.github/copilot-instructions.md`)
- [x] 헌법 검사 재확인 (모든 항목 여전히 통과)
- [x] **SSG 및 Tailwind v4 설정 추가**
- [x] **SEO 최적화 전략 수립** (codeliner/codeliners 키워드 타게팅)

**생성된 아티팩트**:

- `specs/001-portfolio-website/research.md` (Tailwind v4 & SSG & SEO 결정 포함)
- `specs/001-portfolio-website/data-model.md`
- `specs/001-portfolio-website/contracts/data-contracts.md`
- `specs/001-portfolio-website/quickstart.md` (v4 설정 및 SEO 가이드 포함)
- `.github/copilot-instructions.md` (업데이트)

### Phase 2: 태스크 생성 ⏳

이 단계는 `/speckit.tasks` 명령어로 별도 실행됩니다.

---

## 다음 단계

1. ✅ **구현 계획 완료** - 모든 설계 문서 생성됨
2. 📋 **태스크 생성** - `/speckit.tasks` 명령어 실행하여 `tasks.md` 생성
3. 🛠️ **구현 시작** - `tasks.md`의 태스크 순서대로 개발 진행
4. 🧪 **테스트** - 각 사용자 스토리의 인수 시나리오 검증
5. 🚀 **배포** - Vercel/Netlify로 정적 사이트 배포

---

**계획 작성 완료**: 2025-11-11  
**문서 위치**: `/home/codeliner/dev/who-am-codeliner/specs/001-portfolio-website/`  
**브랜치**: `001-portfolio-website`
