<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                        동기화 영향 보고서                                     ║
╚══════════════════════════════════════════════════════════════════════════════╝

버전 변경: N/A → 1.0.0 (초기 헌법)
변경 근거: MINOR - Next.js 프로젝트 및 FSD 아키텍처를 위한 기본 원칙 수립

수정된 원칙: N/A (초기 생성)
추가된 섹션:
  - 핵심 원칙 (FSD 아키텍처, 컴포넌트 우선 설계, 타입 안정성,
    기능 격리, 테스트 우선 개발)
  - 아키텍처 표준
  - 개발 워크플로

제거된 섹션: N/A

템플릿 상태:
  ✅ plan-template.md - FSD 원칙에 부합하는 헌법 검사 섹션
  ✅ spec-template.md - 기능 기반 구성을 지원하는 사용자 스토리
  ✅ tasks-template.md - 기능 분할 구현을 지원하는 태스크 구조

후속 조치: 없음

생성일: 2025-11-11
-->

# who-am-codeliner 헌법

## 핵심 원칙

### I. FSD 아키텍처 (필수)

프로젝트는 반드시 Feature-Sliced Design (FSD) 방법론을 따라야 합니다:

- **레이어**: 코드는 표준화된 레이어로 구성 (app, pages, widgets, features, entities, shared)
- **슬라이스**: 각 레이어는 비즈니스 도메인별로 분할 (예: user, post, comment)
- **세그먼트**: 각 슬라이스는 세그먼트를 포함 (ui, model, api, lib, config)
- **Import 규칙**: 상위 레이어는 하위 레이어만 import 가능 (app → pages → widgets → features → entities → shared); 순환 의존성 및 하위→상위 import 금지
- **Public API**: 각 슬라이스는 반드시 index 파일을 통해 계약을 노출

**근거**: FSD는 예측 가능한 아키텍처를 강제하고, 결합도를 낮추며, 병렬 개발을 가능하게 하고, 프로젝트가 확장될 때 장기적인 유지보수성을 보장합니다.

### II. 컴포넌트 우선 설계

모든 UI 요소는 재사용 가능한 컴포넌트로 시작합니다:

- 컴포넌트는 반드시 명확한 props 인터페이스를 가진 독립적 형태여야 함
- 공유 컴포넌트는 `shared/ui`에 위치
- 기능별 컴포넌트는 `features/*/ui` 또는 `widgets/*/ui`에 위치
- Server 및 Client 컴포넌트는 명확히 구분되고 표시됨
- 컴포넌트 문서에는 사용 예제 포함
- Props는 TypeScript 인터페이스/타입으로 정의

**근거**: 컴포넌트 우선 접근법은 재사용성을 극대화하고, 명확한 계약을 강제하며, FSD 구조를 지원하면서 React/Next.js 모범 사례에 부합합니다.

### III. 타입 안정성 (필수)

TypeScript를 strict 모드로 사용해야 합니다:

- 모든 함수는 명시적인 반환 타입을 가져야 함
- 타입이 없는 서드파티 라이브러리와 인터페이스할 때를 제외하고 `any` 타입 사용 금지
- 모든 컴포넌트에 대한 Props 인터페이스 정의
- API 응답은 Zod 또는 유사한 검증 라이브러리로 타입 지정
- 공유 타입은 적절한 FSD 세그먼트에 위치 (entities/\*/model, shared/types)

**근거**: 타입 안정성은 런타임 에러를 방지하고, IDE 지원을 개선하며, 살아있는 문서 역할을 하고, 프로덕션이 아닌 개발 중에 버그를 포착합니다.

### IV. 기능 격리

기능은 반드시 독립적으로 개발 및 테스트 가능해야 합니다:

- 각 기능 슬라이스는 자체 ui, model, api, lib를 가진 독립적 형태
- 기능 간 통신은 잘 정의된 Public API를 통해서만
- 기능 간 의존성은 최소화하고 명시적으로 문서화
- 미완성 기능에는 feature flag 사용
- 각 기능은 독립적으로 개발, 테스트, 배포 가능

**근거**: 격리는 병렬 개발을 가능하게 하고, 병합 충돌을 줄이며, 테스트를 단순화하고, 전체 애플리케이션을 깨뜨리지 않고 기능이 독립적으로 진화할 수 있게 합니다.

