import ProjectGrid from '../ProjectGrid';
import project1 from '@assets/generated_images/Residential_project_showcase_2e12f3b3.png';
import project2 from '@assets/generated_images/Interior_design_project_d523028d.png';
import project3 from '@assets/generated_images/Commercial_project_showcase_2286b3a8.png';
import project4 from '@assets/generated_images/Architectural_detail_texture_b08f0b07.png';
import project5 from '@assets/generated_images/Luxury_villa_project_3c9073b1.png';

export default function ProjectGridExample() {
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
  ];

  return (
    <ProjectGrid
      projects={projects}
      title="Projetos Selecionados"
      subtitle="Uma coleção de obras que definem nossa abordagem ao design moderno e funcional"
    />
  );
}
