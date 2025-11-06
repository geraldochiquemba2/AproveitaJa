import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  onCtaClick?: () => void;
}

export default function Hero({ title, subtitle, imageSrc, onCtaClick }: HeroProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6"
            data-testid="text-hero-title"
          >
            {title}
          </h1>
          <p 
            className="text-lg md:text-xl text-white/90 mb-8 font-light"
            data-testid="text-hero-subtitle"
          >
            {subtitle}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-base"
            onClick={onCtaClick}
            data-testid="button-hero-cta"
          >
            Ver Projetos
          </Button>
        </div>
      </div>
    </section>
  );
}
