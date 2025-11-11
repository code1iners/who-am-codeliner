'use client';

import { siteConfig } from '@/shared/config/site';
import { Dialog, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';
import { scrollToSection } from '../lib/scroll-to-section';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        aria-label='Open menu'
      >
        <svg
          className='h-6 w-6'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50 md:hidden'
      >
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        <div className='fixed inset-0 flex items-start justify-end p-4'>
          <DialogPanel className='w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                Menu
              </h2>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                aria-label='Close menu'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <nav className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className='text-left text-base font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
                >
                  {item.label}
                </button>
              ))}
              <Link
                href={siteConfig.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => setIsOpen(false)}
                className='text-base font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
              >
                GitHub
              </Link>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
