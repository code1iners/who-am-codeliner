# 태스크: 개발자 포트폴리오 웹사이트

**입력**: `/specs/001-portfolio-website/`의 설계 문서  
**선행조건**: plan.md (✅), spec.md (✅), research.md (✅), data-model.md (✅), contracts/ (✅)  
**기능 브랜치**: `001-portfolio-website`  
**생성일**: 2025-11-11

**테스트**: 이 프로젝트는 spec.md에 명시된 대로 수동 테스트(manual testing)만 사용합니다. 각 사용자 스토리의 인수 시나리오를 기반으로 검증합니다.

**구성**: 태스크는 각 스토리의 독립적인 구현 및 테스트를 가능하게 하기 위해 사용자 스토리별로 그룹화됩니다.

## 형식: `[ID] [P?] [Story] 설명`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 이 태스크가 속한 사용자 스토리 (예: US1, US2, US3)
- 설명에 정확한 파일 경로 포함

## 경로 규칙

- **플랫 FSD 구조**: 루트에 `app/`, `entities/`, `features/`, `widgets/`, `shared/` (src/ 없이)
- **Next.js App Router**: `app/` 디렉토리에서 라우팅 처리
- **Public API**: 모든 FSD 슬라이스는 `index.ts`를 통해 export
- **Import 규칙**: shared ← entities ← features ← widgets ← pages ← app (역방향 금지)

---

## Phase 1: 설정 (공유 인프라)

**목적**: 프로젝트 초기화 및 FSD 구조 생성

- [x] T001 FSD 디렉토리 구조 생성 (`entities/`, `features/`, `widgets/`, `shared/`, `app/`)
- [x] T002 Next.js 프로젝트 초기화 및 필수 패키지 설치 (Next.js 16, React 19, TypeScript 5)
- [x] T003 [P] Tailwind CSS v4 설치 및 설정 (`@import 'tailwindcss'` in `app/globals.css`)
- [x] T004 [P] Embla Carousel 설치 (`pnpm add embla-carousel-react`)
- [x] T005 [P] Headless UI 설치 (`pnpm add @headlessui/react`)
- [x] T006 [P] TypeScript strict 모드 및 경로 별칭 설정 (tsconfig.json: `@/entities`, `@/features`, `@/widgets`, `@/shared`, `@/app`)
- [x] T007 [P] ESLint 설정 (Next.js + FSD import 규칙)
- [x] T008 [P] `public/images/` 디렉토리 생성 및 placeholder 이미지 추가 (`placeholder.png`)

**체크포인트**: 프로젝트 구조 및 기본 설정 완료

---

## Phase 2: 기반 (차단 선행조건)

**목적**: 모든 사용자 스토리 구현 전에 완료되어야 하는 핵심 인프라

**⚠️ 중요**: 이 단계가 완료될 때까까지 사용자 스토리 작업을 시작할 수 없습니다

### 2.1 공유 레이어 (Shared)

- [x] T009 [P] `shared/ui/Button.tsx` 생성 (공용 버튼 컴포넌트, props 인터페이스 정의)
- [x] T010 [P] `shared/ui/OptimizedImage.tsx` 생성 (Next.js Image 래퍼, onError 핸들러로 placeholder 처리)
- [x] T011 [P] `shared/ui/Section.tsx` 생성 (섹션 레이아웃 래퍼, id prop for scroll-to)
- [x] T012 [P] `shared/lib/cn.ts` 생성 (Tailwind 클래스 병합 유틸리티 - clsx 또는 tailwind-merge)
- [x] T013 [P] `shared/config/site.ts` 생성 (사이트 메타데이터: 이름, URL, GitHub 링크 등)
- [x] T014 [P] `shared/types/common.ts` 생성 (공통 타입 정의 - 있을 경우)
- [x] T015 `shared/index.ts` 생성 (Shared 레이어 Public API export)

### 2.2 엔티티 레이어 (Entities) - 데이터 모델

