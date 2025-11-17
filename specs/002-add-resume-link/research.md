# 연구 및 기술 결정사항

**기능**: 이력서 링크 추가  
**브랜치**: 002-add-resume-link  
**날짜**: 2025-11-17

## 요약

이 문서는 이력서 링크 기능 구현을 위한 기술적 연구 결과와 설계 결정사항을 담고 있습니다. Phase 0 (연구) 단계에서 식별된 모든 "NEEDS CLARIFICATION" 항목에 대한 해결책을 제시합니다.

## 연구 과제 및 결정사항

### 1. 반응형 레이아웃 구현 방법

**연구 질문**: Contact 섹션에서 2개 버튼(GitHub, 이력서)을 모바일과 데스크탑에서 어떻게 배치할 것인가?

**조사 내용**:

- **Tailwind CSS Flexbox**: `flex-col` (모바일) → `md:flex-row` (데스크탑)
- **CSS Grid**: `grid-cols-1` → `md:grid-cols-2`
- **CSS Media Queries**: 수동 브레이크포인트 정의

**결정**: Tailwind CSS Flexbox 사용

**근거**:

1. **일관성**: 프로젝트 전체에서 Tailwind CSS v4 사용 중
2. **간결성**: 2개 버튼 배치에는 Flexbox가 Grid보다 단순
3. **유지보수성**: 인라인 클래스로 즉시 이해 가능
4. **브라우저 호환성**: Flexbox는 모든 주요 브라우저에서 안정적

**참고**: 명세서의 제약사항 (< 768px 모바일, 768-1024px 태블릿, > 1024px 데스크탑)을 Tailwind의 `md` 브레이크포인트(768px)로 충족.

---

### 2. 버튼 간격 및 정렬

**연구 질문**: 두 버튼 사이의 최적 간격은 얼마인가?

**조사 내용**:

- **gap-2 (8px)**: Material Design 최소 간격
- **gap-4 (16px)**: Tailwind 권장 기본값
- **gap-6 (24px)**: 넓은 간격

**참고 자료**:

- [W3C Touch Target Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html): 최소 44x44px
- Tailwind 버튼 크기 (lg): `px-6 py-3` ≈ 최소 44px 높이 충족

**결정**: `gap-4` (16px) 사용

**근거**:

1. **접근성**: 터치 타겟 간 최소 8px 간격 권장 충족
2. **시각적 균형**: 버튼 크기(lg)에 비례하여 적절한 간격
3. **일관성**: 프로젝트의 다른 섹션에서도 gap-4 사용 (SkillsSection, ProjectsSection)
4. **반응형**: 모바일 세로 스택에서도 충분한 간격 제공

---

### 3. 이력서 URL 처리 전략

**연구 질문**: resumeUrl이 없거나 빈 문자열일 때 어떻게 처리할 것인가?

**조사 내용**:

- **조건부 렌더링**: resumeUrl이 truthy일 때만 버튼 렌더링
- **비활성화 버튼**: disabled 속성으로 버튼 표시하되 클릭 불가
- **기본 URL**: placeholder URL로 fallback

**TypeScript 타입 정의**:

```typescript
// Option 1: Optional property
resumeUrl?: string;  // undefined 가능

// Option 2: Required property
resumeUrl: string;   // 항상 존재

// Option 3: Nullable
resumeUrl: string | null;  // 명시적 null
```

**결정**: Optional property + 조건부 렌더링

**근거**:

1. **사용자 경험**: 클릭할 수 없는 버튼을 보여주지 않음 (혼란 방지)
2. **타입 안정성**: TypeScript optional property로 명시적 처리
3. **명세서 준수**: "이력서 버튼이 표시되지 않거나 비활성화 상태로 표시" 중 "표시되지 않음" 선택
4. **간결성**: 조건부 렌더링이 disabled 처리보다 간단

**구현**:

```tsx
{
  siteConfig.resumeUrl && (
    <Link href={siteConfig.resumeUrl} target='_blank' rel='noopener noreferrer'>
      <Button size='lg' variant='primary'>
        이력서 보기
      </Button>
    </Link>
  );
}
```

---

### 4. 보안 및 SEO 속성

**연구 질문**: 외부 링크를 새 탭에서 열 때 어떤 보안 속성이 필요한가?

**조사 내용**:

- **target="\_blank"**: 새 탭/창에서 열기
- **rel="noopener"**: `window.opener` 접근 방지 (보안)
- **rel="noreferrer"**: Referer 헤더 전송 방지 (프라이버시)
- **rel="nofollow"**: 검색 엔진에 링크 추적하지 말 것 권장 (SEO)

**보안 이슈**:

