# 구현 계획: 이력서 링크 추가

**브랜치**: `002-add-resume-link` | **날짜**: 2025-11-17 | **명세서**: [spec.md](./spec.md)
**입력**: `/specs/002-add-resume-link/spec.md`의 기능 명세서

## 요약

Contact 섹션에 GitHub 프로필 링크와 함께 이력서 링크를 추가합니다. 이력서 URL은 중앙 설정 파일(`shared/config/site.ts`)에서 관리되며, 새로운 버튼을 통해 새 탭에서 이력서를 열 수 있습니다. 버튼 레이아웃은 반응형으로 동작하며 (모바일: 세로 스택, 데스크탑: 가로 배치), 기존 GitHub 버튼과 시각적으로 일관된 스타일을 유지합니다.

## 기술적 맥락

**언어/버전**: TypeScript 5.x, React 19.2.0, Next.js 16.0.1  
**주요 의존성**: Next.js App Router, GSAP 3.13.0, @gsap/react 2.1.2, Tailwind CSS v4  
**스토리지**: N/A (외부 URL만 사용)  
**테스트**: N/A (명세서에서 테스트 요구사항 없음)  
**대상 플랫폼**: 웹 브라우저 (Chrome, Firefox, Safari, Edge)  
**프로젝트 타입**: Next.js 웹 애플리케이션 (FSD 아키텍처)  
**성능 목표**: N/A (정적 링크 추가, 성능 영향 최소)  
**제약사항**: 반응형 디자인 (< 768px 모바일, 768-1024px 태블릿, > 1024px 데스크탑)  
**규모/범위**: 2개 파일 수정 (site.ts, ContactsSection.tsx), 1개 속성 추가 (resumeUrl)

## 헌법 검사

_게이트: Phase 0 연구 전에 통과해야 함. Phase 1 설계 후 재검사._

- [x] **FSD 아키텍처**: 기능이 적절한 레이어로 구성되었는가?
  - `shared/config/site.ts` (Shared 레이어 - 전역 설정)
  - `widgets/contacts/ui/ContactsSection.tsx` (Widget 레이어 - UI 블록)
  
- [x] **기능 격리**: 기능을 독립적으로 개발 및 테스트할 수 있는가?
  - 예. Contact 위젯만 수정하며, 다른 기능에 영향 없음
  
- [x] **Import 규칙**: 하위→상위 레이어 import 없음, 순환 의존성 없음?
  - 예. widgets → shared 방향만 사용 (상위→하위 레이어 import)
  
- [x] **Public API**: 각 슬라이스가 index 파일을 통해 계약을 노출하는가?
  - 예. site.ts는 siteConfig를 export하며, ContactsSection은 위젯의 index.ts를 통해 export됨
  
- [x] **타입 안정성**: 모든 코드가 strict 모드의 TypeScript를 사용하며, 정당화되지 않은 `any` 타입이 없는가?
  - 예. siteConfig는 `as const`로 타입 추론, Link/Button 컴포넌트는 타입 지정됨
  
- [x] **컴포넌트 계약**: 모든 컴포넌트에 타입이 지정된 props 인터페이스가 있는가?
  - 예. Button 컴포넌트는 ButtonProps 인터페이스 사용, Link는 Next.js 타입 사용
  
- [x] **테스트 요구사항**: 테스트가 필요한 경우, 인수 기준이 먼저 정의되었는가?
  - N/A. 명세서에 테스트 요구사항 없음 (수동 인수 테스트만)

**Phase 1 설계 후 재검사 결과**: 모든 헌법 검사 통과 ✅

## 프로젝트 구조

### 문서 (이 기능)

```text
specs/002-add-resume-link/
├── spec.md              # 기능 명세서 (완료)
├── plan.md              # 이 파일 (현재 작성 중)
├── research.md          # Phase 0 출력 (아래에서 생성)
├── data-model.md        # Phase 1 출력 (아래에서 생성)
├── quickstart.md        # Phase 1 출력 (아래에서 생성)
└── contracts/           # Phase 1 출력 (N/A - 백엔드 API 없음)
```