### V. 테스트 우선 개발

테스트가 구현을 안내합니다 (명시적으로 요구될 때):

- 사용자 스토리는 반드시 구현 전에 인수 기준을 가져야 함
- 컴포넌트 테스트는 UI 동작 및 props 처리를 검증
- API 라우트 테스트는 요청/응답 계약을 검증
- 통합 테스트는 기능 간 상호작용을 검증
- 테스트 파일은 FSD 구조 내 구현과 함께 위치

**근거**: 테스트 우선은 기능이 요구사항을 충족하도록 보장하고, 리팩토링을 위한 안전망을 제공하며, 실행 가능한 문서 역할을 하고, 엣지 케이스를 미리 생각하도록 강제합니다.

# who-am-codeliner Constitution

## Core Principles

### I. FSD Architecture (NON-NEGOTIABLE)

Project MUST follow Feature-Sliced Design (FSD) methodology:

- **Layers**: Code organized into standardized layers (app, pages, widgets, features, entities, shared)
- **Slices**: Each layer divided by business domain (e.g., user, post, comment)
- **Segments**: Each slice contains segments (ui, model, api, lib, config)
- **Import Rules**: Layers can only import from layers below; no circular dependencies
- **Public API**: Each slice MUST expose its contract through an index file

**Rationale**: FSD enforces predictable architecture, reduces coupling, enables parallel development, and ensures long-term maintainability as the project scales.

### II. Component-First Design

Every UI element starts as a reusable component:

- Components MUST be self-contained with clear props interface
- Shared components live in `shared/ui`
- Feature-specific components live in `features/*/ui` or `widgets/*/ui`
- Server and Client components clearly separated and marked
- Component documentation includes usage examples
- Props typed with TypeScript interfaces/types

**Rationale**: Component-first approach maximizes reusability, enforces clear contracts, and aligns with React/Next.js best practices while supporting the FSD structure.

### III. Type Safety (NON-NEGOTIABLE)

TypeScript MUST be used throughout with strict mode enabled:

- All functions have explicit return types
- No `any` types except when interfacing with untyped third-party libraries
- Props interfaces defined for all components
- API responses typed with Zod or similar validation
- Shared types live in appropriate FSD segments (entities/\*/model, shared/types)

**Rationale**: Type safety prevents runtime errors, improves IDE support, serves as living documentation, and catches bugs during development rather than production.

### IV. Feature Isolation

Features MUST be independently developable and testable:

- Each feature slice is self-contained with its own ui, model, api, lib
- Features communicate through well-defined public APIs
- Cross-feature dependencies minimized and explicitly documented
- Feature flags used for incomplete features
- Each feature can be developed, tested, and deployed independently

**Rationale**: Isolation enables parallel development, reduces merge conflicts, simplifies testing, and allows features to evolve independently without breaking the entire application.

### V. Test-First Development

Tests guide implementation (when explicitly required):

- User stories MUST have acceptance criteria before implementation
- Component tests verify UI behavior and props handling
- API route tests verify request/response contracts
- Integration tests validate cross-feature interactions
- Test files collocated with implementation in FSD structure

**Rationale**: Test-first ensures features meet requirements, provides safety net for refactoring, serves as executable documentation, and enforces thinking through edge cases upfront.

## 아키텍처 표준

### Next.js App Router 구조

- 라우팅 및 레이아웃을 위한 App 디렉토리
- 백엔드 엔드포인트를 위한 `app/api/`의 API 라우트
- 기본적으로 Server 컴포넌트, Client 컴포넌트는 명시적으로 표시
- 레이아웃 구성을 위한 Route 그룹
- 적절한 수준의 Loading 및 Error 바운더리
- SEO를 위한 Metadata API

### FSD 레이어 가이드라인

