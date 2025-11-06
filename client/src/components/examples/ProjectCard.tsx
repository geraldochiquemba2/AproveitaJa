import ProjectCard from '../ProjectCard';
import projectImage from '@assets/generated_images/Residential_project_showcase_2e12f3b3.png';

export default function ProjectCardExample() {
  return (
    <div className="max-w-sm">
      <ProjectCard
        id="1"
        title="Casa Moderna"
        category="Residencial"
        location="São Paulo"
        year="2024"
        imageSrc={projectImage}
      />
    </div>
  );
}