### 소스 코드 (저장소 루트)

```text
# FSD 플랫 구조 (src/ 없음)

shared/
└── config/
    └── site.ts          # [수정] resumeUrl 속성 추가

widgets/
└── contacts/
    ├── ui/
    │   └── ContactsSection.tsx  # [수정] 이력서 버튼 추가, 레이아웃 조정
    └── index.ts         # Public API (변경 없음)

# 영향받는 기타 파일
app/
└── page.tsx             # ContactsSection 사용 (변경 없음)
```

**구조 결정**: 
- **Shared 레이어** (`shared/config/site.ts`): 전역 설정으로 resumeUrl 추가. 모든 레이어에서 접근 가능.
- **Widget 레이어** (`widgets/contacts/ui/ContactsSection.tsx`): Contact 섹션 UI 수정. 이력서 버튼 추가 및 반응형 레이아웃 구현.
- **Entity/Feature 레이어**: 사용하지 않음. 단순 UI 변경이므로 별도의 비즈니스 로직이나 엔티티 불필요.
- **App 레이어**: 변경 없음. ContactsSection은 이미 page.tsx에 통합되어 있음.

## 복잡도 추적

> 헌법 위반사항 없음. 복잡도 추적 불필요.

---

## Phase 0: 연구 및 결정사항

### 1. 반응형 레이아웃 전략

**결정**: Tailwind CSS의 반응형 클래스 사용 (`flex-col`, `md:flex-row`)

**근거**:
- 프로젝트가 이미 Tailwind CSS v4 사용 중
- 기존 ContactsSection에서 Tailwind 스타일링 패턴 사용
- Flexbox 기반 레이아웃이 간단하고 명확함
- 브라우저 지원 우수 (모든 주요 브라우저)

**평가된 대안**:
1. CSS Grid: 2개 버튼에는 과도하게 복잡함
2. CSS Modules: 프로젝트에서 사용하지 않는 패턴
3. Media queries: Tailwind 반응형 클래스가 더 간결함

### 2. 버튼 간격 및 정렬

**결정**: `gap-4` (16px) 사용, 모바일은 세로 스택, 데스크탑은 가로 배치

**근거**:
- 버튼 크기 (lg: px-6 py-3)에 적절한 간격
- 터치 타겟 크기 가이드라인 준수 (최소 44x44px)
- 기존 섹션의 간격 패턴과 일관성 유지

**평가된 대안**:
1. `gap-2` (8px): 터치 타겟이 너무 가까움
2. `gap-6` (24px): 데스크탑에서 버튼이 너무 멀어짐
3. 항상 가로 배치: 모바일에서 너비 부족

### 3. 이력서 URL 기본값 처리

**결정**: resumeUrl이 없으면 버튼을 렌더링하지 않음

**근거**:
- 명세서의 엣지 케이스: "이력서 버튼이 표시되지 않거나 비활성화 상태로 표시"
- 비활성화 버튼보다 조건부 렌더링이 UX상 더 깔끔함
- TypeScript strict 모드에서 optional 속성 처리 명확함

**평가된 대안**:
1. 비활성화 버튼 표시: 클릭할 수 없는 요소는 혼란스러움
2. 기본 URL 사용: 잘못된 URL로 이동할 위험
3. 에러 메시지 표시: 사용자에게는 불필요한 정보

### 4. 보안 속성

**결정**: `target="_blank"` + `rel="noopener noreferrer"` 사용

**근거**:
- 명세서 FR-003 요구사항 충족
- `noopener`: window.opener 접근 방지 (보안)
- `noreferrer`: Referer 헤더 전송 방지 (프라이버시)
- Next.js Link 컴포넌트가 자동으로 최적화

**평가된 대안**:
1. `target="_blank"`만 사용: 보안 취약점 존재
2. 같은 탭에서 열기: 포트폴리오 사이트를 벗어나게 됨
3. JavaScript window.open(): 불필요하게 복잡함

### 5. GSAP 애니메이션 유지

**결정**: 기존 GSAP 스크롤 애니메이션 유지, 새 버튼도 동일한 애니메이션에 포함

