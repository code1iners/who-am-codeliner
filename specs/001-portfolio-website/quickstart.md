# Quickstart: 개발자 포트폴리오 웹사이트

**기능**: 001-portfolio-website  
**브랜치**: `001-portfolio-website`  
**목적**: 개발 환경 설정 및 첫 실행 가이드

## 사전 요구사항

- **Node.js**: 18.x 이상 (LTS 권장)
- **pnpm**: 8.x 이상
- **Git**: 버전 관리
- **코드 에디터**: VS Code 권장 (ESLint, Prettier 확장)

## 초기 설정

### 1. 저장소 클론 및 브랜치 체크아웃

```bash
# 저장소 클론 (이미 완료된 경우 생략)
git clone <repository-url>
cd who-am-codeliner

# 기능 브랜치로 전환
git checkout 001-portfolio-website
```

### 2. 의존성 설치

```bash
# pnpm 설치 (미설치 시)
npm install -g pnpm

# 프로젝트 의존성 설치
pnpm install
```

### 3. 추가 라이브러리 설치

이 기능에 필요한 추가 패키지 설치:

```bash
# Tailwind CSS v4 (최신 버전)
pnpm add tailwindcss@next @tailwindcss/postcss@next

# 캐러셀 라이브러리
pnpm add embla-carousel-react

# 접근성 컴포넌트
pnpm add @headlessui/react

# 유틸리티 (선택적)
pnpm add clsx tailwind-merge

# 타입 검증 (선택적)
pnpm add zod
```

### 4. Tailwind CSS v4 설정

Tailwind CSS v4는 Zero-config이며 CSS 파일만으로 설정합니다:

```css
/* app/globals.css */
@import 'tailwindcss';

/* 테마 커스터마이징 (선택적) */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

**참고**: v4에서는 `tailwind.config.ts` 파일이 선택적입니다. CSS `@theme` 지시어로 대부분 설정 가능합니다.

### 5. Next.js SSG 설정

정적 사이트 생성을 위한 설정:

```typescript
// app/page.tsx
export const dynamic = 'force-static';

export default function Home() {
  return <main>{/* 콘텐츠 */}</main>;
}
```

```typescript
// next.config.ts (완전 정적 출력 시)
const config = {
  output: 'export', // 정적 HTML 내보내기 (선택적)
};

export default config;
```

### 6. SEO 최적화 설정

"codeliner" 및 "codeliners" 키워드로 구글 상단 노출을 위한 설정:

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

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
    'next.js developer',
    'portfolio',
  ],
  authors: [{ name: 'Codeliner' }],
  creator: 'Codeliner',
  openGraph: {
    title: 'Codeliner | Front-End Developer',
    description: 'Codeliner의 개발자 포트폴리오',
    url: 'https://codeliner.dev',
    siteName: 'Codeliner Portfolio',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Codeliner Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codeliner | Front-End Developer',
    description: 'Codeliner의 개발자 포트폴리오',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
```

```typescript
// app/page.tsx - 구조화된 데이터 추가
export const dynamic = 'force-static';

export default function Home() {
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
    knowsAbout: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'JavaScript',
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>{/* 위젯 구성 */}</main>
    </>
  );
}
```

```text
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://codeliner.dev/sitemap.xml
```

**Open Graph 이미지 생성**:

- 크기: 1200x630px
- 내용: "Codeliner | Front-End Developer" 텍스트 + 로고
- 위치: `public/images/og-image.png`

### 7. 환경 변수 설정 (선택적)

이 프로젝트는 외부 API를 사용하지 않지만, 향후 확장을 위해:

```bash
# .env.local 파일 생성
cp .env.example .env.local
```

`.env.local` 예시:

```env
# 사이트 메타데이터
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Codeliner Portfolio
```

## 개발 서버 실행

### 로컬 개발 모드

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 접속

### 빌드 및 프로덕션 모드

```bash
# SSG 빌드 (정적 HTML 생성)
pnpm build

# 빌드 결과 확인
# - .next/static/ : 정적 에셋 (JS, CSS)
# - .next/server/app/ : 서버 페이지 (SSG)
# - out/ : 완전 정적 출력 (output: 'export' 설정 시)

# 로컬에서 빌드 결과 실행
pnpm start

# 정적 파일 서버 (output: 'export' 사용 시)
npx serve out
```

**SSG 확인 방법**:

