# Phase 0: 연구 및 기술 결정

**기능**: 개발자 포트폴리오 웹사이트  
**날짜**: 2025-11-11  
**목적**: 구현 전 기술적 불확실성 해결 및 모범 사례 확립

## 연구 질문 및 결정

### 1. 정적 데이터 관리 구조

**질문**: TypeScript 상수와 JSON 파일 중 어느 것이 포트폴리오 데이터 관리에 더 적합한가?

**결정**: TypeScript 상수 파일 사용

**근거**:

- 빌드 타임 타입 검증으로 데이터 무결성 보장
- IDE 자동완성 및 리팩토링 지원
- JSON 파싱 오버헤드 없음 (빌드 타임에 번들링)
- Zod 스키마로 런타임 검증 가능
- 데이터 변경 빈도 낮음 (개인 포트폴리오)

**구현**:

```typescript
// entities/portfolio/model/portfolio.data.ts
export const PORTFOLIO_DATA = {
  name: 'Codeliner',
  title: 'Front-End Developer',
  bio: '코드를 통해 비즈니스 문제 해결과 효율적 설계를 고민하며 꾸준히 성장하고 있습니다.',
  // ...
} as const;
```

**대안 평가**:

- JSON 파일: 비개발자도 수정 가능하지만, 이 프로젝트에서는 불필요
- CMS (Contentful, Sanity): 과도한 복잡도, 정적 사이트에 부적합
- Markdown: 구조화된 데이터에 부적합

---

### 2. 기술 아이콘 CDN 선택

**질문**: devicons vs simpleicons vs 로컬 아이콘 중 어느 것을 사용할 것인가?

