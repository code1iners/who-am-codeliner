import type { Skill } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    level: 'advanced',
  },
  {
    id: 'react',
    name: 'React',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    level: 'advanced',
  },
  {
    id: 'zustand',
    name: 'Zustand',
    iconUrl: '/images/skills/zustand_icon.png',
    level: 'advanced',
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    iconUrl: 'https://cdn.simpleicons.org/reactquery/FF4154',
    level: 'advanced',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    level: 'advanced',
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    iconUrl: 'https://cdn.simpleicons.org/framer/0055FF',
    level: 'advanced',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    iconUrl: 'https://cdn.simpleicons.org/greensock/88CE02',
    level: 'advanced',
  },
  {
    id: 'vitest',
    name: 'Vitest',
    iconUrl: 'https://cdn.simpleicons.org/vitest/6E9F18',
    level: 'advanced',
  },
  {
    id: 'cypress',
    name: 'Cypress',
    iconUrl: 'https://cdn.simpleicons.org/cypress/17202C',
    level: 'advanced',
  },
  {
    id: 'testing-library',
    name: 'React Testing Library',
    iconUrl: 'https://cdn.simpleicons.org/testinglibrary/E33332',
    level: 'advanced',
  },
  {
    id: 'zod',
    name: 'Zod',
    iconUrl: 'https://cdn.simpleicons.org/zod/3E67B1',
    level: 'advanced',
  },
] as const;
