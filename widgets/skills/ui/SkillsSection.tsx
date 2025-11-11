'use client';

import { SKILLS, SkillCard } from '@/entities/skill';
import { Section } from '@/shared/ui/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 90%',
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
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
      );
    }
  });

  return (
    <Section id='skills' className='relative'>
      {/* 배경 장식 */}
      <div className='absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-3xl' />

      <h2
        ref={titleRef}
        className='mb-12 text-3xl font-bold text-gray-900 dark:text-gray-100'
      >
        Skills
      </h2>
      <div
        ref={gridRef}
        className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
      >
        {SKILLS.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </Section>
  );
};
