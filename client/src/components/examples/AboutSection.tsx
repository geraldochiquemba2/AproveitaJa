import AboutSection from '../AboutSection';
import aboutImage from '@assets/generated_images/Architect_workspace_about_section_aaa27276.png';

export default function AboutSectionExample() {
  return (
    <AboutSection
      imageSrc={aboutImage}
      title="Sobre o Estúdio"
      description="Com mais de uma década de experiência em arquitetura moderna e design minimalista, nosso estúdio se dedica a criar espaços que harmonizam funcionalidade e estética. Cada projeto é uma jornada única, onde forma e função se encontram para criar ambientes que inspiram."
      philosophy="Menos é mais. A verdadeira arquitetura não é sobre adicionar, mas sobre revelar a essência do espaço."
    />
  );
}
