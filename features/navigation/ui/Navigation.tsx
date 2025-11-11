'use client';

import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';
import { scrollToSection } from '../lib/scroll-to-section';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  return (
    <nav
      className='hidden items-center gap-8 md:flex'
      aria-label='Main navigation'
    >
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className='text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
        >
          {item.label}
        </a>
      ))}
      <Link
        href={siteConfig.githubUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
      >
        GitHub
      </Link>
    </nav>
  );
};