**결정**: Simple Icons CDN (https://cdn.simpleicons.org/)

**근거**:

- 2000+ 브랜드 아이콘 제공
- SVG 포맷으로 확장성 좋음
- CDN 캐싱으로 빠른 로딩
- 일관된 스타일
- 다크모드 대응 용이 (fill 색상 제어 가능)

**구현**:

```typescript
// entities/skill/model/skills.data.ts
export const TECH_STACK = [
  {
    name: 'React',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    name: 'TypeScript',
    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
  },
  // ...
];
```

**대안 평가**:

- devicons: 더 많은 아이콘이지만 로딩 속도 느림
- 로컬 SVG: 번들 크기 증가, CDN 캐싱 이점 없음
- 이모지: 플랫폼마다 다른 렌더링

---

### 3. 캐러셀 라이브러리 vs 커스텀 구현

**질문**: 프로젝트 캐러셀을 라이브러리로 구현할 것인가, 직접 구현할 것인가?

**결정**: Embla Carousel (경량 라이브러리)

**근거**:

- 10KB 미만 경량 (gzipped)
- React 바인딩 제공
- 무한 루프, 인디케이터 내장
- 60fps 성능 보장
- 접근성 지원 (키보드 내비게이션)
- TypeScript 타입 제공

**구현**:

```bash
pnpm add embla-carousel-react
```

**대안 평가**:

- Swiper: 무겁고 (30KB+), 불필요한 기능 많음
- React Slick: 오래됨, 접근성 부족
- 커스텀 구현: 접근성, 터치 제스처 구현 복잡도 높음

---

### 4. 스크롤 애니메이션 구현

**질문**: 부드러운 섹션 스크롤을 어떻게 구현할 것인가?

**결정**: CSS scroll-behavior + Intersection Observer API

**근거**:

- 브라우저 네이티브 기능으로 성능 최적
- JavaScript 라이브러리 불필요
- 자연스러운 이징 기본 제공
- 접근성 고려 (prefers-reduced-motion 지원)

**구현**:

```css
/* app/globals.css */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

**대안 평가**:

- Framer Motion: 과도한 번들 크기, 단순 스크롤에 불필요
- GSAP ScrollTo: 유료 플러그인, 과도한 기능
- react-scroll: 불필요한 추상화

---

### 5. 다크모드 구현 전략

**질문**: 다크모드를 어떻게 구현하고 시스템 설정을 감지할 것인가?

**결정**: CSS prefers-color-scheme + Tailwind dark: variant

**근거**:

- Tailwind에 내장된 다크모드 지원
- 추가 JavaScript 불필요
- 시스템 설정 자동 감지
- 플리커 없음 (CSS만으로 처리)
- 사용자 토글 미지원으로 복잡도 최소화

**구현**:

```javascript
// tailwind.config.ts
export default {
  darkMode: 'media', // prefers-color-scheme 사용
  // ...
};
```

**대안 평가**:

- next-themes: 사용자 토글 제공하지만, 요구사항에 없음
- 수동 클래스 토글: 복잡도 증가, 저장소 필요

---

### 6. 이미지 최적화 및 로딩 전략

**질문**: 프로필 사진과 프로젝트 이미지를 어떻게 최적화할 것인가?

**결정**: Next.js Image 컴포넌트 + Placeholder blur

**근거**:

- 자동 WebP/AVIF 변환
- 레이지 로딩 기본 제공
- Blur placeholder로 CLS 방지
- Responsive images (srcset 자동 생성)
- 성능 목표 달성 (SC-001, SC-007)

**구현**:

```typescript
// shared/ui/OptimizedImage.tsx
import Image from 'next/image';

export const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    placeholder='blur'
    blurDataURL='data:image/...' // 대체 이미지
    {...props}
  />
);
```

**대안 평가**:

- HTML <img>: 최적화 없음, CLS 발생
- 서드파티 CDN: 추가 비용, 불필요한 복잡도

---

### 7. 반응형 디자인 브레이크포인트

**질문**: 어떤 브레이크포인트를 사용할 것인가?

**결정**: Tailwind 기본 브레이크포인트 사용

**근거**:

- 업계 표준 (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- 명세서 요구사항과 일치 (모바일 < 768px, 태블릿 768-1024px, 데스크톱 > 1024px)
- 추가 설정 불필요

**구현**:

```typescript
// Tailwind 클래스 예시
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
```

**대안 평가**:

- 커스텀 브레이크포인트: 불필요한 복잡도
- Container queries: 브라우저 지원 제한적

---

### 8. 햄버거 메뉴 구현

**질문**: 모바일 햄버거 메뉴를 어떻게 구현할 것인가?

**결정**: Headless UI Dialog + Tailwind

**근거**:

- 접근성 완벽 지원 (포커스 트랩, Escape 키, ARIA)
- 경량 (5KB)
- Tailwind와 완벽 통합
- 애니메이션 제어 용이

**구현**:

```bash
pnpm add @headlessui/react
```

**대안 평가**:

- 커스텀 구현: 접근성 처리 복잡
- Radix UI: 더 무겁고, Dialog만 필요
- React Modal: 구식, 접근성 부족

---

### 9. Tailwind CSS 버전 선택

**질문**: Tailwind CSS v3와 v4 중 어느 것을 사용할 것인가?

**결정**: Tailwind CSS v4 (최신 버전)

**근거**:

- **Lightning CSS 엔진**: Rust 기반으로 v3 대비 5-10배 빠른 빌드
- **Zero-config**: PostCSS 설정 불필요, CSS 파일만으로 설정
- **더 작은 CSS 번들**: 최적화된 출력으로 번들 크기 감소
- **CSS 우선 설정**: `@theme` 지시어로 직관적 테마 커스터마이징
- **향상된 성능**: HMR 속도 개선, 개발 경험 향상
- **하위 호환성**: 대부분의 v3 클래스 그대로 사용 가능

**구현**:

```bash
pnpm add tailwindcss@next @tailwindcss/postcss@next
```

```css
/* app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

**대안 평가**:

- Tailwind CSS v3: 안정적이지만 빌드 속도 느림, PostCSS 설정 필요
- 다른 CSS 프레임워크: FSD 아키텍처와 통합 복잡

---

### 10. Next.js 렌더링 전략

**질문**: SSG, SSR, ISR 중 어느 렌더링 전략을 사용할 것인가?

**결정**: SSG (Static Site Generation) with `force-static`

**근거**:

- **최적 성능**: 빌드 타임에 HTML 사전 생성, CDN 캐싱 가능
- **제로 서버 비용**: 정적 파일 호스팅만 필요 (Vercel, Netlify)
- **즉각적 로딩**: 서버 렌더링 대기 시간 없음
- **SEO 최적**: 완전한 HTML로 크롤러에 최적화
- **데이터 정적**: 포트폴리오 데이터는 빌드 타임에 고정
- **Next.js 16 호환**: App Router의 기본 동작

**구현**:

```typescript
// app/page.tsx
export const dynamic = 'force-static';

export default function Home() {
  return <main>{/* 위젯 구성 */}</main>;
}
```

```typescript
// next.config.ts
const config = {
  output: 'export', // 정적 HTML 출력 (선택적, CDN 배포 시)
};
```

**대안 평가**:

- SSR (Server-Side Rendering): 불필요한 서버 비용, 정적 데이터에 과도
- ISR (Incremental Static Regeneration): 재검증 불필요, 데이터 변경 빈도 낮음
- CSR (Client-Side Rendering): SEO 불리, 초기 로딩 느림

---

### 11. SEO 최적화 전략

**질문**: "codeliner" 및 "codeliners" 키워드로 구글 상단 노출을 위한 SEO 전략은?

**결정**: 다층 SEO 최적화 (Metadata API + 구조화된 데이터 + 시맨틱 HTML)

**근거**:

- **Next.js Metadata API**: 동적 메타 태그 생성, SEO 최적화 내장
- **구조화된 데이터 (JSON-LD)**: Google 검색 결과에 리치 스니펫 표시
- **시맨틱 HTML**: `<main>`, `<section>`, `<article>`, `<header>` 태그로 구조화
- **Open Graph**: SNS 공유 시 미리보기 최적화
- **키워드 최적화**: "codeliner", "codeliners" 자연스럽게 콘텐츠에 포함
- **SSG 장점**: 정적 HTML로 크롤러 친화적

**구현**:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Codeliner | Front-End Developer Portfolio',
  description:
    'Codeliner(코드라이너)는 프론트엔드 개발자로, React, TypeScript, Next.js를 활용한 포트폴리오입니다. Codeliners의 프로젝트와 기술 스택을 확인하세요.',
  keywords: [
    'codeliner',
    'codeliners',
    '코드라이너',
    'frontend developer',
    'react developer',
    'typescript developer',
    'portfolio',
  ],
  authors: [{ name: 'Codeliner' }],
  openGraph: {
    title: 'Codeliner | Front-End Developer',
    description: 'Codeliner의 개발자 포트폴리오',
    url: 'https://codeliner.dev',
    siteName: 'Codeliner Portfolio',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codeliner | Front-End Developer',
    description: 'Codeliner의 개발자 포트폴리오',
    images: ['/images/og-image.png'],
  },
};
```

