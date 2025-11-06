import ProjectCard from "./ProjectCard";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  imageSrc: string;
}

interface ProjectGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export default function ProjectGrid({ projects, title, subtitle }: ProjectGridProps) {
  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16 md:mb-24">
            {title && (
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4" data-testid="text-section-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl mx-auto" data-testid="text-section-subtitle">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
