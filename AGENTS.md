# 개발 가이드

## 프로젝트 개요

브라우저 작업을 노드 기반 워크플로우로 구성하고 실행하는 Next.js 애플리케이션이다.

- Clerk 조직을 작업 공간 단위로 사용한다.
- Liveblocks와 React Flow로 워크플로우를 공동 편집한다.
- Trigger.dev에서 워크플로우를 실행한다.
- Stagehand와 Browserbase로 브라우저 자동화를 수행한다.

## 개발 환경

- Node.js 24.x와 npm을 사용한다.
- 의존성 설치: `npm install`
- 개발 서버: `npm run dev`
- Trigger.dev 개발 서버: `npm run trigger:dev`
- Storybook: `npm run storybook`
- 패키지 변경 시 `package.json`과 `package-lock.json`을 함께 갱신한다.
- API 키와 같은 비밀 값은 코드, 로그, 문서에 직접 기록하지 않는다.

## 주요 디렉터리

- `app/`: Next.js 라우트, 레이아웃, API Route
- `features/home/`: 홈 페이지 기능
- `features/pricing/`: 가격 페이지 기능
- `features/workflows/`: 워크플로우 UI, 그래프, 실행 로직
- `features/workflows/nodes/`: 워크플로우 노드 정의와 실행기
- `features/workflows/tasks/`: Trigger.dev 실행 로직
- `components/ui/`: 공통 UI와 디자인 시스템 컴포넌트
- `libs/db/schema.ts`: Drizzle 스키마와 데이터베이스 타입의 원본

## 코드 작성 원칙

- 기존 파일 구조, 네이밍, 코드 패턴을 우선한다.
- 특별한 이유가 없다면 함수는 화살표 함수로 작성한다.
- `any`와 불필요한 타입 단언을 피한다.
- 추상화와 파일 분리는 실제 중복을 줄이거나 책임을 명확히 할 때 적용한다.

## Next.js

- 이 프로젝트는 Next.js 16을 사용한다.
- Next.js 관련 구현은 `node_modules/next/dist/docs/`에 포함된 현재 설치 버전의 문서와 공식 문서를 기준으로 한다.

## 데이터베이스 타입

- 데이터베이스 행 타입은 `libs/db/schema.ts`의 Drizzle 스키마에서 추론한다.
- 조회 타입은 `typeof table.$inferSelect`, 삽입 타입은 `typeof table.$inferInsert`를 사용한다.
- 일부 열만 필요하면 기존 행 타입을 `Pick` 또는 `Omit`으로 좁힌다.
- 데이터베이스 행과 동일한 타입을 별도로 다시 선언하지 않는다.

## React Flow

React Flow 관련 구현은 현재 설치된 `@xyflow/react` 버전을 기준으로 한다.

1. `https://reactflow.dev/llms.txt`에서 관련 공식 문서를 확인한다.
2. 필요한 경우 `node_modules/@xyflow/`의 타입 정의를 함께 확인한다.
3. 이전 `reactflow` 패키지의 API는 혼용하지 않는다.

## Stagehand

- Stagehand 세션 생성은 `features/workflows/tasks/run-workflow/create-stagehand-session.ts`의 기존 설정을 따른다.
- 노드 실행기는 `features/workflows/nodes/`에 둔다.
- `act`, `observe`, `extract`, `agent` API 구현은 Stagehand V3 공식 문서와 설치된 패키지 타입을 기준으로 한다.
- 생성한 Stagehand 세션은 워크플로우의 성공과 실패 여부에 관계없이 종료한다.
- 모델과 API의 세부 설정은 이 문서에 중복하지 않고 실제 구현을 기준으로 한다.

## 검증

변경 범위에 따라 다음 검증을 실행한다.

- 린트: `npm run lint`
- 타입 검사: `npm run typecheck`
- 단위 테스트: `npm run test:run`
- 테스트 커버리지: `npm run test:coverage`
- Storybook 빌드: `npm run build-storybook`
- 프로덕션 빌드: `npm run build`

먼저 변경한 파일과 직접 관련된 검증을 실행하고, 작업 범위와 위험도가 크면 전체 검증으로 확대한다.
