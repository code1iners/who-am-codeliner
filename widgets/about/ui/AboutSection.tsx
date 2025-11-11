'use client';

import { PORTFOLIO_DATA } from '@/entities/portfolio';
import { Section } from '@/shared/ui/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

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

    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });
  });

  return (
    <Section id='about'>
      <h2
        ref={titleRef}
        className='mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100'
      >
        About Me
      </h2>
      <p
        ref={contentRef}
        className='text-lg leading-relaxed text-gray-600 dark:text-gray-300'
      >
        {PORTFOLIO_DATA.aboutMe}
      </p>
    </Section>
  );
};
