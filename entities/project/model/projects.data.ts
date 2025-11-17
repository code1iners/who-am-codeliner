import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'ce1pers',
    name: 'Ce1pers',
    description:
      'JavaScript, TypeScript 기반 유틸리티 헬퍼 함수를 제공하는 오픈소스 라이브러리.',
    imageUrl: '/images/projects/celpers_icon.png',
    githubUrl: 'https://github.com/code1iners/ce1pers',
    startDate: '2025-11',
    endDate: 'Present',
    techStack: ['TypeScript', 'JavaScript'],
  },
  {
    id: 'vvorkmon',
    name: 'VVorkmon',
    description:
      '업무 기록을 위한 간단한 태스크 관리 도구. 레트로 UI로 진행했던 업무를 타임라인으로 시각화하여 효율적인 일정 관리를 지원합니다.',
    imageUrl: '/images/projects/vvorkmon_icon.png',
    demoUrl: 'https://vvorkmon.codeliners.cc/',
    startDate: '2025-09',
    endDate: '2025-10',
    techStack: ['React', 'TypeScript'],
  },
  {
    id: 'todo-rpg',
    name: 'To Do RPG',
    description:
      '해야할 업무들을 Task, Backlog, Project 로 세분화하여 효율적으로 관리하는 태스크 관리 도구. 레트로 UI로 게임화하여 동기부여를 높이는 RPG 스타일의 할 일 관리 애플리케이션.',
    imageUrl: '/images/projects/todo_rpg_icon.png',
    demoUrl: 'https://todo-rpg.codeliners.cc/',
    startDate: '2025-06',
    endDate: '2025-08',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'NextJS'],
  },
] as const;
