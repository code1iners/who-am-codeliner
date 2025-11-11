'use client';

import { PORTFOLIO_DATA } from '@/entities/portfolio';
import { OptimizedImage } from '@/shared';
import { Section } from '@/shared/ui/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
        })
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          bioRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          imageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
          },
          '-=0.8',
        );
    },
    { scope: containerRef },
  );

  return (
    <Section className='relative overflow-hidden pt-24 md:pt-32'>
      {/* 배경 장식 요소 */}
      <div className='absolute left-0 top-0 -z-10 h-full w-full'>
        <div className='absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl' />
        <div className='absolute right-[10%] top-[40%] h-96 w-96 rounded-full bg-purple-500/10 blur-3xl' />
      </div>

      <div
        ref={containerRef}
        className='grid gap-12 md:grid-cols-2 md:items-center'
      >
        <div className='flex flex-col gap-6'>
          <h1
            ref={titleRef}
            className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl'
          >
            {PORTFOLIO_DATA.name}
          </h1>
          <p
            ref={subtitleRef}
            className='text-xl font-medium text-blue-600 dark:text-blue-400'
          >
            {PORTFOLIO_DATA.title}
          </p>
          <p ref={bioRef} className='text-lg text-gray-600 dark:text-gray-300'>
            {PORTFOLIO_DATA.bio}
          </p>
        </div>

        <div
          ref={imageRef}
          className='relative mx-auto h-64 w-64 md:h-80 md:w-80'
        >
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-20 blur-2xl' />
          <OptimizedImage
            src={PORTFOLIO_DATA.profileImageUrl}
            alt={`${PORTFOLIO_DATA.name} 프로필 사진`}
            fill
            className='rounded-full object-cover shadow-xl'
            priority
          />
        </div>
      </div>
    </Section>
  );
};
