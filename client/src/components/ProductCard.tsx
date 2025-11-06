import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  storeName: string;
  imageUrl: string;
  expirationDate: string;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  originalPrice,
  discountedPrice,
  storeName,
  imageUrl,
  expirationDate,
  onClick,
}: ProductCardProps) {
  const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  
  const daysUntilExpiration = Math.ceil(
    (new Date(expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isUrgent = daysUntilExpiration <= 1;

  return (
    <div
      className="group cursor-pointer bg-card rounded-lg overflow-hidden border border-card-border hover-elevate active-elevate-2 transition-shadow"
      onClick={onClick}
      data-testid={`card-product-${id}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge
          className="absolute top-2 right-2 bg-destructive text-destructive-foreground font-bold px-3 py-1"
          data-testid={`badge-discount-${id}`}
        >
          -{discountPercent}%
        </Badge>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base line-clamp-2" data-testid={`text-product-name-${id}`}>
          {name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span data-testid={`text-store-${id}`}>{storeName}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground" data-testid={`text-price-${id}`}>
            {discountedPrice.toFixed(2)} Kz
          </span>
          <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
            {originalPrice.toFixed(2)} Kz
          </span>
        </div>

        <div className={`flex items-center gap-1 text-xs ${isUrgent ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
          <Clock className="h-3 w-3" />
          <span data-testid={`text-expiration-${id}`}>
            {isUrgent ? 'Expira hoje!' : `Expira em ${daysUntilExpiration} dias`}
          </span>
        </div>
      </div>
    </div>
  );
}
