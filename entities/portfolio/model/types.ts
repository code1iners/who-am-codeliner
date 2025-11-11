export interface PortfolioData {
  /** 개발자 이름 (GitHub 이름) */
  name: string;

  /** 직책/역할 */
  title: string;

  /** 히어로 섹션 소개 문구 (1-2줄) */
  bio: string;

  /** About Me 섹션 상세 설명 (2-3줄) */
  aboutMe: string;

  /** 프로필 사진 URL (로컬 경로 또는 외부 URL) */
  profileImageUrl: string;

  /** GitHub 프로필 URL */
  githubUrl: string;
}
