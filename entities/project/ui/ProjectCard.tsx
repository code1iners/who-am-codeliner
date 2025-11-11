import { cn } from '@/shared/lib/cn';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import type { Project } from '../model/types';

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard = ({ project, className }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      {project.imageUrl && (
        <div className='relative h-48 w-full bg-gray-100 dark:bg-gray-700'>
          <OptimizedImage
            src={project.imageUrl}
            alt={`${project.name} 스크린샷`}
            fill
            className='object-cover'
          />
        </div>
      )}
      <div className='flex flex-1 flex-col gap-3 p-6'>
        <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
          {project.name}
        </h3>
        <p className='line-clamp-3 text-sm text-gray-600 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mt-auto flex flex-wrap gap-2'>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className='rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            >
              {tech}
            </span>
          ))}
        </div>
        <div className='mt-4 flex gap-3'>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-400'
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-400'
            >
              라이브 데모
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
