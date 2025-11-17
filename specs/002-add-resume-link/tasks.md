# 태스크: 이력서 링크 추가

**입력**: `/specs/002-add-resume-link/`의 설계 문서  
**브랜치**: `002-add-resume-link`  
**생성일**: 2025-11-17

**선행조건**:

- ✅ plan.md (완료)
- ✅ spec.md (완료)
- ✅ research.md (완료)
- ✅ data-model.md (완료)
- ✅ quickstart.md (완료)

**테스트**: 이 기능은 자동화된 테스트를 요구하지 않습니다. 수동 인수 테스트만 수행합니다.

**구성**: 태스크는 2개의 사용자 스토리(US1: Contact 섹션 UI, US2: 설정 관리)로 구성되어 있으며, 각 스토리는 독립적으로 구현 및 테스트 가능합니다.

## 형식: `[ID] [P?] [Story] 설명`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 이 태스크가 속한 사용자 스토리 (US1, US2)
- 설명에 정확한 파일 경로 포함

---

## Phase 1: 설정 (0개 태스크)

**목적**: 프로젝트 초기화 및 FSD 구조

**상태**: ✅ 이미 완료됨

이 기능은 기존 프로젝트에 추가되므로 새로운 설정 태스크가 필요하지 않습니다.

- Next.js 16.0.1, React 19.2.0, TypeScript 5.x 이미 설정됨
- Tailwind CSS v4, GSAP 3.13.0 이미 설치됨
- FSD 아키텍처 (shared/, widgets/, entities/) 이미 구성됨

---

## Phase 2: 기반 (0개 태스크)

**목적**: 모든 사용자 스토리 구현 전에 완료되어야 하는 핵심 인프라

**상태**: ✅ 이미 완료됨

기존 인프라를 재사용하므로 새로운 기반 태스크가 필요하지 않습니다:

- ✅ Button 컴포넌트 (`shared/ui/Button.tsx`) 이미 존재
- ✅ Section 컴포넌트 (`shared/ui/Section.tsx`) 이미 존재
- ✅ Next.js Link 컴포넌트 사용 가능
- ✅ Site config 파일 (`shared/config/site.ts`) 이미 존재
- ✅ ContactsSection 위젯 이미 구현됨

**체크포인트**: 기반 준비 완료 ✅ - 즉시 기능 구현 시작 가능

---

## Phase 3: 사용자 스토리 1 - Contact 섹션에 이력서 링크 추가 (우선순위: P1) 🎯 MVP

**목표**: Contact 섹션에서 GitHub 프로필 링크와 함께 이력서 링크를 표시하고, 반응형 레이아웃으로 구현

**독립 테스트**:

1. Contact 섹션으로 스크롤하여 2개 버튼(GitHub, 이력서)이 표시되는지 확인
2. 데스크탑(> 768px)에서 버튼이 가로로 배치되는지 확인
3. 모바일(< 768px)에서 버튼이 세로로 스택되는지 확인
4. 이력서 버튼 클릭 시 새 탭에서 열리는지 확인

### 사용자 스토리 1 구현

**Shared 레이어 (설정)**:

- [x] T001 [P] [US1] `shared/config/site.ts`에 resumeUrl 속성 추가
  - `resumeUrl` 속성을 optional로 추가 (예: `resumeUrl: 'https://example.com/resume.pdf'`)
  - `as const` assertion 유지
  - TypeScript 타입 추론 확인
  - **파일**: `shared/config/site.ts`

**Widget 레이어 (UI)**:

- [x] T002 [US1] `widgets/contacts/ui/ContactsSection.tsx`에 버튼 컨테이너를 flex 레이아웃으로 변경

  - 기존 단일 Link를 감싸는 `<div>` 추가
  - Flexbox 클래스 적용: `flex flex-col md:flex-row gap-4 justify-center`
  - contentRef 범위 내에 유지 (GSAP 애니메이션용)
  - **파일**: `widgets/contacts/ui/ContactsSection.tsx`