```bash
# 빌드 후 .next/server/app/page.html 파일 존재 확인
ls -la .next/server/app/

# 빌드 로그에서 "○ (Static)" 표시 확인
# ○ /   (Static)  # 이 표시가 SSG를 의미
```

### Lint 및 포맷

```bash
# ESLint 검사
pnpm lint

# ESLint 자동 수정
pnpm lint --fix

# Prettier 포맷 (설정된 경우)
pnpm format
```

## FSD 구조 생성

### Entity 레이어 생성

```bash
# Portfolio entity
mkdir -p entities/portfolio/model
touch entities/portfolio/model/types.ts
touch entities/portfolio/model/portfolio.data.ts
touch entities/portfolio/index.ts

# Skill entity
mkdir -p entities/skill/{model,ui}
touch entities/skill/model/types.ts
touch entities/skill/model/skills.data.ts
touch entities/skill/ui/SkillCard.tsx
touch entities/skill/index.ts

# Project entity
mkdir -p entities/project/{model,ui}
touch entities/project/model/types.ts
touch entities/project/model/projects.data.ts
touch entities/project/ui/ProjectCard.tsx
touch entities/project/index.ts
```

### Feature 레이어 생성

```bash
# Navigation feature
mkdir -p features/navigation/{ui,lib}
touch features/navigation/ui/Navigation.tsx
touch features/navigation/ui/MobileMenu.tsx
touch features/navigation/lib/scroll-to-section.ts
touch features/navigation/index.ts

# Projects Carousel feature
mkdir -p features/projects-carousel/{ui,lib}
touch features/projects-carousel/ui/ProjectCarousel.tsx
touch features/projects-carousel/ui/CarouselControls.tsx
touch features/projects-carousel/lib/use-carousel.ts
touch features/projects-carousel/index.ts
```

### Widget 레이어 생성

```bash
# Widgets
mkdir -p widgets/{header,hero,about,skills,projects,contacts}/ui

touch widgets/header/ui/Header.tsx
touch widgets/header/index.ts

touch widgets/hero/ui/HeroSection.tsx
touch widgets/hero/index.ts

touch widgets/about/ui/AboutSection.tsx
touch widgets/about/index.ts

touch widgets/skills/ui/SkillsSection.tsx
touch widgets/skills/index.ts

touch widgets/projects/ui/ProjectsSection.tsx
touch widgets/projects/index.ts

touch widgets/contacts/ui/ContactsSection.tsx
touch widgets/contacts/index.ts
```

### Shared 레이어 생성

```bash
# Shared UI
mkdir -p shared/{ui,lib,config,types}
touch shared/ui/Button.tsx
touch shared/ui/OptimizedImage.tsx
touch shared/ui/Section.tsx
touch shared/lib/cn.ts
touch shared/config/site.ts
```

### Public 에셋 준비

```bash
# 이미지 디렉토리 생성
mkdir -p public/images/{projects,icons}
```

프로필 사진, 로고, 프로젝트 이미지를 `public/images/`에 배치하세요.

## 개발 워크플로

### 1. 데이터 정의부터 시작

```typescript
// entities/portfolio/model/portfolio.data.ts
export const PORTFOLIO_DATA = {
  name: 'Codeliner',
  title: 'Front-End Developer',
  bio: '코드를 통해 비즈니스 문제 해결과 효율적 설계를 고민하며 꾸준히 성장하고 있습니다.',
  aboutMe: '상세한 자기소개 텍스트...',
  profileImageUrl: '/images/profile.png',
  githubUrl: 'https://github.com/your-username',
} as const;
```

### 2. 공용 컴포넌트 구현 (Shared)

```typescript
// shared/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={/* Tailwind classes */}>
      {children}
    </button>
  );
};
```

### 3. Entity UI 구현

```typescript
// entities/skill/ui/SkillCard.tsx
import { Skill } from '../model/types';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <img src={skill.iconUrl} alt={skill.name} className='w-12 h-12' />
      <span>{skill.name}</span>
    </div>
  );
};
```

### 4. Widget 구현 (Entity 조합)

```typescript
// widgets/skills/ui/SkillsSection.tsx
import { SKILLS } from '@/entities/skill';
import { SkillCard } from '@/entities/skill';

export const SkillsSection = () => {
  return (
    <section id='skills' className='py-16'>
      <h2>Skills</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {SKILLS.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
};
```

### 5. Page 구성 (Widget 조합)

