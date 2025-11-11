import { siteConfig } from '@/shared/config/site';
import { AboutSection } from '@/widgets/about';
import { ContactsSection } from '@/widgets/contacts';
import { HeroSection } from '@/widgets/hero';
import { ProjectsSection } from '@/widgets/projects';
import { SkillsSection } from '@/widgets/skills';

// Force static generation for this page
export const dynamic = 'force-static';

export default function Home() {
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    alternateName: 'Codeliners',
    url: siteConfig.url,
    jobTitle: 'Front-End Developer',
    description: siteConfig.description,
    sameAs: [siteConfig.githubUrl],
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='min-h-screen'>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactsSection />
      </main>
    </>
  );
}