- [x] T003 [US1] `widgets/contacts/ui/ContactsSection.tsx`에 이력서 버튼 추가
  - siteConfig에서 resumeUrl import
  - 조건부 렌더링: `{siteConfig.resumeUrl && <Link>...</Link>}`
  - Link 속성: `href={siteConfig.resumeUrl}`, `target="_blank"`, `rel="noopener noreferrer"`
  - Button 속성: `size="lg"`, `variant="primary"` (GitHub 버튼과 동일)
  - 버튼 텍스트: "이력서 보기"
  - **파일**: `widgets/contacts/ui/ContactsSection.tsx`

**검증**:

- [x] T004 [US1] TypeScript 타입 체크 통과 확인

  - `pnpm tsc --noEmit` 실행
  - 컴파일 에러 없이 통과해야 함
  - optional property 처리 확인

- [x] T005 [US1] ESLint 검사 통과 확인

  - `pnpm lint` 실행
  - 에러 및 경고 없이 통과해야 함

- [x] T006 [US1] FSD 아키텍처 준수 확인
  - widgets → shared 방향 import 확인 (상위→하위)
  - 하위→상위 import 없는지 확인
  - 순환 의존성 없는지 확인

**수동 테스트**:

- [ ] T007 [US1] 데스크탑 뷰에서 버튼 레이아웃 확인

  - `pnpm dev` 실행하여 개발 서버 시작
  - http://localhost:3000 접속
  - Contact 섹션으로 스크롤
  - 브라우저 너비 > 768px로 설정
  - GitHub 버튼과 이력서 버튼이 가로로 나란히 배치되는지 확인
  - 버튼 간격이 적절한지 확인 (gap-4 = 16px)

- [ ] T008 [US1] 모바일 뷰에서 버튼 레이아웃 확인

  - Chrome DevTools 열기 (F12)
  - Toggle device toolbar (Cmd+Shift+M 또는 Ctrl+Shift+M)
  - iPhone SE (375px) 선택
  - GitHub 버튼과 이력서 버튼이 세로로 스택되는지 확인
  - 버튼 간격이 적절한지 확인

- [ ] T009 [US1] 태블릿 뷰에서 버튼 레이아웃 확인

  - DevTools에서 iPad (768px) 선택
  - 768px 브레이크포인트에서 세로→가로 전환 확인

- [ ] T010 [US1] 이력서 버튼 클릭 동작 확인

  - 이력서 버튼 클릭
  - 새 탭에서 이력서 페이지가 열리는지 확인
  - 원본 탭은 변경되지 않아야 함

- [ ] T011 [US1] 보안 속성 확인

  - DevTools → Elements 탭
  - 이력서 Link 요소 검사
  - `target="_blank"` 속성 확인
  - `rel="noopener noreferrer"` 속성 확인

- [ ] T012 [US1] 다크 모드에서 버튼 스타일 확인

  - 시스템 설정을 다크 모드로 변경 또는
  - DevTools → Rendering → Emulate CSS prefers-color-scheme: dark
  - 버튼이 다크 모드에서 가독성 있게 표시되는지 확인

- [ ] T013 [US1] GSAP 애니메이션 작동 확인

  - 페이지 맨 위로 스크롤
  - Contact 섹션으로 천천히 스크롤
  - fade-in + slide-up 애니메이션이 작동하는지 확인
  - 두 버튼이 함께 애니메이션되는지 확인

- [ ] T014 [US1] 브라우저 호환성 테스트
  - Chrome: 버튼 표시 및 클릭 확인
  - Firefox: 버튼 표시 및 클릭 확인
  - Safari: 버튼 표시 및 클릭 확인 (가능한 경우)
  - Edge: 버튼 표시 및 클릭 확인 (가능한 경우)

**체크포인트**: 이 시점에서 사용자 스토리 1은 완전히 작동하고 독립적으로 테스트 가능해야 함 ✅

