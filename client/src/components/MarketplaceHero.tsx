import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import heroVideo1 from "@assets/hero-video-compressed.mp4";
import heroVideo2 from "@assets/hero-video-2-compressed.mp4";
import heroVideo3 from "@assets/hero-video-3-compressed.mp4";

interface MarketplaceHeroProps {
  imageSrc: string;
  onSearch?: (query: string) => void;
}

const videos = [heroVideo1, heroVideo2, heroVideo3];

export default function MarketplaceHero({ imageSrc, onSearch }: MarketplaceHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.load();
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    playVideo();
  }, [currentVideoIndex]);

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={handleVideoEnded}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-20" />

      <div className="relative h-full flex items-center justify-center px-4 z-30">
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