- [x] T016 [P] `entities/portfolio/model/types.ts` 생성 (PortfolioData 인터페이스 정의)
- [x] T017 [P] `entities/portfolio/model/portfolio.data.ts` 생성 (PORTFOLIO_DATA 상수: name, title, bio, aboutMe, profileImageUrl, githubUrl)
- [x] T018 [P] `entities/portfolio/model/portfolio.schema.ts` 생성 (Zod 스키마 - 선택적)
- [x] T019 `entities/portfolio/index.ts` 생성 (Portfolio 엔티티 Public API)
- [x] T020 [P] `entities/skill/model/types.ts` 생성 (Skill, SkillLevel 타입 정의)
- [x] T021 [P] `entities/skill/model/skills.data.ts` 생성 (SKILLS 배열: id, name, iconUrl, level)
- [x] T022 [P] `entities/skill/ui/SkillCard.tsx` 생성 (기술 카드 컴포넌트: 아이콘 + 이름 표시)
- [x] T023 `entities/skill/index.ts` 생성 (Skill 엔티티 Public API: SKILLS, SkillCard export)
- [x] T024 [P] `entities/project/model/types.ts` 생성 (Project 인터페이스 정의)
- [x] T025 [P] `entities/project/model/projects.data.ts` 생성 (PROJECTS 배열: id, name, description, imageUrl, githubUrl, demoUrl, startDate, endDate, techStack)
- [x] T026 [P] `entities/project/ui/ProjectCard.tsx` 생성 (프로젝트 카드: 이미지, 이름, 설명, 기술 스택, 링크)
- [x] T027 `entities/project/index.ts` 생성 (Project 엔티티 Public API: PROJECTS, ProjectCard export)

### 2.3 앱 레이어 (App) - 글로벌 설정

- [x] T028 `app/globals.css` 수정 (Tailwind v4 import: `@import 'tailwindcss'`, scroll-behavior: smooth, dark mode 변수)
- [x] T029 `app/layout.tsx` 생성 (Root Layout: HTML 구조, Metadata API 설정, Header 위젯 포함)
- [x] T030 `app/layout.tsx`에 SEO Metadata 설정 (title: "Codeliner | Front-End Developer Portfolio", description, keywords: ["codeliner", "codeliners", "코드라이너"], Open Graph, Twitter Card)
- [x] T031 `app/page.tsx` 생성 (Home Page: `export const dynamic = 'force-static'`, 기본 구조)
- [x] T032 `app/page.tsx`에 JSON-LD 구조화된 데이터 추가 (Person 스키마: name "Codeliner", alternateName "Codeliners", jobTitle, url, sameAs [GitHub])

**체크포인트**: 기반 준비 완료 - 이제 기능 구현을 병렬로 시작할 수 있음

---

## Phase 3: 사용자 스토리 1 - 포트폴리오 핵심 정보 확인 (우선순위: P1) 🎯 MVP

**목표**: 채용 담당자가 개발자의 기본 정보, 기술 스택, 연락처를 즉시 파악할 수 있도록 헤더, 히어로, About Me, Skills, Contacts 섹션 구현

**독립 테스트**: 웹사이트 접속 → 모든 섹션(헤더, 히어로, About, Skills, Contacts) 표시 확인 → GitHub 링크 클릭 시 새 탭에서 열림 확인 → 네비게이션 링크 클릭 시 해당 섹션으로 스크롤 확인

**인수 시나리오**: spec.md의 사용자 스토리 1 시나리오 1-7

### 3.1 Features - 네비게이션 기능

- [ ] T033 [US1] `features/navigation/lib/scroll-to-section.ts` 생성 (섹션 스크롤 유틸리티 함수)
- [ ] T034 [US1] `features/navigation/ui/Navigation.tsx` 생성 (데스크톱 네비게이션: About, Skills, Projects, Contact, Github Link)
- [ ] T035 [US1] `features/navigation/ui/MobileMenu.tsx` 생성 (모바일 햄버거 메뉴: Headless UI Dialog 사용, 네비게이션 링크)
- [ ] T036 [US1] `features/navigation/index.ts` 생성 (Navigation, MobileMenu export)

### 3.2 Widgets - 헤더

- [ ] T037 [US1] `widgets/header/ui/Header.tsx` 생성 (로고 + Navigation/MobileMenu 조합, sticky 헤더)
- [ ] T038 [US1] `widgets/header/index.ts` 생성 (Header export)

