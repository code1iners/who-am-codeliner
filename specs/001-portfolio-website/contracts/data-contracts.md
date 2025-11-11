# 데이터 계약: 포트폴리오 웹사이트

**기능**: 001-portfolio-website  
**날짜**: 2025-11-11  
**목적**: 정적 데이터 구조 및 타입 계약 정의

> **참고**: 이 프로젝트는 외부 API를 사용하지 않는 정적 사이트입니다. 모든 데이터는 TypeScript 상수로 관리되며, 이 문서는 데이터 구조의 계약을 명시합니다.

## 데이터 계약 개요

모든 데이터는 빌드 타임에 정적으로 번들링되며, 다음 원칙을 따릅니다:

1. **타입 안정성**: 모든 데이터는 TypeScript 인터페이스로 타입 정의
2. **Public API**: entities/\*/index.ts를 통해서만 데이터 접근
3. **불변성**: `as const` 단언으로 읽기 전용 보장
4. **검증**: Zod 스키마로 런타임 검증 (선택적)

## 1. Portfolio Data Contract

### 타입 정의

```typescript
// entities/portfolio/model/types.ts

export interface PortfolioData {
  /** 개발자 이름 (GitHub 이름) */
  name: string;

  /** 직책/역할 */
  title: string;

  /** 히어로 섹션 소개 문구 (1-2줄) */
  bio: string;

  /** About Me 섹션 상세 설명 (2-3줄) */
  aboutMe: string;

  /** 프로필 사진 URL (로컬 경로 또는 외부 URL) */
  profileImageUrl: string;

  /** GitHub 프로필 URL */
  githubUrl: string;
}
```

### 데이터 예시

```typescript
// entities/portfolio/model/portfolio.data.ts

export const PORTFOLIO_DATA: PortfolioData = {
  name: 'Codeliner',
  title: 'Front-End Developer',
  bio: '코드를 통해 비즈니스 문제 해결과 효율적 설계를 고민하며 꾸준히 성장하고 있습니다.',
  aboutMe:
    '저는 프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며, 비즈니스 문제를 효율적으로 해결하는 코드를 작성하는 것을 좋아합니다. 새로운 기술을 배우고 적용하는 것에 열정이 있으며, 팀과 협업하며 성장하는 것을 즐깁니다.',
  profileImageUrl: '/images/profile.png',
  githubUrl: 'https://github.com/codeliner',
} as const;
```

### Public API

```typescript
// entities/portfolio/index.ts

export { PORTFOLIO_DATA } from './model/portfolio.data';
export type { PortfolioData } from './model/types';
```

### 검증 규칙

- `name`: 1-50자, 비어있지 않음
- `title`: 1-100자
- `bio`: 1-200자
- `aboutMe`: 50-500자
- `profileImageUrl`: 유효한 URL 또는 /로 시작하는 로컬 경로
- `githubUrl`: https://github.com/로 시작

---

## 2. Skill Data Contract

### 타입 정의

```typescript
// entities/skill/model/types.ts

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  /** 고유 식별자 (slug 형식: 소문자-하이픈) */
  id: string;

  /** 기술 이름 */
  name: string;

  /** 기술 아이콘 URL (Simple Icons CDN) */
  iconUrl: string;

  /** 숙련도 (선택적) */
  level?: SkillLevel;
}
```

### 데이터 예시

```typescript
// entities/skill/model/skills.data.ts

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
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    level: 'advanced',
  },
] as const;
```

### Public API

```typescript
// entities/skill/index.ts

export { SKILLS } from './model/skills.data';
export type { Skill, SkillLevel } from './model/types';
export { SkillCard } from './ui/SkillCard';
```

### 검증 규칙

- `id`: 소문자, 숫자, 하이픈만 허용, 유일해야 함
- `name`: 1-50자
- `iconUrl`: https://cdn.simpleicons.org/ 형식
- `level`: 'beginner' | 'intermediate' | 'advanced' 중 하나

---

## 3. Project Data Contract

### 타입 정의

```typescript
// entities/project/model/types.ts

export interface Project {
  /** 고유 식별자 (slug 형식) */
  id: string;

  /** 프로젝트 이름 */
  name: string;

  /** 프로젝트 설명 (1-2문장) */
  description: string;

  /** 프로젝트 대표 이미지 URL (선택적) */
  imageUrl?: string;

  /** GitHub 저장소 URL (선택적) */
  githubUrl?: string;

  /** 라이브 데모 URL (선택적) */
  demoUrl?: string;

  /** 프로젝트 시작 날짜 (YYYY-MM, 선택적) */
  startDate?: string;

  /** 프로젝트 종료 날짜 (YYYY-MM 또는 'Present', 선택적) */
  endDate?: string;

  /** 사용된 기술 목록 (Skill.id 참조) */
  techStack: string[];
}
```

### 데이터 예시

