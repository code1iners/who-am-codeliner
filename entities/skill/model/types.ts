export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  /** 고유 식별자 (slug 형식: 소문자-하이픈) */
  id: string;

  /** 기술 이름 */
  name: string;

  /** 기술 아이콘 URL (Simple Icons CDN) */
  iconUrl: string;

  /** 숙련도 (선택적) */
  level?: SkillLevel;
}