### 3.3 Widgets - 히어로 섹션

- [ ] T039 [US1] `widgets/hero/ui/HeroSection.tsx` 생성 (좌측: 이름, 타이틀, 소개 문구 / 우측: 프로필 사진, PORTFOLIO_DATA 사용)
- [ ] T040 [US1] `widgets/hero/index.ts` 생성 (HeroSection export)

### 3.4 Widgets - About Me 섹션

- [ ] T041 [US1] `widgets/about/ui/AboutSection.tsx` 생성 (PORTFOLIO_DATA.aboutMe 텍스트 표시)
- [ ] T042 [US1] `widgets/about/index.ts` 생성 (AboutSection export)

### 3.5 Widgets - Skills 섹션

- [ ] T043 [US1] `widgets/skills/ui/SkillsSection.tsx` 생성 (SKILLS 데이터 + SkillCard 그리드 표시, 반응형: 모바일 1-2열, 태블릿 3-4열, 데스크톱 4-6열)
- [ ] T044 [US1] `widgets/skills/index.ts` 생성 (SkillsSection export)

### 3.6 Widgets - Contacts 섹션

- [ ] T045 [US1] `widgets/contacts/ui/ContactsSection.tsx` 생성 (연락 문구 + GitHub 버튼 링크, 새 탭에서 열림)
- [ ] T046 [US1] `widgets/contacts/index.ts` 생성 (ContactsSection export)

### 3.7 페이지 통합

- [ ] T047 [US1] `app/layout.tsx`에 Header 위젯 추가
- [ ] T048 [US1] `app/page.tsx`에 HeroSection, AboutSection, SkillsSection, ContactsSection 위젯 구성
- [ ] T049 [US1] `app/page.tsx`에 각 섹션의 id 속성 추가 (about, skills, projects, contact - 네비게이션 스크롤용)

### 3.8 검증 및 테스트

- [ ] T050 [US1] TypeScript 컴파일 에러 없음 확인 (`pnpm tsc --noEmit`)
- [ ] T051 [US1] ESLint 실행 및 위반사항 수정 (`pnpm lint`)
- [ ] T052 [US1] Import 규칙 검증 (하위→상위 import 없음, widgets → features → entities → shared)
- [ ] T053 [US1] 개발 서버 실행 및 수동 테스트 - 인수 시나리오 1-7 검증:
  - [ ] 시나리오 1: 헤더에 로고, "Codeliner", 네비게이션 링크(About, Skills, Projects, Contact, Github Link) 표시
  - [ ] 시나리오 2: 히어로 섹션에 "Codeliner", "Front-End Developer", 소개 문구, 프로필 사진 표시
  - [ ] 시나리오 3: About Me 섹션에 2-3줄 텍스트 표시
  - [ ] 시나리오 4: Skills 섹션에 기술 스택 그리드 표시 (이미지 + 텍스트)
  - [ ] 시나리오 5: Contacts 섹션에 연락 문구 + GitHub 버튼 표시
  - [ ] 시나리오 6: 네비게이션 링크 클릭 시 해당 섹션으로 부드러운 스크롤
  - [ ] 시나리오 7: GitHub 링크 클릭 시 새 탭에서 GitHub 프로필 열림

**체크포인트**: 이 시점에서 사용자 스토리 1은 완전히 작동하고 독립적으로 테스트 가능해야 함 (MVP 완료!)

---

## Phase 4: 사용자 스토리 2 - 프로젝트 포트폴리오 탐색 (우선순위: P2)

**목표**: 개발자가 진행한 사이드 프로젝트들을 캐러셀 UI를 통해 탐색하고 각 프로젝트의 세부 정보 확인

**독립 테스트**: Projects 섹션에서 캐러셀 좌우 네비게이션 버튼 클릭 → 다른 프로젝트들 탐색 → 각 프로젝트 카드에 이름, 설명, 기술, 링크 표시 확인 → 무한 루프 동작 확인

**인수 시나리오**: spec.md의 사용자 스토리 2 시나리오 1-7

### 4.1 Features - 프로젝트 캐러셀

