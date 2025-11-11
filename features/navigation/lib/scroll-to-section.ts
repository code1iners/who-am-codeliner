/**
 * Smoothly scrolls to a section by ID
 * @param sectionId - The ID of the target section
 */
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
