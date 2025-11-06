interface AboutSectionProps {
  imageSrc: string;
  title: string;
  description: string;
  philosophy: string;
}

export default function AboutSection({ imageSrc, title, description, philosophy }: AboutSectionProps) {
  return (
    <section className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6" data-testid="text-about-title">
              {title}
            </h2>
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-8" data-testid="text-about-description">
              {description}
            </p>
            <div className="border-l-2 border-primary pl-6">
              <p className="text-base md:text-lg text-muted-foreground italic leading-relaxed" data-testid="text-about-philosophy">
                "{philosophy}"
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="aspect-[16/9] rounded-md overflow-hidden">
              <img
                src={imageSrc}
                alt="Sobre"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
