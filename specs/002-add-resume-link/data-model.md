# 데이터 모델

**기능**: 이력서 링크 추가  
**브랜치**: 002-add-resume-link  
**날짜**: 2025-11-17

## 개요

이 문서는 이력서 링크 기능의 데이터 구조를 정의합니다. 백엔드 API나 데이터베이스가 없으므로, 클라이언트 측 설정 객체와 컴포넌트 Props만 다룹니다.

---

## 엔티티

### 1. Site Configuration

**위치**: `shared/config/site.ts`  
**레이어**: Shared (FSD)  
**타입**: Const object with `as const` assertion

#### 스키마

```typescript
export const siteConfig = {
  name: string;           // 개발자 이름
  title: string;          // 사이트 메타 타이틀 (SEO)
  description: string;    // 사이트 설명 (SEO)
  url: string;            // 사이트 기본 URL
  githubUrl: string;      // GitHub 프로필 전체 URL
  resumeUrl?: string;     // [신규] 이력서 URL (선택적)
  keywords: string[];     // SEO 키워드 배열
} as const;
```

#### 필드 상세

| 필드          | 타입       | 필수 | 설명               | 예시                                |
| ------------- | ---------- | ---- | ------------------ | ----------------------------------- |
| `name`        | `string`   | ✅   | 개발자 이름        | `"Woni Kim"`                        |
| `title`       | `string`   | ✅   | 브라우저 탭 제목   | `"Woni Kim \| Front-End Developer"` |
| `description` | `string`   | ✅   | 사이트 메타 설명   | `"프론트엔드 개발자 포트폴리오"`    |
| `url`         | `string`   | ✅   | 사이트 기본 URL    | `"https://codeliners.cc"`           |
| `githubUrl`   | `string`   | ✅   | GitHub 프로필 링크 | `"https://github.com/code1iners"`   |
| `resumeUrl`   | `string?`  | ❌   | 이력서 호스팅 URL  | `"https://drive.google.com/..."`    |
| `keywords`    | `string[]` | ✅   | SEO 키워드         | `["frontend", "react"]`             |

#### 검증 규칙

1. **타입 안정성**: TypeScript strict 모드로 컴파일 시 자동 검증
2. **불변성**: `as const`로 런타임 수정 방지
3. **URL 형식**: 브라우저의 기본 URL 검증에 위임 (명세서 엣지 케이스 정의)
4. **Optional 처리**: `resumeUrl`이 없거나 빈 문자열일 때 UI에서 버튼 미표시

#### 상태 전이

- 없음. 정적 설정 객체이므로 런타임에 상태 변경 없음.

#### 관계

- **사용처**: `widgets/contacts/ui/ContactsSection.tsx`에서 import
- **의존성**: 없음. 다른 엔티티에 의존하지 않음.

---

## 컴포넌트 Props

### 1. Button Component (기존)

**위치**: `shared/ui/Button.tsx`  
**변경사항**: 없음 (기존 컴포넌트 재사용)

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}
```

**이력서 버튼에 사용되는 Props**:

- `size="lg"`: GitHub 버튼과 동일한 크기
- `variant="primary"`: GitHub 버튼과 동일한 스타일

---

### 2. Link Component (Next.js 기본)

**위치**: `next/link`  
**변경사항**: 없음 (Next.js 내장 컴포넌트)

```typescript
interface LinkProps {
  href: string; // 이력서 URL (siteConfig.resumeUrl)
  target?: string; // "_blank" (새 탭)
  rel?: string; // "noopener noreferrer" (보안)
  children: ReactNode; // Button 컴포넌트
  // ... 기타 Next.js Link props
}
```

**이력서 링크에 사용되는 Props**:

- `href={siteConfig.resumeUrl}`: 동적 URL
- `target="_blank"`: 새 탭에서 열기
- `rel="noopener noreferrer"`: 보안 및 프라이버시

---

### 3. ContactsSection Component (수정)

**위치**: `widgets/contacts/ui/ContactsSection.tsx`  
**변경사항**: 버튼 레이아웃 수정, 이력서 버튼 추가

```typescript
// Props 없음 - 서버 컴포넌트에서 직접 사용
export const ContactsSection = () => {
  // siteConfig를 import하여 직접 사용
  const { githubUrl, resumeUrl } = siteConfig;

  // GSAP 애니메이션 ref
  const contentRef = useRef<HTMLDivElement>(null);

  // ...
};
```

**내부 상태**:

- `contentRef`: GSAP 애니메이션 타겟 (기존 유지)

**렌더링 로직**:

```tsx
<div className='flex flex-col md:flex-row gap-4 justify-center'>
  {/* GitHub 버튼 (기존) */}
  <Link href={githubUrl} target='_blank' rel='noopener noreferrer'>
    <Button size='lg' variant='primary'>
      GitHub 프로필 보기
    </Button>
  </Link>

  {/* 이력서 버튼 (신규, 조건부 렌더링) */}
  {resumeUrl && (
    <Link href={resumeUrl} target='_blank' rel='noopener noreferrer'>
      <Button size='lg' variant='primary'>
        이력서 보기
      </Button>
    </Link>
  )}