```typescript
// app/page.tsx - 구조화된 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Codeliner',
  alternateName: 'Codeliners',
  url: 'https://codeliner.dev',
  jobTitle: 'Front-End Developer',
  description:
    'Codeliner는 React, TypeScript, Next.js를 사용하는 프론트엔드 개발자입니다.',
  sameAs: ['https://github.com/codeliner'],
  knowsAbout: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
};

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>{/* 콘텐츠 */}</main>
    </>
  );
}
```

**시맨틱 HTML**:

```html
<main>
  <header><h1>Codeliner</h1></header>
  <section aria-label="About Codeliner">
    <h2>About Me</h2>
    <p>Codeliner(codeliners)는...</p>
  </section>
</main>
```

**추가 최적화**:

- `robots.txt`: 크롤러 접근 허용
- `sitemap.xml`: URL 구조 명시 (SSG 출력 시 자동 생성)
- `<link rel="canonical">`: 중복 콘텐츠 방지
- Alt 텍스트: 모든 이미지에 "Codeliner" 포함

**대안 평가**:

- 수동 메타 태그: 관리 어려움, Metadata API가 더 선언적
- 외부 SEO 도구: 불필요한 의존성, Next.js 내장 기능으로 충분
- 키워드 스터핑: Google 페널티, 자연스러운 포함이 중요

**예상 효과**:

- Lighthouse SEO 점수: 95-100점
- Google 검색 "codeliner" 또는 "codeliners": 이름 고유성으로 상단 노출 가능성 높음
- 리치 스니펫: Person 스키마로 검색 결과에 프로필 정보 표시

---

## 기술 스택 최종 정리

### 핵심 프레임워크

- **Next.js 16.0.1**: App Router, SSG (Static Site Generation), Image optimization
- **React 19.2.0**: Server/Client Components
- **TypeScript 5.x**: Strict mode

### UI 및 스타일링

- **Tailwind CSS 4.x (v4)**: 최신 버전, Lightning CSS 엔진, 향상된 성능
- **Headless UI**: 접근성 높은 Dialog/Menu 컴포넌트

### 데이터 및 검증

- **Zod**: 런타임 타입 검증 (선택적)
- **TypeScript const assertions**: 정적 데이터 타입 안전성

### 상호작용

- **Embla Carousel**: 프로젝트 캐러셀
- **Intersection Observer API**: 스크롤 감지 (선택적)

### 개발 도구

- **ESLint**: Next.js 기본 설정
- **Prettier**: 코드 포매팅 (선택적)

### 외부 리소스

- **Simple Icons CDN**: 기술 스택 아이콘

### SEO 및 메타데이터

- **Next.js Metadata API**: 동적 메타 태그 생성
- **JSON-LD 구조화된 데이터**: Google 리치 스니펫
- **Open Graph & Twitter Cards**: SNS 공유 최적화
- **Sitemap & Robots.txt**: 크롤러 최적화

---

## 성능 체크리스트

- [x] Next.js Image 사용으로 자동 최적화
- [x] CDN 아이콘으로 번들 크기 최소화
- [x] 경량 라이브러리만 사용 (Embla < 10KB, Headless UI < 5KB)
- [x] CSS 네이티브 scroll-behavior (JavaScript 불필요)
- [x] 정적 데이터로 API 호출 제거
- [x] **SSG로 빠른 First Contentful Paint (빌드 타임 사전 렌더링)**
- [x] **Tailwind CSS v4로 더 빠른 빌드 및 작은 CSS 번들**

## SEO 체크리스트

- [x] **메타 태그 최적화**: "codeliner" 및 "codeliners" 키워드 포함
- [x] **구조화된 데이터**: Person 스키마 (JSON-LD)
- [x] **Open Graph**: SNS 공유 최적화
- [x] **시맨틱 HTML**: `<main>`, `<section>`, `<header>` 태그
- [x] **Alt 텍스트**: 모든 이미지에 설명 포함
- [x] **Canonical URL**: 중복 콘텐츠 방지
- [x] **Robots.txt & Sitemap**: 크롤러 가이드
- [x] **SSG**: 정적 HTML로 크롤러 친화적

**예상 번들 크기**: < 100KB (main bundle)  
**예상 First Load**: < 2초 (3초 목표 여유 있음)  
**SSG 빌드**: 정적 HTML 생성으로 초기 로딩 0ms (CDN 캐싱)