- [ ] T054 [US2] `features/projects-carousel/lib/use-carousel.ts` 생성 (Embla Carousel 훅: useEmblaCarousel, 좌우 네비게이션, 현재 인덱스 상태, 무한 루프 설정)
- [ ] T055 [US2] `features/projects-carousel/ui/ProjectCarousel.tsx` 생성 (캐러셀 컨테이너: Embla 뷰포트, ProjectCard 렌더링)
- [ ] T056 [US2] `features/projects-carousel/ui/CarouselControls.tsx` 생성 (좌우 버튼 + 인디케이터 점, 현재 슬라이드 표시)
- [ ] T057 [US2] `features/projects-carousel/index.ts` 생성 (ProjectCarousel, CarouselControls export)

### 4.2 Widgets - Projects 섹션

- [ ] T058 [US2] `widgets/projects/ui/ProjectsSection.tsx` 생성 (Projects 제목 + ProjectCarousel, PROJECTS 데이터 사용)
- [ ] T059 [US2] `widgets/projects/index.ts` 생성 (ProjectsSection export)

### 4.3 페이지 통합

- [ ] T060 [US2] `app/page.tsx`에 ProjectsSection 위젯 추가 (SkillsSection과 ContactsSection 사이)
- [ ] T061 [US2] `app/page.tsx`에 projects 섹션 id 속성 추가 (네비게이션 스크롤용)

### 4.4 검증 및 테스트

- [ ] T062 [US2] TypeScript 컴파일 에러 없음 확인
- [ ] T063 [US2] ESLint 실행 및 위반사항 수정
- [ ] T064 [US2] Import 규칙 검증 (widgets/projects → features/projects-carousel → entities/project)
- [ ] T065 [US2] 개발 서버 실행 및 수동 테스트 - 인수 시나리오 1-7 검증:
  - [ ] 시나리오 1: Projects 섹션에 캐러셀 UI, 첫 번째 프로젝트, 좌우 버튼/인디케이터 표시
  - [ ] 시나리오 2: 다음 버튼 클릭 시 다음 프로젝트로 슬라이드
  - [ ] 시나리오 3: 이전 버튼 클릭 시 이전 프로젝트로 슬라이드
  - [ ] 시나리오 4: 프로젝트 카드에 이름, 설명, 기술 스택, 링크(GitHub, 데모) 표시
  - [ ] 시나리오 5: 프로젝트 링크 클릭 시 새 탭에서 저장소/라이브 사이트 열림
  - [ ] 시나리오 6: 마지막 프로젝트에서 다음 버튼 클릭 시 첫 번째 프로젝트로 순환
  - [ ] 시나리오 7: 첫 번째 프로젝트에서 이전 버튼 클릭 시 마지막 프로젝트로 순환

**체크포인트**: 이 시점에서 사용자 스토리 1과 2가 모두 독립적으로 작동해야 함

---

## Phase 5: 사용자 스토리 3 - 반응형 디자인 및 모바일 경험 (우선순위: P3)

**목표**: 다양한 기기(데스크톱, 태블릿, 모바일)에서 포트폴리오 웹사이트가 원활하게 작동하도록 반응형 디자인 구현

**독립 테스트**: 브라우저 개발자 도구로 다양한 화면 크기(모바일 < 768px, 태블릿 768-1024px, 데스크톱 > 1024px)에서 확인 → 모든 섹션 적절하게 조정 및 읽기 가능 확인 → 모바일에서 햄버거 메뉴 작동 확인

**인수 시나리오**: spec.md의 사용자 스토리 3 시나리오 1-6

### 5.1 반응형 스타일링 적용