- [Tabnabbing 공격](https://owasp.org/www-community/attacks/Reverse_Tabnabbing): 새 탭에서 열린 페이지가 원본 페이지를 조작할 수 있음
- 해결책: `rel="noopener noreferrer"` 사용

**Next.js 기본 동작**:

- Next.js Link 컴포넌트는 `target="_blank"`일 때 자동으로 `rel="noopener"` 추가
- 명시적으로 작성하는 것이 명확성과 유지보수에 유리

**결정**: `target="_blank" rel="noopener noreferrer"` 사용

**근거**:

1. **보안**: Tabnabbing 공격 방지 (noopener)
2. **프라이버시**: 이력서 호스팅 서비스에 Referer 전송 방지 (noreferrer)
3. **명세서 준수**: FR-003 요구사항 충족
4. **명시성**: Next.js의 자동 추가에 의존하지 않고 명시적으로 작성

**참고**: `rel="nofollow"`는 사용하지 않음 (본인의 이력서이므로 SEO에 부정적 영향 없음)

---

### 5. GSAP 애니메이션 통합

**연구 질문**: 새로운 버튼을 기존 GSAP 애니메이션에 어떻게 통합할 것인가?

**기존 구현 분석**:

```tsx
// ContactsSection.tsx 기존 코드
const contentRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  gsap.from(contentRef.current, {
    scrollTrigger: {
      trigger: contentRef.current,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });
});
```

**옵션**:

1. **기존 애니메이션 유지**: contentRef가 전체 div를 감싸므로 새 버튼도 자동 포함
2. **버튼별 개별 애니메이션**: 각 버튼에 ref와 stagger 효과 추가
3. **애니메이션 제거**: 단순 CSS transition만 사용

**결정**: 기존 애니메이션 유지 (옵션 1)

**근거**:

1. **일관성**: 다른 섹션과 동일한 스크롤 애니메이션 패턴
2. **단순성**: 추가 코드 불필요 (contentRef가 이미 전체 영역 포함)
3. **성능**: 개별 애니메이션보다 단일 애니메이션이 효율적
4. **사용자 경험**: 제목, 텍스트, 버튼이 함께 나타나는 것이 자연스러움

**검증**:

- contentRef가 감싸는 div 내부에 버튼 추가
- 새 버튼도 자동으로 fade-in + slide-up 효과 적용됨

---

### 6. 중앙 설정 파일 구조

**연구 질문**: siteConfig 타입 정의를 어떻게 확장할 것인가?

**기존 구조**:

```typescript
export const siteConfig = {
  name: 'Woni Kim',
  title: 'Woni Kim | Front-End Developer Portfolio',
  description: '...',
  url: 'https://codeliners.cc',
  githubUrl: 'https://github.com/code1iners?tab=repositories',
  keywords: [...],
} as const;
```

**타입 추론**:

- `as const`: siteConfig의 모든 속성이 literal type으로 추론
- 장점: 불변성 보장, 자동 완성 지원
- 단점: optional property 추가 시 타입 체계 복잡도 증가

**옵션**:

1. **as const 유지 + optional property**: `resumeUrl?: string`
2. **명시적 인터페이스 정의**: `interface SiteConfig { ... }`
3. **환경 변수 사용**: `process.env.NEXT_PUBLIC_RESUME_URL`

**결정**: as const 유지 + optional property (옵션 1)

**근거**:

1. **일관성**: 기존 패턴 유지
2. **타입 안정성**: TypeScript가 자동으로 타입 추론
3. **간결성**: 별도 인터페이스 정의 불필요
4. **유연성**: resumeUrl 없이도 빌드 가능

**구현**:

```typescript
export const siteConfig = {
  name: 'Woni Kim',
  title: 'Woni Kim | Front-End Developer Portfolio',
  description: '...',
  url: 'https://codeliners.cc',
  githubUrl: 'https://github.com/code1iners?tab=repositories',
  resumeUrl: 'https://example.com/resume.pdf', // [신규] Optional in practice
  keywords: [...],
} as const;
```

**참고**: 실제 사용 시 resumeUrl을 주석 처리하거나 제거해도 TypeScript 에러 발생하지 않음 (조건부 렌더링으로 처리)

---

## 베스트 프랙티스

### Next.js Link 컴포넌트 사용

**권장사항**: `<a>` 태그 대신 Next.js `Link` 컴포넌트 사용

**이유**:

1. **최적화**: Next.js가 자동으로 prefetch 및 최적화
2. **일관성**: 프로젝트 전체에서 Link 사용 중
3. **타입 안정성**: TypeScript 타입 지원

**예외**: 외부 링크는 prefetch 비활성화 불필요 (target="\_blank"이므로)

### Tailwind 반응형 패턴

**권장사항**: Mobile-first 접근법

```tsx
// Good: 모바일 기본 → 데스크탑 오버라이드
<div className="flex flex-col md:flex-row gap-4">

// Bad: 데스크탑 기본 → 모바일 오버라이드
<div className="flex flex-row md:flex-col gap-4">
```

### 조건부 렌더링 패턴

**권장사항**: 짧은 조건부 렌더링은 `&&` 사용

```tsx
// Good: 간결하고 명확
{
  siteConfig.resumeUrl && <ResumeButton />;
}

// Avoid: 불필요하게 장황함
{
  siteConfig.resumeUrl ? <ResumeButton /> : null;
}
```

---

## 기술 스택 확인

### 사용 기술

| 기술         | 버전   | 용도                    |
| ------------ | ------ | ----------------------- |
| React        | 19.2.0 | UI 라이브러리           |
| Next.js      | 16.0.1 | 프레임워크 (App Router) |
| TypeScript   | 5.x    | 타입 안정성             |
| Tailwind CSS | v4     | 스타일링                |
| GSAP         | 3.13.0 | 애니메이션              |
| @gsap/react  | 2.1.2  | React 통합              |

### 브라우저 호환성

**대상 브라우저** (명세서 SC-002):

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

**사용 기능 호환성**:

- Flexbox: 모든 브라우저 지원 ✅
- CSS gap property: 모든 주요 브라우저 지원 (IE 제외) ✅
- target="\_blank": 모든 브라우저 지원 ✅
- GSAP ScrollTrigger: 모든 주요 브라우저 지원 ✅

---

## 미해결 질문 (없음)

모든 NEEDS CLARIFICATION 항목이 해결되었습니다. 구현 준비 완료.

---

**연구 완료일**: 2025-11-17  
**다음 단계**: Phase 1 - 데이터 모델 및 계약 정의 (완료)
