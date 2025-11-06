import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import heroImage from '@assets/generated_images/Modern_minimalist_architecture_hero_66c559ce.png';
import aboutImage from '@assets/generated_images/Architect_workspace_about_section_aaa27276.png';
import project1 from '@assets/generated_images/Residential_project_showcase_2e12f3b3.png';
import project2 from '@assets/generated_images/Interior_design_project_d523028d.png';
import project3 from '@assets/generated_images/Commercial_project_showcase_2286b3a8.png';
import project4 from '@assets/generated_images/Architectural_detail_texture_b08f0b07.png';
import project5 from '@assets/generated_images/Luxury_villa_project_3c9073b1.png';

export default function Home() {
  const projects = [
    {
      id: "1",
      title: "Casa Moderna",
      category: "Residencial",
      location: "São Paulo",
      year: "2024",
      imageSrc: project1,
    },
    {
      id: "2",
      title: "Espaço Interno",
      category: "Interior",
      location: "Rio de Janeiro",
      year: "2024",
      imageSrc: project2,
    },
    {
      id: "3",
      title: "Edifício Comercial",
      category: "Comercial",
      location: "Brasília",
      year: "2023",
      imageSrc: project3,
    },
    {
      id: "4",
      title: "Detalhes Arquitetônicos",
      category: "Conceito",
      location: "Curitiba",
      year: "2023",
      imageSrc: project4,
    },
    {
      id: "5",
      title: "Villa Contemporânea",
      category: "Residencial",
      location: "Florianópolis",
      year: "2024",
      imageSrc: project5,
    },
    {
      id: "6",
      title: "Residência Minimalista",
      category: "Residencial",
      location: "Porto Alegre",
      year: "2023",
      imageSrc: project1,
    },
  ];

  const handleHeroClick = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero
        title="Arquitetura Moderna & Minimalista"
        subtitle="Criando espaços que respiram"
        imageSrc={heroImage}
        onCtaClick={handleHeroClick}
      />
      
      <div id="projects">
        <ProjectGrid
          projects={projects}
          title="Projetos Selecionados"
          subtitle="Uma coleção de obras que definem nossa abordagem ao design moderno e funcional"
        />
      </div>
      
      <AboutSection
        imageSrc={aboutImage}
        title="Sobre o Estúdio"
        description="Com mais de uma década de experiência em arquitetura moderna e design minimalista, nosso estúdio se dedica a criar espaços que harmonizam funcionalidade e estética. Cada projeto é uma jornada única, onde forma e função se encontram para criar ambientes que inspiram."
        philosophy="Menos é mais. A verdadeira arquitetura não é sobre adicionar, mas sobre revelar a essência do espaço."
      />
      
      <ContactSection />
      <Footer />
    </div>
  );
}