- [ ] T066 [P] [US3] `widgets/header/ui/Header.tsx` 수정 (모바일: 햄버거 메뉴 표시, 데스크톱: 풀 네비게이션 표시, Tailwind 브레이크포인트 사용)
- [ ] T067 [P] [US3] `features/navigation/ui/MobileMenu.tsx` 수정 (Headless UI Dialog, 모바일에서만 표시, 햄버거 아이콘 클릭 시 드롭다운/사이드바)
- [ ] T068 [P] [US3] `widgets/hero/ui/HeroSection.tsx` 수정 (모바일: 텍스트/이미지 수직 배치, 데스크톱: 좌우 배치)
- [ ] T069 [P] [US3] `widgets/skills/ui/SkillsSection.tsx` 수정 (반응형 그리드: 모바일 1-2열, 태블릿 3-4열, 데스크톱 4-6열)
- [ ] T070 [P] [US3] `features/projects-carousel/ui/ProjectCarousel.tsx` 수정 (모바일에서 카드 크기 조정, 터치 제스처 지원 - Embla 기본 지원)
- [ ] T071 [P] [US3] `entities/project/ui/ProjectCard.tsx` 수정 (모바일에서 레이아웃 조정, 텍스트 크기 축소)

### 5.2 검증 및 테스트

- [ ] T072 [US3] TypeScript 컴파일 에러 없음 확인
- [ ] T073 [US3] ESLint 실행 및 위반사항 수정
- [ ] T074 [US3] 개발 서버 실행 및 수동 테스트 - 인수 시나리오 1-6 검증:
  - [ ] 시나리오 1: 모바일 화면에서 헤더 네비게이션이 햄버거 메뉴로 전환
  - [ ] 시나리오 2: 햄버거 메뉴 아이콘 탭 시 네비게이션 메뉴 드롭다운/사이드바 표시
  - [ ] 시나리오 3: 모바일에서 히어로 섹션 텍스트/이미지 수직 배치
  - [ ] 시나리오 4: 모바일에서 Skills 그리드 1-2열로 조정
  - [ ] 시나리오 5: 태블릿에서 모든 섹션 최적화, 콘텐츠 잘리거나 겹치지 않음
  - [ ] 시나리오 6: 데스크톱에서 풀 네비게이션 표시, 콘텐츠 넓은 화면 활용

**체크포인트**: 모든 사용자 스토리가 이제 독립적으로 작동하고 반응형 디자인 완료

---

## Phase 6: 마무리 및 횡단 관심사

**목적**: 여러 사용자 스토리에 영향을 미치는 개선사항 및 최종 검증

### 6.1 성능 최적화

- [ ] T075 [P] Next.js Image 컴포넌트 최적화 확인 (모든 이미지에 width, height, alt 속성, blurDataURL for placeholder)
- [ ] T076 [P] 이미지 로딩 실패 시 placeholder 처리 확인 (`shared/ui/OptimizedImage.tsx`의 onError 핸들러)
- [ ] T077 [P] 번들 크기 확인 (`pnpm build`, Next.js 빌드 분석 - main bundle < 100KB 목표)
- [ ] T078 [P] Lighthouse 성능 테스트 (Performance > 90, Accessibility > 90, SEO > 95 목표)

### 6.2 SEO 최적화 검증

- [ ] T079 [P] `app/layout.tsx` Metadata 재확인 (title, description, keywords ["codeliner", "codeliners", "코드라이너"], Open Graph, Twitter Card)
- [ ] T080 [P] `app/page.tsx` JSON-LD 구조화된 데이터 재확인 (Person 스키마: name, alternateName, jobTitle, url, sameAs)
- [ ] T081 [P] 시맨틱 HTML 확인 (`<main>`, `<section>`, `<header>`, `<article>` 태그 사용)
- [ ] T082 [P] 모든 이미지 alt 텍스트 확인 (프로필 사진: "Codeliner 프로필 사진", 프로젝트 이미지: "프로젝트 이름 스크린샷")
- [ ] T083 [P] `public/robots.txt` 생성 (User-agent: \*, Allow: /)
- [ ] T084 [P] `public/sitemap.xml` 생성 (홈페이지 URL, lastmod, priority 1.0)
- [ ] T085 [P] Open Graph 이미지 생성 (`public/images/og-image.png`, 1200x630px, "Codeliner Portfolio" 텍스트 포함)

### 6.3 접근성 검증

