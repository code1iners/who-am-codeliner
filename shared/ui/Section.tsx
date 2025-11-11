import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
}

export const Section = ({
  children,
  id,
  className,
  ...props
}: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx('py-16 px-4 md:px-8 lg:px-12', className)}
      {...props}
    >
      <div className='mx-auto max-w-7xl'>{children}</div>
    </section>
  );
};
