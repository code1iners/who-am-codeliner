import type { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: 'Woni',
  title: 'Front-End Developer',
  bio: '코드를 통해 비즈니스 문제 해결과 효율적 설계를 고민하며 꾸준히 성장하고 있습니다.',
  aboutMe:
    '5년 차 프론트엔드 개발자로서, React/TypeScript 기반의 대규모 서비스 개발 및 리딩 경험이 풍부합니다. 사용자 중심의 UI/UX 개선과 특히, 모노레포 구축, 결제 시스템 연동, 키오스크 개발 등 비즈니스 성과에 직결되는 기능을 주도적으로 해결하며 코드 효율과 팀 협업 개선에 기여했습니다.',
  profileImageUrl: '/images/profile.png',
  githubUrl: 'https://github.com/code1iners?tab=repositories',
} as const;
