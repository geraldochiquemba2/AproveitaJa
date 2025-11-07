import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MarketplaceHeroProps {
  imageSrc: string;
  onSearch?: (query: string) => void;
}

export default function MarketplaceHero({ imageSrc, onSearch }: MarketplaceHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://videos.pexels.com/video-files/6169310/6169310-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            data-testid="text-hero-title"
          >
            Aproveita Já
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 mb-8 font-medium"
            data-testid="text-hero-subtitle"
          >
            Economize antes que expire. Produtos com até 70% de desconto!
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Procurar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-full bg-white/95 backdrop-blur-sm border-0"
                data-testid="input-search"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-8 py-6"
              data-testid="button-search"
            >
              Buscar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
