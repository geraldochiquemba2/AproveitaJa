import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Product, Store } from '@shared/schema';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, ShoppingCart, ArrowLeft, Plus } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MarketplaceNav from '@/components/MarketplaceNav';

const MARKETPLACE_FEE = 0.15;

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
    enabled: !!id,
  });

  const { data: store } = useQuery<Store>({
    queryKey: ['/api/stores', product?.storeId],
    queryFn: async () => {
      const res = await fetch(`/api/stores/${product?.storeId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch store');
      return res.json();
    },
    enabled: !!product?.storeId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <MarketplaceNav />
        <div className="max-w-4xl mx-auto p-6 mt-12 text-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
          <Button onClick={() => setLocation('/')} className="mt-4">
            Voltar à página inicial
          </Button>
        </div>
      </div>
    );
  }

  const discountedPrice = parseFloat(product.discountedPrice);
  const originalPrice = parseFloat(product.originalPrice);
  const priceWithFee = discountedPrice * (1 + MARKETPLACE_FEE);
  const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  
  const daysUntilExpiration = Math.ceil(
    (new Date(product.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      toast({
        title: 'Produto adicionado!',
        description: `${product.name} foi adicionado ao carrinho.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product, 1);
    }
    setLocation('/carrinho');
  };

  return (
    <div className="min-h-screen pb-6">
      <MarketplaceNav />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground font-bold text-lg px-4 py-2">
              -{discountPercent}%
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-product-name">
                {product.name}
              </h1>
              {store && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span data-testid="text-store-name">{store.storeName}</span>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Preço com Desconto + Taxa</p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary" data-testid="text-price">
                    {priceWithFee.toFixed(2)} Kz
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inclui taxa de serviço de 15%
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preço Original:</span>
                  <span className="line-through" data-testid="text-original-price">
                    {originalPrice.toFixed(2)} Kz
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Você economiza:</span>
                  <span className="text-green-600 font-semibold">
                    {(originalPrice - priceWithFee).toFixed(2)} Kz
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className={`flex items-center gap-2 text-sm ${daysUntilExpiration <= 1 ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
              <Clock className="h-4 w-4" />
              <span data-testid="text-expiration">
                {daysUntilExpiration <= 1 ? 'Expira hoje!' : `Expira em ${daysUntilExpiration} dias`}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <Plus className="mr-2 h-5 w-5" />
                Adicionar
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
                data-testid="button-buy-now"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Comprar
              </Button>
            </div>

            {store && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Informações da Loja</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Nome:</strong> {store.storeName}</p>
                    <p><strong>Endereço:</strong> {store.address}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
