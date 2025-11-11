'use client';

import { ProjectCard, PROJECTS } from '@/entities/project';
import { Section } from '@/shared/ui/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );
    }
  });

  return (
    <Section id='projects' className='relative'>
      {/* 배경 장식 */}
      <div className='absolute left-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-3xl' />

      <h2
        ref={titleRef}
        className='mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100'
      >
        Projects
      </h2>
      <div ref={gridRef} className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};
