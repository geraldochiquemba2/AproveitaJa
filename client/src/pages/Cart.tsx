import { useLocation } from 'wouter';
import { useCart } from '@/lib/cart';
import MarketplaceNav from '@/components/MarketplaceNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      title: 'Produto removido',
      description: `${productName} foi removido do carrinho.`,
    });
  };

  const handleCheckout = () => {
    setLocation('/checkout/carrinho');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-6">
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-cart-title">
          Meu Carrinho
        </h1>

        {items.length === 0 ? (
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
            {items.map((item) => {
              const discountedPrice = parseFloat(item.product.discountedPrice);
              const originalPrice = parseFloat(item.product.originalPrice);
              const itemTotal = discountedPrice * item.quantity;

              return (
                <Card key={item.product.id} data-testid={`cart-item-${item.product.id}`}>
                  <CardHeader>
                    <div className="flex gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg">{item.product.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{item.product.category}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                            data-testid={`button-remove-${item.product.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground line-through">
                          {originalPrice.toFixed(2)} Kz
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {discountedPrice.toFixed(2)} Kz
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.product.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 1;
                            updateQuantity(item.product.id, newQty);
                          }}
                          className="w-16 text-center"
                          data-testid={`input-quantity-${item.product.id}`}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.product.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Subtotal</p>
                        <p className="text-lg font-bold">
                          {itemTotal.toFixed(2)} Kz
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary" data-testid="text-total">
                      {total.toFixed(2)} Kz
                    </span>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleCheckout}
                    data-testid="button-checkout"
                  >
                    Finalizar Compra
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Você precisará fazer login ou criar uma conta para finalizar a compra
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