- [ ] T086 [P] 키보드 네비게이션 테스트 (Tab 키로 모든 링크/버튼 접근 가능, Enter/Space로 활성화)
- [ ] T087 [P] ARIA 레이블 확인 (네비게이션 섹션: `aria-label="Main navigation"`, 섹션: `aria-labelledby`)
- [ ] T088 [P] 색상 대비 확인 (WCAG AA 기준, 텍스트와 배경 대비율 4.5:1 이상)
- [ ] T089 [P] 포커스 표시 확인 (키보드 포커스 시 명확한 아웃라인)

### 6.4 다크모드 검증

- [ ] T090 [P] 시스템 다크모드 감지 확인 (`prefers-color-scheme: dark` 자동 적용)
- [ ] T091 [P] 다크모드에서 모든 섹션 가독성 확인 (텍스트, 배경, 아이콘 색상 조정)
- [ ] T092 [P] 다크모드에서 Simple Icons CDN 아이콘 색상 확인 (fill 파라미터로 색상 조정 가능)

### 6.5 SSG 빌드 및 배포

- [ ] T093 `app/page.tsx`에 `export const dynamic = 'force-static'` 추가 확인
- [ ] T094 `next.config.ts`에 `output: 'export'` 추가 (정적 HTML 출력, 선택적)
- [ ] T095 SSG 빌드 테스트 (`pnpm build`) - 에러 없이 빌드 완료 확인
- [ ] T096 빌드된 정적 파일 확인 (`out/` 또는 `.next/` 디렉토리에 HTML 파일 생성)
- [ ] T097 로컬에서 프로덕션 빌드 실행 (`pnpm start`) 및 최종 검증

### 6.6 문서 및 코드 정리

- [ ] T098 [P] README.md 업데이트 (프로젝트 설명, 기술 스택, 실행 방법, 배포 방법)
- [ ] T099 [P] `specs/001-portfolio-website/quickstart.md` 검증 실행 (단계별 따라하며 오류 확인)
- [ ] T100 [P] 사용하지 않는 코드/파일 제거 (빈 컴포넌트, 테스트 파일 등)
- [ ] T101 [P] 모든 파일에 명확한 주석 추가 (복잡한 로직, FSD Public API 설명)
- [ ] T102 [P] Git 커밋 메시지 정리 및 최종 커밋 ("feat: complete portfolio website with SSG and SEO")

### 6.7 최종 검증

- [ ] T103 모든 사용자 스토리 인수 시나리오 재검증 (US1 시나리오 1-7, US2 시나리오 1-7, US3 시나리오 1-6)
- [ ] T104 성공 기준 검증 (SC-001 ~ SC-010):
  - [ ] SC-001: 페이지 로드 후 3초 이내 모든 섹션 확인 가능
  - [ ] SC-002: 네비게이션 링크 클릭 후 1초 이내 섹션 이동
  - [ ] SC-003: 캐러셀에서 3번 클릭 이내 모든 프로젝트 탐색
  - [ ] SC-004: 모든 화면 크기에서 콘텐츠 읽을 수 있고 잘리지 않음
  - [ ] SC-005: GitHub 링크 유효성 확인
  - [ ] SC-006: Lighthouse 접근성 점수 90점 이상
  - [ ] SC-007: 느린 네트워크(3G)에서 10초 이내 로딩
  - [ ] SC-008: 모바일에서 햄버거 메뉴 1번 탭으로 섹션 이동
  - [ ] SC-009: 캐러셀 슬라이드 애니메이션 60fps 부드러움
  - [ ] SC-010: 기술 스택 및 프로젝트 경험 명확히 이해 가능
- [ ] T105 FSD 헌법 검사 최종 확인 (plan.md의 7개 항목 모두 통과)

---

## 의존성 및 실행 순서

### Phase 의존성

- **설정 (Phase 1)**: 의존성 없음 - 즉시 시작 가능
- **기반 (Phase 2)**: 설정 완료에 의존 - 모든 사용자 스토리를 차단
- **사용자 스토리 (Phase 3+)**: 모두 기반 단계 완료에 의존
  - 이후 사용자 스토리는 병렬로 진행 가능 (인력이 있는 경우)
  - 또는 우선순위 순서로 순차적으로 (P1 → P2 → P3)
- **마무리 (Phase 6)**: 모든 사용자 스토리 완료에 의존

