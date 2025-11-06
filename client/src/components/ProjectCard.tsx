import { Link } from "wouter";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  imageSrc: string;
}

export default function ProjectCard({
  id,
  title,
  category,
  location,
  year,
  imageSrc,
}: ProjectCardProps) {
  return (
    <Link href={`/projeto/${id}`}>
      <div
        className="group relative aspect-[3/4] overflow-hidden rounded-md cursor-pointer"
        data-testid={`card-project-${id}`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl md:text-2xl font-light mb-2" data-testid={`text-project-title-${id}`}>
              {title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-white/80 mb-1" data-testid={`text-project-category-${id}`}>
              {category}
            </p>
            <p className="text-sm text-white/70" data-testid={`text-project-location-${id}`}>
              {location} · {year}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
