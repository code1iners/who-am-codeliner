import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import type { Skill } from '../model/types';

export interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className='flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800'>
      <div className='relative h-16 w-16'>
        <OptimizedImage
          src={skill.iconUrl}
          alt={`${skill.name} icon`}
          fill
          className='object-contain'
        />
      </div>
      <h3 className='text-center text-sm font-medium text-gray-900 dark:text-gray-100'>
        {skill.name}
      </h3>
    </div>
  );
};
