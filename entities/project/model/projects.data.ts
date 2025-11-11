import type { Project } from './types';

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
    techStack: ['react', 'typescript'],
  },
  {
    id: 'e-commerce-app',
    name: '이커머스 애플리케이션',
    description:
      '모던 프론트엔드 기술을 활용한 반응형 온라인 쇼핑몰. 장바구니, 결제, 주문 관리 기능을 포함합니다.',
    imageUrl: '/images/projects/ecommerce.png',
    githubUrl: 'https://github.com/codeliner/ecommerce',
    startDate: '2025-06',
    endDate: '2025-08',
    techStack: ['react', 'typescript', 'tailwindcss'],
  },
] as const;
