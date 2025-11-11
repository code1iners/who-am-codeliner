import type { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: 'Codeliner',
  title: 'Front-End Developer',
  bio: '코드를 통해 비즈니스 문제 해결과 효율적 설계를 고민하며 꾸준히 성장하고 있습니다.',
  aboutMe:
    '저는 프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며, 비즈니스 문제를 효율적으로 해결하는 코드를 작성하는 것을 좋아합니다. 새로운 기술을 배우고 적용하는 것에 열정이 있으며, 팀과 협업하며 성장하는 것을 즐깁니다.',
  profileImageUrl: '/images/profile.svg',
  githubUrl: 'https://github.com/codeliner',
} as const;