**app/**: 애플리케이션 초기화, 프로바이더, 전역 스타일, 루트 레이아웃 (최상위)
**pages/**: 위젯과 기능으로 구성된 라우트 페이지 (Next.js App Router 사용)
**widgets/**: 여러 기능을 결합한 복합 UI 블록
**features/**: 사용자 대면 기능 (예: auth, comments, search)
**entities/**: 비즈니스 엔티티 (예: user, post, product)
**shared/**: 재사용 가능한 코드 (UI 컴포넌트, 유틸리티, 설정, 타입) (최하위)

**Import 계층**: shared ← entities ← features ← widgets ← pages ← app
(상위 레이어는 하위 레이어를 import 가능, 역방향 금지)

### 상태 관리

- Server 상태: React Server Components + Next.js 캐싱이 포함된 fetch
- Client 상태: 간단한 경우 React hooks (useState, useContext) 사용
- 복잡한 상태: `shared/store` 또는 feature model에 Zustand나 Jotai 고려
- Form 상태: feature 세그먼트에 React Hook Form 또는 유사 라이브러리
- URL 상태: Next.js search params 및 라우팅

### 스타일링 표준

- 주요 스타일링 솔루션으로 Tailwind CSS (이미 설정됨)
- Tailwind 클래스를 통한 컴포넌트별 스타일
- `app/globals.css`의 전역 스타일
- 필요시 복잡한 컴포넌트별 스타일을 위한 CSS modules
- `shared/config/theme`의 디자인 토큰

## 개발 워크플로

### 기능 개발 프로세스

1. **명세서**: `/specs/[###-feature-name]/spec.md`에 기능 정의
2. **계획**: FSD 구조로 구현 계획 생성
3. **사용자 스토리**: 점진적 전달을 위한 우선순위 설정 (P1, P2, P3)
4. **구현**: FSD 레이어를 따르며, entities부터 시작하여 features, 그다음 widgets/pages
5. **테스트**: 인수 기준 및 컴포넌트 계약 검증
6. **통합**: 기능을 pages/widgets로 구성
7. **리뷰**: FSD 준수 및 TypeScript 안정성 검증

### 커밋 표준

- 커밋은 FSD 구조를 따름 (예: "feat(features/auth): 로그인 폼 추가")
- Conventional commits 형식: `type(scope): description`
- 각 커밋은 원자적이고 작동하는 변경사항을 나타냄
- 커밋 메시지에 spec/task 번호 참조

### 코드 리뷰 게이트

- FSD 레이어 경계 준수 (하위→상위 import 금지, 상위만 하위를 import 가능): 차단
- TypeScript strict 모드 위반: 차단
- Public API export 누락: 차단
- 순환 의존성: 차단
- 정당화되지 않은 `any` 타입: 차단
- 컴포넌트 prop 타입 누락: 차단

### 품질 표준

- ESLint (Next.js 설정)가 에러 없이 통과
- TypeScript 컴파일이 에러 없이 성공
- 모든 테스트 통과 (테스트가 기능 요구사항의 일부인 경우)
- 개발 환경에서 console 에러/경고 없음
- Lighthouse 점수 유지 (해당되는 경우)

## 거버넌스

이 헌법은 다른 모든 개발 관행과 가이드보다 우선합니다. 모든 구현 계획, 명세서, 태스크는 반드시 이러한 원칙을 준수해야 합니다.

### 수정 프로세스

1. 근거와 함께 수정안 제안
2. 기존 기능에 대한 영향 문서화
3. Semantic versioning에 따라 버전 업데이트:
   - **MAJOR**: 하위 호환되지 않는 변경사항 (예: FSD 요구사항 제거)
   - **MINOR**: 새로운 원칙 또는 확장된 가이드 (예: 새 레이어 추가)
   - **PATCH**: 명확화, 문구 개선, 의미론적이지 않은 수정
4. 모든 템플릿 파일에 변경사항 전파
5. 필요시 기존 코드에 대한 마이그레이션 계획 생성

### 준수 검증

- 모든 PR은 헌법 준수에 대해 검토됨
- 아키텍처 결정은 원칙에 따라 정당화됨
- 복잡도 추가는 명시적 근거 필요
- FSD 준수를 검증하는 정기적인 아키텍처 감사

### 살아있는 문서

- 헌법은 분기마다 검토됨
- 프로젝트 진화 및 교훈에 따라 업데이트됨
- 모든 계획 및 검토 프로세스에서 참조됨
- 템플릿은 원칙과 동기화 유지됨

**버전**: 1.0.0 | **비준일**: 2025-11-11 | **최종 수정일**: 2025-11-11
