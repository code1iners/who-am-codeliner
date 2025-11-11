# 구현 계획: [FEATURE]

**브랜치**: `[###-feature-name]` | **날짜**: [DATE] | **명세서**: [link]
**입력**: `/specs/[###-feature-name]/spec.md`의 기능 명세서

**참고**: 이 템플릿은 `/speckit.plan` 명령어로 작성됩니다. 실행 워크플로는 `.specify/templates/commands/plan.md`를 참조하세요.

## 요약

[기능 명세서에서 추출: 주요 요구사항 + 연구를 통한 기술적 접근법]

## 기술적 맥락

<!--
  조치 필요: 이 섹션의 내용을 프로젝트의 기술적 세부사항으로 교체하세요.
  여기 제시된 구조는 반복 프로세스를 안내하기 위한 권고사항입니다.
-->

**언어/버전**: [예: Python 3.11, Swift 5.9, Rust 1.75 또는 명확화 필요]  
**주요 의존성**: [예: FastAPI, UIKit, LLVM 또는 명확화 필요]  
**스토리지**: [해당되는 경우, 예: PostgreSQL, CoreData, files 또는 N/A]  
**테스트**: [예: pytest, XCTest, cargo test 또는 명확화 필요]  
**대상 플랫폼**: [예: Linux server, iOS 15+, WASM 또는 명확화 필요]
**프로젝트 타입**: [single/web/mobile - 소스 구조 결정]  
**성능 목표**: [도메인별, 예: 1000 req/s, 10k lines/sec, 60 fps 또는 명확화 필요]  
**제약사항**: [도메인별, 예: <200ms p95, <100MB memory, offline-capable 또는 명확화 필요]  
**규모/범위**: [도메인별, 예: 10k users, 1M LOC, 50 screens 또는 명확화 필요]

## 헌법 검사

_게이트: Phase 0 연구 전에 통과해야 함. Phase 1 설계 후 재검사._

- [ ] **FSD 아키텍처**: 기능이 적절한 레이어로 구성되었는가 (app/pages/widgets/features/entities/shared)?
- [ ] **기능 격리**: 기능을 독립적으로 개발 및 테스트할 수 있는가?
- [ ] **Import 규칙**: 하위→상위 레이어 import 없음, 순환 의존성 없음? (상위가 하위를 import: app→pages→widgets→features→entities→shared)
- [ ] **Public API**: 각 슬라이스가 index 파일을 통해 계약을 노출하는가?
- [ ] **타입 안정성**: 모든 코드가 strict 모드의 TypeScript를 사용하며, 정당화되지 않은 `any` 타입이 없는가?
- [ ] **컴포넌트 계약**: 모든 컴포넌트에 타입이 지정된 props 인터페이스가 있는가?
- [ ] **테스트 요구사항**: 테스트가 필요한 경우, 인수 기준이 먼저 정의되었는가?

## 프로젝트 구조

### 문서 (이 기능)

```text
specs/[###-feature]/
├── plan.md              # 이 파일 (/speckit.plan 명령 출력)
├── research.md          # Phase 0 출력 (/speckit.plan 명령)
├── data-model.md        # Phase 1 출력 (/speckit.plan 명령)
├── quickstart.md        # Phase 1 출력 (/speckit.plan 명령)
├── contracts/           # Phase 1 출력 (/speckit.plan 명령)
└── tasks.md             # Phase 2 출력 (/speckit.tasks 명령 - /speckit.plan으로 생성되지 않음)
```

### 소스 코드 (저장소 루트)

<!--
  조치 필요: 아래의 플레이스홀더 트리를 이 기능에 대한 구체적인 FSD 구조로 교체하세요.
  기능이 걸쳐있는 FSD 레이어를 식별하고 실제 경로를 문서화하세요.
  사용하지 않는 레이어 예제는 제거하세요.
-->

```text
# Next.js + FSD 구조 (기능 범위에 따라 조정)

app/                        # Next.js App Router
├── (routes)/              # Route 그룹
│   └── [feature]/         # 기능별 라우트
├── api/                   # API 라우트 (백엔드가 필요한 경우)
└── layout.tsx, page.tsx   # 루트 레이아웃 및 페이지

src/                       # FSD 레이어 (src/ 디렉토리 사용시)
├── app/                   # App 초기화 레이어
│   ├── providers/         # Context 프로바이더
│   └── styles/           # 전역 스타일
│
├── pages/                 # Page 레이어 (구성)
│   └── [page-name]/      # 페이지별 로직
│
├── widgets/              # Widget 레이어 (복합 블록)
│   └── [widget-name]/
│       ├── ui/           # 위젯 UI 컴포넌트
│       └── index.ts      # Public API
│
├── features/             # Feature 레이어
│   └── [feature-name]/
│       ├── ui/           # 기능 UI 컴포넌트
│       ├── model/        # 상태, 훅, 타입
│       ├── api/          # API 통합
│       ├── lib/          # 기능 유틸리티
│       └── index.ts      # Public API
│
├── entities/             # Entity 레이어 (비즈니스 객체)
│   └── [entity-name]/
│       ├── ui/           # 엔티티 UI (카드, 목록)
│       ├── model/        # 엔티티 타입, 스키마
│       ├── api/          # 엔티티 CRUD
│       └── index.ts      # Public API
│
└── shared/               # Shared 레이어
    ├── ui/               # 재사용 가능한 UI 컴포넌트
    ├── lib/              # 유틸리티, 헬퍼
    ├── api/              # API 클라이언트, 베이스
    ├── config/           # 상수, 환경변수
    └── types/            # 전역 타입

# 대안: src/ 없는 플랫 구조
app/                      # Next.js 라우트 + app 레이어
features/                 # FSD feature 레이어
entities/                 # FSD entity 레이어
shared/                   # FSD shared 레이어
widgets/                  # FSD widget 레이어 (필요시)
```

**구조 결정**: [선택한 FSD 구조, 이 기능이 사용하는 레이어를 문서화하고
위에 캡처된 실제 디렉토리를 참조하세요. 이 특정 기능에 대해 특정 레이어가
필요하거나 필요하지 않은 이유를 설명하세요.]

## 복잡도 추적

> **헌법 검사에 정당화가 필요한 위반사항이 있는 경우에만 작성**

| 위반사항                      | 필요한 이유                   | 거부된 더 단순한 대안               |
| ----------------------------- | ----------------------------- | ----------------------------------- |
| [예: 하위→상위 레이어 import] | [구체적 필요성]               | [적절한 FSD 흐름이 불충분한 이유]   |
| [예: 순환 의존성]             | [구체적 문제]                 | [리팩토링이 불가능한 이유]          |
| [예: `any` 타입 사용]         | [타입이 없는 라이브러리 통합] | [타입 단언/unknown이 불충분한 이유] |
