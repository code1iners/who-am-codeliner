export interface Project {
  /** 고유 식별자 (slug 형식) */
  id: string;

  /** 프로젝트 이름 */
  name: string;

  /** 프로젝트 설명 (1-2문장) */
  description: string;

  /** 프로젝트 대표 이미지 URL (선택적) */
  imageUrl?: string;

  /** GitHub 저장소 URL (선택적) */
  githubUrl?: string;

  /** 라이브 데모 URL (선택적) */
  demoUrl?: string;

  /** 프로젝트 시작 날짜 (YYYY-MM, 선택적) */
  startDate?: string;

  /** 프로젝트 종료 날짜 (YYYY-MM 또는 'Present', 선택적) */
  endDate?: string;

  /** 사용된 기술 목록 (Skill.id 참조) */
  techStack: string[];
}
