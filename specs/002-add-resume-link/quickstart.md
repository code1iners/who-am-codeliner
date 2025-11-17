# Quickstart Guide

**기능**: 이력서 링크 추가  
**브랜치**: 002-add-resume-link  
**예상 소요 시간**: 15-20분

## 시작하기 전에

### 필수 조건

- [x] Git 설치됨
- [x] Node.js 20.x 이상
- [x] pnpm 설치됨
- [x] 이력서가 외부 서비스에 호스팅되어 있음 (예: Google Drive, Notion, PDF 호스팅)

### 이력서 URL 준비

다음 중 하나의 방법으로 이력서 URL을 준비하세요:

1. **Google Drive**:

   - 파일 업로드 → 공유 → "링크가 있는 모든 사용자" → 링크 복사
   - 예시: `https://drive.google.com/file/d/[FILE_ID]/view`

2. **Notion**:

   - 페이지 공개 → "웹에 게시" → 링크 복사
   - 예시: `https://notion.so/[PAGE_ID]`

3. **PDF 호스팅 서비스**:
   - 파일 업로드 → 공개 링크 생성
   - 예시: `https://your-cdn.com/resume.pdf`

---

## 빠른 설정 (5분)

### 1. 브랜치 전환

```bash
cd /home/codeliner/dev/who-am-codeliner
git checkout 002-add-resume-link
```

### 2. 개발 서버 시작

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 열림.

### 3. Contact 섹션으로 이동

페이지를 아래로 스크롤하여 "Let's Connect" 섹션 확인.  
현재는 GitHub 버튼만 표시됨.

---

## 구현 단계

### Step 1: 이력서 URL 추가 (2분)

**파일**: `shared/config/site.ts`

```typescript
export const siteConfig = {
  name: 'Woni Kim',
  title: 'Woni Kim | Front-End Developer Portfolio',
  description: '...',
  url: 'https://codeliners.cc',
  githubUrl: 'https://github.com/code1iners?tab=repositories',

  // [추가] 이력서 URL
  resumeUrl: 'https://example.com/resume.pdf',  // 👈 실제 URL로 변경

  keywords: [...],
} as const;
```

**변경사항**:

- `resumeUrl` 속성 추가
- 자신의 이력서 URL로 교체

**저장 후**: 브라우저가 자동으로 새로고침됨 (Next.js Fast Refresh).

---

### Step 2: Contact 섹션 수정 (10분)

**파일**: `widgets/contacts/ui/ContactsSection.tsx`

#### 2-1. 버튼 컨테이너 수정

**기존 코드** (1개 버튼):

```tsx
<Link href={siteConfig.githubUrl} target='_blank' rel='noopener noreferrer'>
  <Button size='lg' variant='primary'>
    GitHub 프로필 보기
  </Button>
</Link>
```

**새 코드** (2개 버튼, 반응형):

```tsx
<div className='flex flex-col md:flex-row gap-4 justify-center'>
  <Link href={siteConfig.githubUrl} target='_blank' rel='noopener noreferrer'>
    <Button size='lg' variant='primary'>
      GitHub 프로필 보기
    </Button>
  </Link>

  {siteConfig.resumeUrl && (
    <Link href={siteConfig.resumeUrl} target='_blank' rel='noopener noreferrer'>
      <Button size='lg' variant='primary'>
        이력서 보기
      </Button>
    </Link>
  )}
</div>
```

**변경 내용**:

1. 버튼을 감싸는 `<div>` 추가
2. Flexbox 클래스 추가:
   - `flex flex-col`: 기본 세로 정렬 (모바일)
   - `md:flex-row`: 768px 이상에서 가로 정렬 (데스크탑)
   - `gap-4`: 버튼 간 16px 간격
   - `justify-center`: 중앙 정렬
3. 이력서 버튼 추가 (조건부 렌더링)

---

### Step 3: 즉시 확인 (3분)

1. **저장**: ContactsSection.tsx 저장 → 브라우저 자동 새로고침

2. **데스크탑 뷰 확인**:

   - Contact 섹션으로 스크롤
   - 2개 버튼이 가로로 나란히 표시되는지 확인
   - 간격이 적절한지 확인

