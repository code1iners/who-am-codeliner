import type { Skill } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'react',
    name: 'React',
    iconUrl: 'https://cdn.simpleicons.org/react/61DAFB',
    level: 'advanced',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    level: 'advanced',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    iconUrl: 'https://cdn.simpleicons.org/nextdotjs/000000',
    level: 'advanced',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    level: 'advanced',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    level: 'advanced',
  },
  {
    id: 'html5',
    name: 'HTML5',
    iconUrl: 'https://cdn.simpleicons.org/html5/E34F26',
    level: 'advanced',
  },
  {
    id: 'css3',
    name: 'CSS3',
    iconUrl: 'https://cdn.simpleicons.org/css3/1572B6',
    level: 'advanced',
  },
  {
    id: 'git',
    name: 'Git',
    iconUrl: 'https://cdn.simpleicons.org/git/F05032',
    level: 'intermediate',
  },
] as const;
