import Hero from '../Hero';
import heroImage from '@assets/generated_images/Modern_minimalist_architecture_hero_66c559ce.png';

export default function HeroExample() {
  return (
    <Hero
      title="Arquitetura Moderna & Minimalista"
      subtitle="Criando espaços que respiram"
      imageSrc={heroImage}
      onCtaClick={() => console.log('CTA clicked')}
    />
  );
}
