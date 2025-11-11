# 데이터 모델: 개발자 포트폴리오 웹사이트

**기능**: 001-portfolio-website  
**날짜**: 2025-11-11  
**목적**: 포트폴리오 웹사이트의 엔티티 및 데이터 구조 정의

## 엔티티 다이어그램

```
┌─────────────────────┐
│   PortfolioData     │
├─────────────────────┤
│ name: string        │
│ title: string       │
│ bio: string         │
│ aboutMe: string     │
│ profileImageUrl: str│
│ githubUrl: string   │
└──────┬──────────────┘
       │
       │ has many
       │
       ├──────────────────────────┐
       │                          │
       ▼                          ▼
┌─────────────┐          ┌──────────────┐
│   Skill     │          │   Project    │
├─────────────┤          ├──────────────┤
│ id: string  │          │ id: string   │
│ name: string│          │ name: string │
│ iconUrl: str│◄─────────┤ description  │
│ level?: str │ uses     │ imageUrl?: str│
└─────────────┘          │ githubUrl?: str│
                         │ demoUrl?: str│
                         │ startDate?: str│
                         │ endDate?: str│
                         │ techStack: []│
                         └──────────────┘
```

## 엔티티 정의

### 1. PortfolioData (entities/portfolio)

개발자의 핵심 프로필 정보를 담는 루트 엔티티

**속성**:
| 필드명 | 타입 | 필수 | 설명 | 검증 규칙 |
|--------|------|------|------|-----------|
| name | string | ✅ | 개발자 이름 (GitHub 이름) | 1-50자 |
| title | string | ✅ | 직책/역할 | 1-100자 |
| bio | string | ✅ | 히어로 섹션 소개 문구 | 1-200자 |
| aboutMe | string | ✅ | About Me 섹션 상세 설명 | 50-500자 |
| profileImageUrl | string | ✅ | 프로필 사진 URL | 유효한 URL 또는 로컬 경로 |
| githubUrl | string | ✅ | GitHub 프로필 URL | https://github.com/* 형식 |

**관계**:

- `skills: Skill[]` - 1:N 관계, 개발자가 보유한 기술 목록
- `projects: Project[]` - 1:N 관계, 개발자가 진행한 프로젝트 목록

**TypeScript 타입**:

```typescript
export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  aboutMe: string;
  profileImageUrl: string;
  githubUrl: string;
  skills: Skill[];
  projects: Project[];
}
```

**데이터 소스**: `entities/portfolio/model/portfolio.data.ts` (TypeScript 상수)

---

### 2. Skill (entities/skill)

개발자의 기술 스택 항목

**속성**:
| 필드명 | 타입 | 필수 | 설명 | 검증 규칙 |
|--------|------|------|------|-----------|
| id | string | ✅ | 고유 식별자 (slug 형식) | 소문자, 하이픈만 허용 |
| name | string | ✅ | 기술 이름 | 1-50자 |
| iconUrl | string | ✅ | 아이콘 이미지 URL (CDN) | Simple Icons URL |
| level | string? | ❌ | 숙련도 (선택적) | 'beginner' \| 'intermediate' \| 'advanced' |

**관계**:

- `projects: Project[]` - N:M 관계 (Project.techStack을 통해)

**TypeScript 타입**:

```typescript
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  id: string;
  name: string;
  iconUrl: string;
  level?: SkillLevel;
}
```

**예시 데이터**:

```typescript
export const SKILLS: Skill[] = [
  {
    id: 'react',
    name: 'React',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    level: 'advanced',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    level: 'advanced',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000',
    level: 'intermediate',
  },
];
```

**데이터 소스**: `entities/skill/model/skills.data.ts` (TypeScript 상수)

---

### 3. Project (entities/project)

개발자가 진행한 사이드 프로젝트

**속성**:
| 필드명 | 타입 | 필수 | 설명 | 검증 규칙 |
|--------|------|------|------|-----------|
| id | string | ✅ | 고유 식별자 (slug 형식) | 소문자, 하이픈만 허용 |
| name | string | ✅ | 프로젝트 이름 | 1-100자 |
| description | string | ✅ | 프로젝트 설명 | 50-300자 |
| imageUrl | string? | ❌ | 프로젝트 이미지 (선택적) | 유효한 URL 또는 로컬 경로 |
| githubUrl | string? | ❌ | GitHub 저장소 URL | https://github.com/* 형식 |
| demoUrl | string? | ❌ | 라이브 데모 URL | 유효한 URL |
| startDate | string? | ❌ | 시작 날짜 (선택적) | YYYY-MM 형식 |
| endDate | string? | ❌ | 종료 날짜 (선택적) | YYYY-MM 형식 또는 'Present' |
| techStack | string[] | ✅ | 사용 기술 목록 (Skill.id 참조) | 최소 1개 |