---

## Phase 4: 사용자 스토리 2 - 이력서 링크 설정 관리 (우선순위: P2)

**목표**: 개발자가 이력서 URL을 중앙 설정 파일에서 쉽게 관리하고 업데이트할 수 있도록 함

**독립 테스트**:

1. `shared/config/site.ts`에서 resumeUrl 값 변경
2. 개발 서버에서 자동 새로고침 확인
3. Contact 섹션에서 새 URL이 적용되는지 확인

### 사용자 스토리 2 구현

**문서화**:

- [ ] T015 [P] [US2] `shared/config/site.ts`에 resumeUrl 주석 추가

  - resumeUrl 속성 위에 JSDoc 주석 추가
  - 설명: "외부 호스팅된 이력서 페이지의 전체 URL (예: Google Drive, Notion, PDF 호스팅)"
  - 예시 URL 형식 포함
  - **파일**: `shared/config/site.ts`

- [ ] T016 [P] [US2] README.md에 이력서 URL 설정 방법 추가
  - "Configuration" 또는 "Customization" 섹션에 추가
  - resumeUrl 변경 방법 설명
  - 예시 코드 스니펫 포함
  - **파일**: `README.md`

**검증**:

- [ ] T017 [US2] resumeUrl 변경 시 핫 리로드 확인
  - 개발 서버 실행 상태에서
  - `shared/config/site.ts`의 resumeUrl 값 변경
  - 브라우저가 자동으로 새로고침되는지 확인
  - Contact 섹션에서 새 URL 반영되는지 확인

**수동 테스트**:

- [ ] T018 [US2] resumeUrl을 다른 URL로 변경 테스트

  - resumeUrl을 테스트 URL로 변경 (예: `https://example.com/test-resume`)
  - 브라우저에서 이력서 버튼 클릭
  - 새 URL로 이동하는지 확인
  - 원래 URL로 복원

- [ ] T019 [US2] resumeUrl 제거 시 버튼 미표시 확인

  - resumeUrl 속성을 주석 처리하거나 제거
  - 브라우저 새로고침
  - 이력서 버튼이 렌더링되지 않는지 확인
  - GitHub 버튼만 표시되어야 함
  - resumeUrl 복원

- [ ] T020 [US2] resumeUrl을 빈 문자열로 설정 시 버튼 미표시 확인

  - resumeUrl을 `""` (빈 문자열)로 설정
  - 브라우저 새로고침
  - 이력서 버튼이 렌더링되지 않는지 확인
  - resumeUrl을 유효한 값으로 복원

- [ ] T021 [US2] 매우 긴 URL 처리 확인
  - resumeUrl을 매우 긴 URL로 설정 (예: Google Drive 공유 링크)
  - 버튼 레이아웃이 깨지지 않는지 확인
  - 버튼 텍스트는 고정되어 있으므로 UI 영향 없어야 함

**체크포인트**: 이 시점에서 사용자 스토리 1과 2가 모두 독립적으로 작동해야 함 ✅

---

## Phase 5: 마무리 및 횡단 관심사

**목적**: 코드 품질, 문서화, 최종 검증

- [ ] T022 [P] 코드 정리 및 포맷팅

  - 불필요한 주석 제거
  - 코드 스타일 일관성 확인
  - 들여쓰기 및 공백 정리

- [ ] T023 [P] Git 커밋 메시지 작성

  - Conventional Commits 형식 사용
  - 형식: `feat(widgets/contacts): add resume link alongside GitHub link`
  - 본문에 변경 사항 상세 설명
  - Closes #002 추가

- [ ] T024 변경사항 커밋 및 푸시

  - `git add shared/config/site.ts widgets/contacts/ui/ContactsSection.tsx`
  - `git commit -m "feat(widgets/contacts): add resume link alongside GitHub link..."`
  - `git push -u origin 002-add-resume-link`