```typescript
// entities/project/model/projects.data.ts

export const PROJECTS: Project[] = [
  {
    id: 'portfolio-website',
    name: '개발자 포트폴리오',
    description:
      'Next.js와 Tailwind CSS로 구축한 반응형 포트폴리오 웹사이트. FSD 아키텍처를 적용하여 확장 가능한 구조로 설계했습니다.',
    imageUrl: '/images/projects/portfolio.png',
    githubUrl: 'https://github.com/codeliner/portfolio',
    demoUrl: 'https://codeliner.dev',
    startDate: '2025-11',
    endDate: 'Present',
    techStack: ['react', 'nextjs', 'typescript', 'tailwindcss'],
  },
  {
    id: 'task-manager',
    name: '태스크 매니저',
    description:
      '팀 협업을 위한 간단한 태스크 관리 도구. 드래그 앤 드롭으로 태스크 상태를 변경할 수 있습니다.',
    imageUrl: '/images/projects/task-manager.png',
    githubUrl: 'https://github.com/codeliner/task-manager',
    startDate: '2025-09',
    endDate: '2025-10',
    techStack: ['react', 'typescript', 'zustand'],
  },
] as const;
```

### Public API

```typescript
// entities/project/index.ts

export { PROJECTS } from './model/projects.data';
export type { Project } from './model/types';
export { ProjectCard } from './ui/ProjectCard';
```

### 검증 규칙

- `id`: 소문자, 숫자, 하이픈만 허용, 유일해야 함
- `name`: 1-100자
- `description`: 50-300자
- `imageUrl`: 유효한 URL 또는 /로 시작하는 로컬 경로 (선택적)
- `githubUrl`: https://github.com/로 시작 (선택적)
- `demoUrl`: 유효한 URL (선택적)
- `startDate`: YYYY-MM 형식 (선택적)
- `endDate`: YYYY-MM 형식 또는 'Present' (선택적)
- `techStack`: 최소 1개 이상, 각 항목은 SKILLS의 id와 일치해야 함

---

## 데이터 관계 계약

### Portfolio → Skills (1:N)

PortfolioData는 직접 Skills를 포함하지 않지만, 페이지 레벨에서 조합됩니다:

```typescript
// app/page.tsx
import { PORTFOLIO_DATA } from '@/entities/portfolio';
import { SKILLS } from '@/entities/skill';

export default function Home() {
  // PORTFOLIO_DATA와 SKILLS를 각 위젯에 전달
  return (
    <main>
      <HeroSection data={PORTFOLIO_DATA} />
      <SkillsSection skills={SKILLS} />
    </main>
  );
}
```

### Portfolio → Projects (1:N)

마찬가지로 페이지 레벨에서 조합:

```typescript
import { PROJECTS } from '@/entities/project';

<ProjectsSection projects={PROJECTS} />;
```

### Project → Skills (N:M)

Project의 `techStack` 필드가 Skill의 `id`를 참조:

```typescript
// widgets/projects/ui/ProjectsSection.tsx
const getTechSkills = (techStack: string[]) => {
  return techStack
    .map((techId) => SKILLS.find((skill) => skill.id === techId))
    .filter(Boolean);
};
```

---

## 타입 안전성 보장

### Const Assertions

모든 데이터는 `as const`로 불변성을 보장:

```typescript
export const PORTFOLIO_DATA = {
  name: 'Codeliner',
  // ...
} as const;

// 타입 추론: { readonly name: "Codeliner"; ... }
```

### Zod 검증 (선택적)

런타임에 데이터 무결성 검증:

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

---

## 마이그레이션 계약

현재는 정적 데이터이지만, 향후 CMS 도입 시:

### Phase 1: JSON 내보내기

```typescript
// scripts/export-data.ts
import { PORTFOLIO_DATA, SKILLS, PROJECTS } from '@/entities';
import fs from 'fs';

const data = {
  portfolio: PORTFOLIO_DATA,
  skills: SKILLS,
  projects: PROJECTS,
};

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
```

### Phase 2: API 레이어 추가

```typescript
// entities/portfolio/api/portfolio.api.ts
export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  const res = await fetch('/api/portfolio');
  return res.json();
};
```

Public API 변경 없이 내부 구현만 교체:

```typescript
// entities/portfolio/index.ts
// export { PORTFOLIO_DATA } from './model/portfolio.data'; // 이전
export { fetchPortfolioData } from './api/portfolio.api'; // 새로운
```

---

## 요약

| 엔티티        | 파일 위치                                    | Public Export    | 관계                |
| ------------- | -------------------------------------------- | ---------------- | ------------------- |
| PortfolioData | `entities/portfolio/model/portfolio.data.ts` | `PORTFOLIO_DATA` | -                   |
| Skill         | `entities/skill/model/skills.data.ts`        | `SKILLS`         | ← Project.techStack |
| Project       | `entities/project/model/projects.data.ts`    | `PROJECTS`       | → Skill (N:M)       |

모든 데이터는 **불변**, **타입 안전**, **FSD Public API**를 통해 접근합니다.