**근거**:
- 기존 ContactsSection이 GSAP + ScrollTrigger 사용
- contentRef로 전체 영역 애니메이션 적용 중
- 새 버튼은 자동으로 같은 애니메이션 효과 받음
- 일관된 사용자 경험 유지

**평가된 대안**:
1. 버튼별 개별 애니메이션: 과도한 복잡도
2. 애니메이션 제거: 기존 디자인 언어와 불일치
3. CSS transition만 사용: 스크롤 기반 효과 불가능

---

## Phase 1: 데이터 모델 및 계약

### 데이터 모델

**엔티티**: Site Configuration

```typescript
// shared/config/site.ts
export const siteConfig = {
  name: string;           // 개발자 이름
  title: string;          // 사이트 메타 타이틀
  description: string;    // 사이트 설명
  url: string;            // 사이트 URL
  githubUrl: string;      // GitHub 프로필 URL
  resumeUrl?: string;     // [신규] 이력서 URL (선택적)
  keywords: string[];     // SEO 키워드
} as const;
```

**필드 설명**:
- `resumeUrl`: 선택적 속성 (optional). 외부 호스팅된 이력서 페이지의 전체 URL (예: https://drive.google.com/..., https://notion.so/...)

**검증 규칙**:
- TypeScript 타입 시스템으로 자동 검증
- `as const`로 불변성 보장
- URL 형식 검증은 브라우저에 위임 (명세서의 엣지 케이스 정의대로)

### API 계약

**해당 없음**: 이 기능은 백엔드 API를 사용하지 않습니다. 정적 설정 파일과 클라이언트 컴포넌트만 사용합니다.

### 컴포넌트 계약

**기존 컴포넌트 재사용**: `Button`, `Section`, `Link`

```typescript
// shared/ui/Button.tsx (변경 없음)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// Next.js Link (변경 없음)
interface LinkProps {
  href: string;
  target?: string;
  rel?: string;
  // ... 기타 Next.js Link props
}
```

**새 컴포넌트**: 없음. 기존 컴포넌트 조합으로 구현.

---

## Phase 2: 구현 계획 (개요)

**참고**: 세부 태스크는 `/speckit.tasks` 명령어로 `tasks.md`에 생성됩니다.

### 구현 단계

1. **사이트 설정 업데이트** (shared 레이어)
   - `shared/config/site.ts`에 `resumeUrl` 추가
   - 예시 URL로 초기 설정 (나중에 실제 URL로 교체 가능)

2. **Contact 위젯 수정** (widget 레이어)
   - `widgets/contacts/ui/ContactsSection.tsx` 수정
   - 버튼 컨테이너를 flex 레이아웃으로 변경
   - 이력서 버튼 추가 (조건부 렌더링)
   - 반응형 클래스 적용

3. **시각적 검증**
   - 로컬 개발 서버에서 Contact 섹션 확인
   - 모바일 뷰 (< 768px) 테스트
   - 데스크탑 뷰 (> 1024px) 테스트
   - 다크 모드 확인

4. **브라우저 테스트**
   - Chrome, Firefox, Safari, Edge에서 링크 작동 확인
   - 새 탭 열림 확인
   - 보안 속성 적용 확인 (DevTools)

### 영향 받는 파일

```text
[수정] shared/config/site.ts
[수정] widgets/contacts/ui/ContactsSection.tsx
```

### 의존성

- 없음. 새 패키지 설치 불필요.

### 마이그레이션

- 없음. 기존 데이터 마이그레이션 불필요.

---

## Quickstart

### 개발 환경 설정

```bash
# 프로젝트 클론 및 브랜치 전환
cd /home/codeliner/dev/who-am-codeliner
git checkout 002-add-resume-link

# 의존성 설치 (이미 설치되어 있으면 생략)
pnpm install

# 개발 서버 시작
pnpm dev
```

### 구현 체크리스트

1. [ ] `shared/config/site.ts`에 `resumeUrl` 속성 추가
2. [ ] `widgets/contacts/ui/ContactsSection.tsx` 수정:
   - [ ] 버튼 컨테이너를 flex 레이아웃으로 변경
   - [ ] 반응형 클래스 추가 (`flex-col md:flex-row gap-4`)
   - [ ] 이력서 버튼 추가 (Link + Button 조합)
   - [ ] 조건부 렌더링 로직 추가
3. [ ] 로컬 테스트:
   - [ ] 모바일 뷰 (< 768px) 확인
   - [ ] 태블릿 뷰 (768-1024px) 확인
   - [ ] 데스크탑 뷰 (> 1024px) 확인
   - [ ] 다크 모드 확인
4. [ ] 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
5. [ ] 커밋 및 푸시

### 인수 테스트 시나리오

**US-1: Contact 섹션에 이력서 링크 추가**

1. **Given** 사용자가 포트폴리오 홈페이지에 있을 때
   **When** Contact 섹션으로 스크롤하면
   **Then** "GitHub 프로필 보기" 버튼과 "이력서 보기" 버튼이 나란히 표시됨
   - 검증: 두 버튼이 visible하고, 간격이 적절함 (gap-4)

2. **Given** Contact 섹션에서 이력서 버튼이 표시될 때
   **When** 사용자가 이력서 버튼을 클릭하면
   **Then** 이력서 페이지가 새 탭에서 열림
   - 검증: target="_blank", rel="noopener noreferrer" 적용됨

3. **Given** 모바일 화면에서 Contact 섹션을 볼 때
   **When** 버튼들이 표시되면
   **Then** 두 버튼이 세로로 스택됨
   - 검증: 768px 이하에서 flex-col 적용됨

4. **Given** 데스크탑 화면에서 Contact 섹션을 볼 때
   **When** 버튼들이 표시되면
   **Then** 두 버튼이 가로로 배치됨
   - 검증: 768px 이상에서 md:flex-row 적용됨

**US-2: 이력서 링크 설정 관리**

1. **Given** 개발자가 site config 파일을 열었을 때
   **When** resumeUrl 속성을 추가/수정하면
   **Then** Contact 섹션의 이력서 버튼이 새 URL을 사용함
   - 검증: siteConfig.resumeUrl 값이 Link href에 전달됨

2. **Given** resumeUrl이 설정되어 있을 때
   **When** 해당 URL이 유효한지 확인하면
   **Then** 이력서 페이지에 접근할 수 있음
   - 검증: 브라우저에서 URL 접근 가능

**엣지 케이스**:

1. **Given** resumeUrl이 undefined일 때
   **Then** 이력서 버튼이 렌더링되지 않음
   - 검증: `siteConfig.resumeUrl &&` 조건부 렌더링

2. **Given** resumeUrl이 빈 문자열일 때
   **Then** 이력서 버튼이 렌더링되지 않음
   - 검증: 빈 문자열은 falsy 값

### 개발 팁

- **반응형 테스트**: Chrome DevTools → Toggle device toolbar (Cmd+Shift+M)
- **다크 모드 테스트**: 시스템 설정 변경 또는 DevTools → Rendering → Emulate CSS prefers-color-scheme
- **GSAP 디버깅**: ScrollTrigger.getAll()로 트리거 확인
- **TypeScript 검증**: `pnpm tsc --noEmit`로 타입 체크

---

## 후속 작업

### 선택적 개선사항 (범위 외)

1. **이력서 다운로드 기능**: resumeDownloadUrl 추가 (PDF 직접 다운로드)
2. **다국어 이력서**: resumeUrls: { ko: string, en: string } 형태로 확장
3. **이력서 버전 관리**: resumeVersions 배열로 이력 관리
4. **미리보기 모달**: 이력서를 iframe으로 미리보기

### 유지보수 고려사항

- 이력서 URL 변경 시 `shared/config/site.ts` 1개 파일만 수정
- 버튼 스타일 변경 시 `shared/ui/Button.tsx` 수정 (모든 버튼에 적용)
- 레이아웃 조정 시 `widgets/contacts/ui/ContactsSection.tsx`의 Tailwind 클래스 수정

---

**계획 완료일**: 2025-11-17  
**다음 단계**: `/speckit.tasks` 명령어로 세부 태스크 생성