```typescript
// app/page.tsx
import { HeroSection } from '@/widgets/hero';
import { AboutSection } from '@/widgets/about';
import { SkillsSection } from '@/widgets/skills';
import { ProjectsSection } from '@/widgets/projects';
import { ContactsSection } from '@/widgets/contacts';

// SSG 강제 설정
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactsSection />
    </main>
  );
}
```

### 6. Tailwind CSS v4 스타일링

```typescript
// shared/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-medium transition-colors
        ${
          variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
        }
      `}
    >
      {children}
    </button>
  );
};
```

## 주요 명령어 요약

| 명령어            | 설명                                      |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | 개발 서버 시작 (http://localhost:3000)    |
| `pnpm build`      | SSG 빌드 (정적 HTML 생성)                 |
| `pnpm start`      | 빌드된 앱 실행                            |
| `npx serve out`   | 정적 파일 서버 (output: 'export' 사용 시) |
| `pnpm lint`       | ESLint 검사 실행                          |
| `pnpm lint --fix` | ESLint 자동 수정                          |

## 문제 해결

### Port 3000이 이미 사용 중

```bash
# 다른 포트 사용
pnpm dev -- -p 3001
```

### 의존성 설치 오류

```bash
# pnpm 캐시 정리
pnpm store prune

# node_modules 삭제 후 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript 에러

```bash
# TypeScript 컴파일 검사
pnpm tsc --noEmit
```

### Image 최적화 에러

Next.js Image 컴포넌트 사용 시 이미지가 `public/` 디렉토리에 있는지 확인하거나, 외부 URL의 경우 `next.config.ts`에 도메인 추가:

```typescript
// next.config.ts
const config = {
  output: 'export', // SSG 정적 출력 (선택적)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
};

export default config;
```

### Tailwind CSS v4 스타일 적용 안 됨

```bash
# globals.css에 @import 확인
# app/globals.css
@import 'tailwindcss';

# 개발 서버 재시작
pnpm dev
```

### SSG 빌드 확인

```bash
# 빌드 후 로그에서 Static 표시 확인
pnpm build

# 출력 예시:
# ○ /   (Static)  # SSG 성공
# ● /   (SSR)     # 동적 렌더링 (원하지 않는 경우 force-static 추가)
```

### SEO 검증

```bash
# Lighthouse SEO 점수 확인 (95+ 목표)
# Chrome DevTools > Lighthouse > SEO 검사 실행

# 구조화된 데이터 검증
# https://search.google.com/test/rich-results
# 페이지 URL 입력 또는 코드 붙여넣기

# Open Graph 미리보기
# https://www.opengraph.xyz/
```

**SEO 체크리스트**:

- [ ] `robots.txt` 파일 존재 (`public/robots.txt`)
- [ ] Open Graph 이미지 생성 (1200x630px)
- [ ] JSON-LD 구조화된 데이터 포함
- [ ] 모든 이미지에 alt 텍스트
- [ ] 시맨틱 HTML 태그 사용
- [ ] "codeliner", "codeliners" 키워드 자연스럽게 포함

## 다음 단계

1. ✅ 개발 환경 설정 완료
2. 📝 `tasks.md`에서 구현 태스크 확인 (`/speckit.tasks` 명령어로 생성)
3. 🎨 Tailwind CSS v4 테마 커스터마이징 (`app/globals.css`의 `@theme` 섹션)
4. 🔍 SEO 최적화 (Metadata, JSON-LD, Open Graph 이미지)
5. 🏗️ SSG 빌드 최적화 (`next.config.ts`의 `output: 'export'` 설정)
6. 🧪 컴포넌트 테스트 작성 (선택적)
7. 🚀 Vercel/Netlify 배포 설정

## 유용한 리소스

### 프레임워크 & 라이브러리

- [Next.js 문서](https://nextjs.org/docs)
- [Next.js SSG 가이드](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs/v4-beta)
- [Tailwind CSS v4 마이그레이션](https://tailwindcss.com/docs/v4-beta#migrating-from-v3)
- [FSD 방법론](https://feature-sliced.design/)
- [Embla Carousel 문서](https://www.embla-carousel.com/)
- [Headless UI 문서](https://headlessui.com/)
- [Simple Icons](https://simpleicons.org/)

### SEO & 메타데이터

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Person 스키마](https://schema.org/Person)
- [Google 리치 결과 테스트](https://search.google.com/test/rich-results)
- [Open Graph 프로토콜](https://ogp.me/)
- [Open Graph 미리보기 도구](https://www.opengraph.xyz/)
