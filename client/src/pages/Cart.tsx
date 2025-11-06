import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import MarketplaceNav from '@/components/MarketplaceNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<any[]>([]);

  if (!user) {
    setLocation('/login');
    return null;
  }

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast({
      title: 'Produto removido',
      description: 'O produto foi removido do carrinho.',
    });
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.discountedPrice), 0);

  return (
    <div className="min-h-screen pb-20 md:pb-6">
      <MarketplaceNav cartCount={cartItems.length} />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-cart-title">
          Meu Carrinho
        </h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground mb-6">
                Adicione produtos antes que expirem!
              </p>
              <Button onClick={() => setLocation('/')} data-testid="button-browse">
                Ver Produtos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground line-through">
                        {parseFloat(item.originalPrice).toFixed(2)} Kz
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {parseFloat(item.discountedPrice).toFixed(2)} Kz
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {total.toFixed(2)} Kz
                  </span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation('/checkout')}
                  data-testid="button-checkout"
                >
                  Finalizar Compra
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
