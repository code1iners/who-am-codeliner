'use client';

import { siteConfig } from '@/shared/config/site';
import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const ContactsSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  return (
    <Section
      id='contact'
      className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'
    >
      <div ref={contentRef} className='mx-auto max-w-2xl text-center'>
        <h2 className='mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100'>
          Let&apos;s Connect
        </h2>
        <p className='mb-8 text-lg text-gray-600 dark:text-gray-300'>
          프로젝트 협업이나 새로운 기회에 관심이 있으시다면 언제든 연락해주세요.
        </p>
        <Link
          href={siteConfig.githubUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button size='lg' variant='primary'>
            GitHub 프로필 보기
          </Button>
        </Link>
      </div>
    </Section>
  );
};