</div>
```

---

## 타입 정의

### 추론된 타입

TypeScript가 `as const`를 통해 자동으로 추론하는 타입:

```typescript
type SiteConfig = {
  readonly name: 'Woni Kim';
  readonly title: 'Woni Kim | Front-End Developer Portfolio';
  readonly description: string; // 리터럴 타입이 너무 길어 string으로 widening
  readonly url: 'https://codeliners.cc';
  readonly githubUrl: 'https://github.com/code1iners?tab=repositories';
  readonly resumeUrl?: string; // Optional
  readonly keywords: readonly string[];
};
```

### 명시적 타입 (필요 시)

현재 구현에서는 불필요하지만, 향후 확장을 위한 명시적 타입:

```typescript
interface SiteConfigType {
  name: string;
  title: string;
  description: string;
  url: string;
  githubUrl: string;
  resumeUrl?: string;  // Optional
  keywords: string[];
}

// 사용 예시 (현재는 사용하지 않음)
export const siteConfig: SiteConfigType = { ... };
```

---

## 데이터 흐름

```
┌─────────────────────────────────────────────────┐
│  shared/config/site.ts                          │
│  ┌────────────────────────────────────────────┐ │
│  │ export const siteConfig = {                │ │
│  │   githubUrl: "...",                        │ │
│  │   resumeUrl: "...",  // [신규]             │ │
│  │ } as const;                                │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                      ↓ import
┌─────────────────────────────────────────────────┐
│  widgets/contacts/ui/ContactsSection.tsx        │
│  ┌────────────────────────────────────────────┐ │
│  │ import { siteConfig } from '@/shared/...'; │ │
│  │                                            │ │
│  │ <Link href={siteConfig.githubUrl}>        │ │
│  │   <Button>GitHub</Button>                 │ │
│  │ </Link>                                   │ │
│  │                                            │ │
│  │ {siteConfig.resumeUrl && (                │ │
│  │   <Link href={siteConfig.resumeUrl}>      │ │
│  │     <Button>이력서</Button>                │ │
│  │   </Link>                                 │ │
│  │ )}                                        │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                      ↓ render
┌─────────────────────────────────────────────────┐
│  User's Browser                                 │
│  ┌────────────────────────────────────────────┐ │
│  │ [GitHub 프로필 보기]  [이력서 보기]        │ │
│  │      ↓ click               ↓ click         │ │
│  │  New Tab (GitHub)      New Tab (Resume)    │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 엣지 케이스 처리

### 1. resumeUrl이 undefined인 경우

**상황**: siteConfig에서 resumeUrl 속성이 정의되지 않음

```typescript
export const siteConfig = {
  // resumeUrl 없음
} as const;
```

**처리**:

- 조건부 렌더링으로 버튼 미표시
- `{siteConfig.resumeUrl && <ResumeButton />}`
- TypeScript 에러 없음 (optional property)

---

### 2. resumeUrl이 빈 문자열인 경우

**상황**: resumeUrl이 빈 문자열 `""`

```typescript
export const siteConfig = {
  resumeUrl: '', // 빈 문자열
} as const;
```

**처리**:

- JavaScript의 falsy 값이므로 조건부 렌더링에서 false 평가
- 버튼 미표시
- 브라우저 에러 방지

---

### 3. resumeUrl이 유효하지 않은 URL인 경우

**상황**: 잘못된 URL 형식 (예: `"not-a-url"`)

**처리**:

- TypeScript는 string 타입이므로 컴파일 시 에러 없음
- 브라우저의 기본 URL 처리에 위임
- 사용자가 클릭 시 브라우저가 404 또는 에러 페이지 표시
- **명세서 엣지 케이스 정의**: "브라우저의 기본 에러 처리에 위임"

---

### 4. 매우 긴 resumeUrl인 경우

**상황**: 2000자 이상의 URL (예: Google Drive의 긴 공유 링크)

**처리**:

- 버튼 텍스트는 고정 ("이력서 보기")이므로 UI에 영향 없음
- Link 컴포넌트의 href는 길이 제한 없음
- 브라우저의 URL 길이 제한(대부분 2048자)에 위임

---

## 마이그레이션 계획

**해당 없음**: 기존 데이터베이스나 API가 없으므로 마이그레이션 불필요.

**설정 변경 절차**:

1. `shared/config/site.ts` 파일 열기
2. `resumeUrl` 속성 추가 또는 수정
3. 빌드 및 배포 (정적 사이트이므로 재빌드 필요)

---

## 향후 확장 가능성

### 다국어 이력서 지원

```typescript
// Option 1: 다중 URL
export const siteConfig = {
  resumeUrls: {
    ko: 'https://...',
    en: 'https://...',
  },
} as const;

// Option 2: 배열
export const siteConfig = {
  resumes: [
    { lang: 'ko', url: 'https://...' },
    { lang: 'en', url: 'https://...' },
  ],
} as const;
```

### 이력서 버전 관리

```typescript
export const siteConfig = {
  resumeVersions: [
    { date: '2025-11', url: 'https://...' },
    { date: '2025-06', url: 'https://...' },
  ],
  resumeUrl: 'https://...', // 최신 버전 (backward compat)
} as const;
```

### 다운로드 링크 추가

```typescript
export const siteConfig = {
  resumeUrl: 'https://...', // 웹 뷰어 링크
  resumeDownloadUrl: 'https://...', // PDF 직접 다운로드
} as const;
```

---

**문서 작성일**: 2025-11-17  
**다음 단계**: Phase 2 - 구현 태스크 생성 (`/speckit.tasks`)
