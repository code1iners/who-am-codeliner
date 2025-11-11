import { MobileMenu, Navigation } from '@/features/navigation';
import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-2xl'>👨‍💻</span>
          <span className='text-xl font-bold text-gray-900 dark:text-gray-100'>
            {siteConfig.name}
          </span>
        </Link>

        <div className='flex items-center gap-4'>
          <Navigation />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