**관계**:

- `techStack: string[]` - Skill 엔티티의 id 배열 (N:M 관계)

**상태 전환**: N/A (정적 데이터)

**TypeScript 타입**:

```typescript
export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  startDate?: string; // YYYY-MM
  endDate?: string; // YYYY-MM or 'Present'
  techStack: string[]; // Skill ids
}
```

**예시 데이터**:

```typescript
export const PROJECTS: Project[] = [
  {
    id: 'portfolio-website',
    name: '개발자 포트폴리오',
    description: 'Next.js와 Tailwind CSS로 구축한 반응형 포트폴리오 웹사이트',
    imageUrl: '/images/projects/portfolio.png',
    githubUrl: 'https://github.com/codeliner/portfolio',
    demoUrl: 'https://codeliner.dev',
    startDate: '2025-11',
    endDate: 'Present',
    techStack: ['react', 'nextjs', 'typescript', 'tailwindcss'],
  },
];
```

**데이터 소스**: `entities/project/model/projects.data.ts` (TypeScript 상수)

---

## 데이터 흐름

### 정적 데이터 → 컴포넌트

```
entities/*/model/*.data.ts (TypeScript 상수)
           ↓
entities/*/model/index.ts (Public API)
           ↓
widgets/*/ui/*.tsx (UI 컴포넌트)
           ↓
app/page.tsx (페이지 구성)
```

### 데이터 가져오기 예시

```typescript
// app/page.tsx
import { PORTFOLIO_DATA } from '@/entities/portfolio';
import { HeroSection } from '@/widgets/hero';

export default function Home() {
  return (
    <main>
      <HeroSection data={PORTFOLIO_DATA} />
      {/* ... 다른 섹션 */}
    </main>
  );
}
```

---

## 검증 전략

### 빌드 타임 검증 (TypeScript)

```typescript
// entities/portfolio/model/portfolio.schema.ts
import { z } from 'zod';

export const PortfolioDataSchema = z.object({
  name: z.string().min(1).max(50),
  title: z.string().min(1).max(100),
  bio: z.string().min(1).max(200),
  aboutMe: z.string().min(50).max(500),
  profileImageUrl: z.string().url().or(z.string().startsWith('/')),
  githubUrl: z.string().url().startsWith('https://github.com/'),
});

// 데이터 파일에서 검증
export const PORTFOLIO_DATA = PortfolioDataSchema.parse({
  name: 'Codeliner',
  // ...
});
```

### 런타임 검증 (선택적)

- 이미지 URL 유효성: Next.js Image onError 핸들러
- GitHub 링크 유효성: 링크 클릭 시 브라우저 자연스럽게 처리 (404 허용)

---

## 데이터 마이그레이션

현재는 정적 데이터이므로 마이그레이션 불필요. 향후 CMS 도입 시:

1. TypeScript 상수 → JSON 내보내기 스크립트 작성
2. CMS로 데이터 임포트
3. FSD 구조 유지 (entities/\*/api에 CMS 클라이언트 추가)

---

## 엣지 케이스 처리

### 이미지 로딩 실패

```typescript
// shared/ui/OptimizedImage.tsx
export const OptimizedImage = ({ src, alt, fallback = '/placeholder.png' }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return <Image src={imgSrc} alt={alt} onError={() => setImgSrc(fallback)} />;
};
```

### 빈 프로젝트 배열

```typescript
// widgets/projects/ui/ProjectsSection.tsx
{
  projects.length === 0 ? (
    <p className='text-gray-500'>프로젝트 준비 중입니다.</p>
  ) : (
    <ProjectCarousel projects={projects} />
  );
}
```

### 긴 프로젝트 설명

```typescript
// entities/project/ui/ProjectCard.tsx
<p className='line-clamp-3'>{description}</p>
```

---

## 파일 위치 매핑

| 엔티티        | 타입 정의                           | 데이터 소스                                  | Public API                    |
| ------------- | ----------------------------------- | -------------------------------------------- | ----------------------------- |
| PortfolioData | `entities/portfolio/model/types.ts` | `entities/portfolio/model/portfolio.data.ts` | `entities/portfolio/index.ts` |
| Skill         | `entities/skill/model/types.ts`     | `entities/skill/model/skills.data.ts`        | `entities/skill/index.ts`     |
| Project       | `entities/project/model/types.ts`   | `entities/project/model/projects.data.ts`    | `entities/project/index.ts`   |
