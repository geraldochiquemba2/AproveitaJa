import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface MarketplaceHeroProps {
  imageSrc: string;
  onSearch?: (query: string) => void;
}

const videos = [
  "/videos/marketplace.mp4",
  "/videos/marketplace2.mp4"
];

export default function MarketplaceHero({ imageSrc, onSearch }: MarketplaceHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoIndex]);

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <img
        src={imageSrc}
        alt="Marketplace"
        loading="eager"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          onEnded={handleVideoEnded}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
      )}
      
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