3. **모바일 뷰 확인**:

   - Chrome DevTools 열기 (F12 또는 Cmd+Opt+I)
   - Toggle device toolbar (Cmd+Shift+M)
   - iPhone SE 선택 (375px)
   - 2개 버튼이 세로로 스택되는지 확인

4. **버튼 클릭 테스트**:
   - "이력서 보기" 버튼 클릭
   - 새 탭에서 이력서 페이지가 열리는지 확인

---

## 테스트 체크리스트

### 기능 테스트

- [ ] 데스크탑(> 768px)에서 버튼이 가로로 배치됨
- [ ] 모바일(< 768px)에서 버튼이 세로로 스택됨
- [ ] 이력서 버튼 클릭 시 새 탭에서 열림
- [ ] GitHub 버튼 기능이 여전히 작동함
- [ ] 버튼 스타일이 일관됨 (크기, 색상, 호버 효과)

### 반응형 테스트

브라우저 너비를 조절하여 확인:

- [ ] 375px (iPhone SE): 세로 스택
- [ ] 768px: 가로 배치로 전환되는 시점
- [ ] 1024px (태블릿): 가로 배치 유지
- [ ] 1920px (데스크탑): 가로 배치 유지

### 브라우저 테스트

- [ ] Chrome: 버튼 작동 및 새 탭 열림
- [ ] Firefox: 버튼 작동 및 새 탭 열림
- [ ] Safari: 버튼 작동 및 새 탭 열림
- [ ] Edge: 버튼 작동 및 새 탭 열림

### 애니메이션 테스트

- [ ] Contact 섹션으로 스크롤 시 fade-in 애니메이션 작동
- [ ] 2개 버튼이 함께 애니메이션됨
- [ ] 애니메이션이 부드럽고 자연스러움

### 다크 모드 테스트

- [ ] 라이트 모드: 버튼 가독성 확인
- [ ] 다크 모드: 버튼 가독성 확인
- [ ] 다크 모드 전환 시 버튼 스타일 변화 확인

---

## 엣지 케이스 테스트

### 1. resumeUrl 없이 테스트

**목적**: resumeUrl이 없을 때 이력서 버튼이 표시되지 않는지 확인

```typescript
// site.ts에서 resumeUrl 주석 처리
export const siteConfig = {
  // resumeUrl: 'https://...',  // 주석 처리
} as const;
```

**예상 결과**: GitHub 버튼만 표시됨 (이력서 버튼 없음)

**복원**: 주석 해제하여 원래대로 복원

---

### 2. 매우 긴 URL 테스트

**목적**: 긴 URL이 UI를 깨뜨리지 않는지 확인

```typescript
resumeUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0/view?usp=sharing',
```

**예상 결과**: 버튼 크기는 변하지 않음 (텍스트가 고정)

---

### 3. 잘못된 URL 테스트

**목적**: 유효하지 않은 URL 처리 확인

```typescript
resumeUrl: 'not-a-valid-url',
```

**예상 결과**:

- 버튼은 표시됨
- 클릭 시 브라우저가 에러 페이지 표시 (예상된 동작)

---

## 문제 해결

### 버튼이 나타나지 않음

**원인**: resumeUrl이 설정되지 않았거나 조건부 렌더링 누락

**해결**:

1. `site.ts`에서 `resumeUrl` 확인
2. `ContactsSection.tsx`에서 `{siteConfig.resumeUrl && ...}` 확인

---

### 버튼이 가로로 배치되지 않음

**원인**: Tailwind 클래스 누락 또는 오타

**해결**:

```tsx
// 올바른 클래스
className = 'flex flex-col md:flex-row gap-4';

// 흔한 실수
className = 'flex-col md:flex-row'; // ❌ 'flex' 누락
className = 'flex flex-col flex-row'; // ❌ 'md:' 누락
```

---

### 새 탭에서 열리지 않음

**원인**: `target="_blank"` 누락

**해결**:

```tsx
<Link
  href={siteConfig.resumeUrl}
  target='_blank'          // ✅ 필수
  rel='noopener noreferrer'  // ✅ 보안
>
```

---

### 애니메이션이 작동하지 않음

**원인**: contentRef 범위 밖에 버튼 추가

**해결**: 버튼이 `ref={contentRef}` div 내부에 있는지 확인

```tsx
<div ref={contentRef} className='mx-auto max-w-2xl text-center'>
  <h2>...</h2>
  <p>...</p>
  {/* 버튼들이 여기 있어야 함 ✅ */}
  <div className='flex flex-col md:flex-row gap-4'>
    <Link>...</Link>
    {siteConfig.resumeUrl && <Link>...</Link>}
  </div>
</div>
```

---

### TypeScript 에러

**에러**: `Property 'resumeUrl' does not exist on type...`

**원인**: site.ts에 resumeUrl이 정의되지 않음

**해결**: `as const` 이전에 resumeUrl 추가

```typescript
export const siteConfig = {
  // ...
  resumeUrl: 'https://...',
} as const; // 'as const' 위치 확인
```

---

## 개발 팁

### 1. Hot Reload 활용

- 파일 저장 시 자동 새로고침
- TypeScript 에러는 브라우저 콘솔 확인
- ESLint 경고는 VS Code에서 확인

### 2. Chrome DevTools 활용

- **Elements 탭**: Tailwind 클래스 적용 확인
- **Console 탭**: JavaScript 에러 확인
- **Network 탭**: 이력서 URL 요청 확인
- **Device Toolbar**: 반응형 테스트

### 3. TypeScript 타입 체크

```bash
pnpm tsc --noEmit
```

컴파일 에러 없이 통과해야 함.

### 4. GSAP 디버깅

브라우저 콘솔에서:

```javascript
// 모든 ScrollTrigger 확인
ScrollTrigger.getAll();

// Contact 섹션 트리거만 확인
ScrollTrigger.getAll().filter((t) => t.trigger.id === 'contact');
```

---

## 커밋 및 푸시

### 1. 변경사항 확인

```bash
git status
```

**예상 출력**:

```
On branch 002-add-resume-link
Changes not staged for commit:
  modified:   shared/config/site.ts
  modified:   widgets/contacts/ui/ContactsSection.tsx
```

### 2. 스테이징

```bash
git add shared/config/site.ts widgets/contacts/ui/ContactsSection.tsx
```

### 3. 커밋

```bash
git commit -m "feat(widgets/contacts): add resume link alongside GitHub link

- Add resumeUrl to siteConfig (shared/config/site.ts)
- Add resume button in ContactsSection with responsive layout
- Implement flex-col (mobile) to flex-row (desktop) layout
- Add conditional rendering for resumeUrl
- Maintain consistent button styling with GitHub button
- Keep existing GSAP scroll animations

Closes #002"
```

### 4. 푸시

```bash
git push -u origin 002-add-resume-link
```

---

## 다음 단계

1. **Pull Request 생성**:

   - GitHub에서 `002-add-resume-link` → `main` PR 생성
   - 명세서의 인수 시나리오 체크리스트 추가
   - 스크린샷 첨부 (데스크탑/모바일 뷰)

2. **리뷰 요청**:

   - FSD 아키텍처 준수 확인
   - TypeScript 타입 안정성 확인
   - 반응형 디자인 확인

3. **병합 후**:
   - `main` 브랜치로 병합
   - 프로덕션 배포
   - 실제 이력서 URL로 업데이트

---

## 추가 리소스

### 문서

- [Feature Spec](./spec.md): 기능 명세서
- [Implementation Plan](./plan.md): 구현 계획
- [Research](./research.md): 기술 연구
- [Data Model](./data-model.md): 데이터 구조

### 참고 자료

- [Tailwind Flexbox](https://tailwindcss.com/docs/flex)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Next.js Link](https://nextjs.org/docs/app/api-reference/components/link)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

**작성일**: 2025-11-17  
**예상 완료 시간**: 15-20분  
**다음 명령어**: `/speckit.tasks` (세부 태스크 생성)