- [ ] T025 quickstart.md의 모든 체크리스트 검증

  - quickstart.md 열기
  - "구현 체크리스트" 섹션 확인
  - 모든 항목이 완료되었는지 검증
  - "인수 테스트 시나리오" 실행

- [ ] T026 최종 통합 테스트

  - 프로덕션 빌드 생성: `pnpm build`
  - 빌드 에러 없이 성공하는지 확인
  - 빌드된 사이트 실행: `pnpm start`
  - http://localhost:3000에서 기능 확인

- [ ] T027 Pull Request 생성 준비
  - GitHub에서 브랜치 확인
  - PR 설명 초안 작성:
    - 명세서 링크 포함
    - 스크린샷 첨부 (데스크탑/모바일 뷰)
    - 인수 시나리오 체크리스트 포함
  - 리뷰어 지정 (필요시)

---

## 의존성 및 실행 순서

### Phase 의존성

```
Phase 1 (설정) ✅ 완료
    ↓
Phase 2 (기반) ✅ 완료
    ↓
Phase 3 (US1: UI 구현) ← 시작 지점
    ↓
Phase 4 (US2: 설정 관리) ← US1과 병렬 가능하지만 순차 권장
    ↓
Phase 5 (마무리)
```

### 사용자 스토리 의존성

- **US1 (Contact 섹션 UI)**: 기반 완료 후 즉시 시작 가능 - 독립적
- **US2 (설정 관리)**: US1이 resumeUrl을 사용하므로 US1 완료 후 권장
  - 기술적으로는 병렬 가능 (다른 파일)
  - 실무적으로는 순차 권장 (US1 검증 후 US2 문서화)

### 각 사용자 스토리 내에서

**US1 실행 순서**:

1. T001: resumeUrl 추가 (Shared 레이어)
2. T002-T003: ContactsSection 수정 (Widget 레이어)
3. T004-T006: 검증 (TypeScript, ESLint, FSD)
4. T007-T014: 수동 테스트 (병렬 가능)

**US2 실행 순서**:

1. T015-T016: 문서화 (병렬 가능)
2. T017: 핫 리로드 검증
3. T018-T021: 엣지 케이스 테스트

### 병렬 처리 기회

**Phase 3 (US1) 내에서**:

```bash
# 검증 태스크 병렬 실행 가능:
T004: TypeScript 체크
T005: ESLint 체크
T006: FSD 검증

# 수동 테스트 병렬 실행 가능 (다른 브라우저):
T007-T011: 레이아웃 및 기능 테스트
T012-T013: 스타일 및 애니메이션 테스트
T014: 브라우저 호환성 테스트
```

**Phase 4 (US2) 내에서**:

```bash
# 문서화 태스크 병렬 실행 가능:
T015: site.ts 주석 추가
T016: README.md 업데이트
```

**Phase 5 (마무리) 내에서**:

```bash
# 정리 태스크 병렬 실행 가능:
T022: 코드 정리
T023: 커밋 메시지 작성 (draft)
```

---

## 병렬 처리 예시

### 사용자 스토리 1 (혼자 작업하는 경우)

```bash
# Step 1: 구현 (순차)
T001 → T002 → T003

# Step 2: 검증 (병렬 가능하지만 순차 권장)
T004 (TypeScript) → T005 (ESLint) → T006 (FSD)

# Step 3: 수동 테스트 (순차 또는 병렬)
T007-T014를 테스트 체크리스트로 사용
```

### 2명이 작업하는 경우 (팀 전략)

```bash
# 개발자 A: US1 구현 및 검증
T001 → T002 → T003 → T004 → T005 → T006

# 개발자 B: US1 구현 완료 후 테스트
T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014

# 동시에 개발자 A: US2 시작
T015 || T016 → T017 → T018 → T019 → T020 → T021
```

---

## 구현 전략

### MVP 우선 (사용자 스토리 1만)