### 사용자 스토리 의존성

- **사용자 스토리 1 (P1)**: 기반 (Phase 2) 이후 시작 가능 - 다른 스토리에 대한 의존성 없음
- **사용자 스토리 2 (P2)**: 기반 (Phase 2) 이후 시작 가능 - US1의 네비게이션과 통합되지만 독립적으로 테스트 가능
- **사용자 스토리 3 (P3)**: US1 및 US2 완료 후 시작 (기존 컴포넌트 수정) - 반응형 스타일 추가

### 병렬 처리 기회

- Phase 1의 [P]로 표시된 모든 설정 태스크는 병렬 실행 가능 (T003, T004, T005, T006, T007, T008)
- Phase 2.1의 [P]로 표시된 Shared 레이어 태스크는 병렬 실행 가능 (T009-T014)
- Phase 2.2의 [P]로 표시된 Entity 모델 태스크는 병렬 실행 가능 (T016-T027)
- Phase 5.1의 [P]로 표시된 반응형 스타일링 태스크는 병렬 실행 가능 (T066-T071)
- Phase 6의 대부분의 [P] 태스크는 병렬 실행 가능

---

## 구현 전략

### MVP 우선 (사용자 스토리 1만)

1. Phase 1 완료: 설정
2. Phase 2 완료: 기반 (중요 - 모든 스토리 차단)
3. Phase 3 완료: 사용자 스토리 1
4. **중지 및 검증**: 사용자 스토리 1을 독립적으로 테스트 (인수 시나리오 1-7)
5. 준비되면 배포/데모 (MVP!)

### 점진적 전달

1. 설정 + 기반 완료 → 기반 준비됨
2. 사용자 스토리 1 추가 → 독립적으로 테스트 → 배포/데모 (MVP!)
3. 사용자 스토리 2 추가 → 독립적으로 테스트 → 배포/데모
4. 사용자 스토리 3 추가 → 독립적으로 테스트 → 배포/데모
5. 마무리 (성능, SEO, 접근성) → 최종 배포

### 순차적 전략 (권장)

개인 프로젝트이므로 순차적 진행 권장:

1. Phase 1 → Phase 2 완료
2. Phase 3 (US1) 완료 후 체크포인트
3. Phase 4 (US2) 완료 후 체크포인트
4. Phase 5 (US3) 완료 후 체크포인트
5. Phase 6 (마무리) 완료 후 최종 검증

---

## 참고사항

- **[P] 태스크**: 다른 파일/레이어, 의존성 없음 - 병렬 실행 가능
- **[Story] 라벨**: 태스크를 특정 사용자 스토리에 매핑 (US1, US2, US3)
- **FSD 레이어 순서**: shared ← entities ← features ← widgets ← app (화살표 방향으로 import 가능, 역방향 금지)
- **TypeScript strict 모드**: 모든 코드에서 사용, 정당화되지 않은 `any` 타입 금지
- **Public API**: 모든 FSD 슬라이스는 `index.ts`를 통해 export
- **수동 테스트**: spec.md의 인수 시나리오를 기반으로 각 사용자 스토리 검증
- **체크포인트**: 각 Phase 완료 후 중지하여 독립적으로 검증
- **커밋 전략**: 각 태스크 또는 논리적 그룹 후에 커밋 (예: "feat(entities): add portfolio data model")

### 피해야 할 것

- ❌ 모호한 태스크 (명확한 파일 경로 및 설명 필요)
- ❌ 하위→상위 레이어 import (widgets ← features, features ← entities 등)
- ❌ 순환 의존성 (A → B → A)
- ❌ 정당화되지 않은 `any` 타입
- ❌ Public API 없이 직접 내부 파일 import
- ❌ 체크포인트 건너뛰기 (각 스토리를 독립적으로 검증해야 함)

---

**태스크 생성 완료**: 2025-11-11  
**문서 위치**: `/home/codeliner/dev/who-am-codeliner/specs/001-portfolio-website/tasks.md`  
**브랜치**: `001-portfolio-website`  
**총 태스크 수**: 105개 (설정 8개, 기반 24개, US1 21개, US2 12개, US3 9개, 마무리 31개)