이 기능은 매우 간단하므로 US1만으로도 완전한 MVP입니다:

1. ✅ Phase 1-2: 이미 완료됨
2. Phase 3 완료: US1 (Contact 섹션 UI)
3. **중지 및 검증**: T007-T014 수동 테스트 실행
4. 준비되면 배포/데모 가능

**배포 가능 시점**: Phase 3 완료 후 (US2 없이도 기능 작동)

### 완전한 기능 (US1 + US2)

더 나은 유지보수성을 위해 US2까지 완료 권장:

1. Phase 3 완료: US1
2. Phase 4 완료: US2 (문서화 및 엣지 케이스 테스트)
3. Phase 5 완료: 마무리
4. PR 생성 및 병합

**권장 배포 시점**: Phase 5 완료 후 (모든 문서화 포함)

### 점진적 전달

1. **체크포인트 1**: T006 완료 → 기본 구현 완료, 로컬 개발 서버에서 확인 가능
2. **체크포인트 2**: T014 완료 → US1 완전히 작동, 수동 테스트 통과
3. **체크포인트 3**: T021 완료 → US2 완료, 모든 엣지 케이스 검증
4. **체크포인트 4**: T027 완료 → 배포 준비 완료

---

## 예상 소요 시간

| Phase            | 태스크 수 | 예상 시간   | 비고                        |
| ---------------- | --------- | ----------- | --------------------------- |
| Phase 1          | 0         | 0분         | 이미 완료                   |
| Phase 2          | 0         | 0분         | 이미 완료                   |
| Phase 3 (US1)    | 14        | 30-45분     | 구현 10분 + 테스트 20-35분  |
| Phase 4 (US2)    | 7         | 15-20분     | 문서화 10분 + 테스트 5-10분 |
| Phase 5 (마무리) | 6         | 10-15분     | 정리 및 PR 준비             |
| **총계**         | **27**    | **55-80분** | quickstart.md 예상과 일치   |

**실제 소요 시간**: 개발자 경험에 따라 45-90분 범위 예상

---

## 참고사항

### 형식 규칙

- ✅ [P] 태스크 = 다른 파일, 병렬 실행 가능
- ✅ [Story] 라벨 = 사용자 스토리 추적 (US1, US2)
- ✅ 모든 태스크에 파일 경로 명시

### FSD 아키텍처 준수

- ✅ Shared 레이어: `shared/config/site.ts` (설정)
- ✅ Widget 레이어: `widgets/contacts/ui/ContactsSection.tsx` (UI)
- ✅ Import 방향: widgets → shared (상위→하위) ✅
- ❌ 하위→상위 import 금지
- ❌ 순환 의존성 금지

### TypeScript 타입 안정성

- ✅ strict 모드 사용
- ✅ `as const` assertion 유지
- ✅ optional property (`resumeUrl?`) 사용
- ❌ `any` 타입 사용 금지

### 품질 기준

- ✅ TypeScript 컴파일 에러 없음 (`pnpm tsc --noEmit`)
- ✅ ESLint 에러/경고 없음 (`pnpm lint`)
- ✅ 프로덕션 빌드 성공 (`pnpm build`)
- ✅ 모든 인수 시나리오 통과

### 커밋 전략

- 논리적 단위로 커밋 (US1 완료 후 1개, US2 완료 후 1개 권장)
- Conventional Commits 형식 사용
- 각 커밋은 빌드 가능한 상태여야 함

### 피해야 할 것

- ❌ 하위→상위 레이어 import
- ❌ 순환 의존성
- ❌ 정당화되지 않은 `any` 타입
- ❌ 조건부 렌더링 없이 resumeUrl 사용 (undefined 에러 위험)
- ❌ 보안 속성 누락 (`rel="noopener noreferrer"`)

---

**문서 생성일**: 2025-11-17  
**마지막 업데이트**: 2025-11-17  
**상태**: 구현 준비 완료 ✅
