import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Product, Store } from '@shared/schema';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Package, ArrowLeft } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MarketplaceNav from '@/components/MarketplaceNav';

const MARKETPLACE_FEE = 0.15;

export default function Checkout() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [address, setAddress] = useState(user?.address || '');
  const [latitude, setLatitude] = useState(user?.latitude || '');
  const [longitude, setLongitude] = useState(user?.longitude || '');

  const isCartCheckout = id === 'carrinho';

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
    enabled: !!id && !isCartCheckout,
  });

  const { data: store } = useQuery<Store>({
    queryKey: ['/api/stores', product?.storeId],
    queryFn: async () => {
      const res = await fetch(`/api/stores/${product?.storeId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch store');
      return res.json();
    },
    enabled: !!product?.storeId && !isCartCheckout,
  });

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (isCartCheckout) {
        const orders = await Promise.all(
          items.map(async (item) => {
            const discountedPrice = parseFloat(item.product.discountedPrice);
            const totalPrice = (discountedPrice * item.quantity) * (1 + MARKETPLACE_FEE);

            const orderData = {
              productId: item.product.id,
              quantity: item.quantity.toString(),
              deliveryType,
              totalPrice: totalPrice.toString(),
              ...(deliveryType === 'delivery' && {
                deliveryAddress: address,
                deliveryLatitude: latitude,
                deliveryLongitude: longitude,
              }),
            };

            const response = await apiRequest('POST', '/api/orders', orderData);
            return await response.json();
          })
        );
        return orders;
      } else {
        if (!product) throw new Error('Produto não encontrado');
        
        const discountedPrice = parseFloat(product.discountedPrice);
        const totalPrice = discountedPrice * (1 + MARKETPLACE_FEE);

        const orderData = {
          productId: product.id,
          deliveryType,
          totalPrice: totalPrice.toString(),
          ...(deliveryType === 'delivery' && {
            deliveryAddress: address,
            deliveryLatitude: latitude,
            deliveryLongitude: longitude,
          }),
        };

        const response = await apiRequest('POST', '/api/orders', orderData);
        return await response.json();
      }
    },
    onSuccess: () => {
      if (isCartCheckout) {
        clearCart();
      }
      toast({
        title: 'Pedido realizado com sucesso!',
        description: 'Você receberá mais informações em breve.',
      });
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao realizar pedido',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (isLoading && !isCartCheckout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isCartCheckout && !product) {
    return (
      <div className="min-h-screen">
        <MarketplaceNav />
        <div className="max-w-2xl mx-auto p-6 mt-12 text-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
          <Button onClick={() => setLocation('/')} className="mt-4">
            Voltar à página inicial
          </Button>
        </div>
      </div>
    );
  }

  if (isCartCheckout && items.length === 0) {
    return (
      <div className="min-h-screen">
        <MarketplaceNav />
        <div className="max-w-2xl mx-auto p-6 mt-12 text-center">
          <p className="text-muted-foreground">Seu carrinho está vazio</p>
          <Button onClick={() => setLocation('/')} className="mt-4">
            Ver Produtos
          </Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (isCartCheckout) {
      return items.reduce((sum, item) => {
        const discountedPrice = parseFloat(item.product.discountedPrice);
        return sum + (discountedPrice * item.quantity * (1 + MARKETPLACE_FEE));
      }, 0);
    } else if (product) {
      const discountedPrice = parseFloat(product.discountedPrice);
      return discountedPrice * (1 + MARKETPLACE_FEE);
    }
    return 0;
  };

  const totalPrice = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deliveryType === 'delivery' && (!address || !latitude || !longitude)) {
      toast({
        title: 'Informação faltando',
        description: 'Por favor, preencha todos os campos de entrega.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    createOrderMutation.mutate();
  };

  return (
    <>
      <div className="min-h-screen pb-6">
        <MarketplaceNav />
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          <Button
            variant="ghost"
            onClick={() => setLocation(isCartCheckout ? '/carrinho' : `/produto/${id}`)}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Finalizar Compra</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isCartCheckout ? 'Resumo do Carrinho' : 'Resumo do Produto'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isCartCheckout ? (
                  <>
                    {items.map((item) => {
                      const discountedPrice = parseFloat(item.product.discountedPrice);
                      const itemTotal = discountedPrice * item.quantity;
                      return (
                        <div key={item.product.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantidade: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              {itemTotal.toFixed(2)} Kz
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : product ? (
                  <div className="flex gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      {store && (
                        <p className="text-sm text-muted-foreground">{store.storeName}</p>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="border-t pt-4 space-y-2">
                  {!isCartCheckout && product && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Preço com desconto:</span>
                        <span>{parseFloat(product.discountedPrice).toFixed(2)} Kz</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxa de serviço (15%):</span>
                        <span>{(parseFloat(product.discountedPrice) * MARKETPLACE_FEE).toFixed(2)} Kz</span>
                      </div>
                    </>
                  )}
                  {isCartCheckout && (
                    <div className="flex justify-between text-sm">
                      <span>Taxa de serviço (15%):</span>
                      <span>Incluída no total</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-primary" data-testid="text-total">{totalPrice.toFixed(2)} Kz</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tipo de Entrega</CardTitle>
                <CardDescription>Escolha como deseja receber seu pedido</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as 'pickup' | 'delivery')}>
                  <div className="flex items-center space-x-2 p-4 border rounded hover-elevate">
                    <RadioGroupItem value="pickup" id="pickup" data-testid="radio-pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Retirar na Loja</p>
                          {!isCartCheckout && store && (
                            <p className="text-sm text-muted-foreground">{store.address}</p>
                          )}
                          {isCartCheckout && (
                            <p className="text-sm text-muted-foreground">Você combinará com cada vendedor</p>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded hover-elevate">
                    <RadioGroupItem value="delivery" id="delivery" data-testid="radio-delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Entrega no Endereço</p>
                          <p className="text-sm text-muted-foreground">
                            Receba em casa
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {deliveryType === 'delivery' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endereço de Entrega</CardTitle>
                  <CardDescription>
                    Informe onde deseja receber seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro"
                      required
                      data-testid="input-address"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="-8.838333"
                        required
                        data-testid="input-latitude"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="13.234444"
                        required
                        data-testid="input-longitude"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={createOrderMutation.isPending}
              data-testid="button-confirm-order"
            >
              {createOrderMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                `Confirmar Pedido - ${totalPrice.toFixed(2)} Kz`
              )}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Necessário</AlertDialogTitle>
            <AlertDialogDescription>
              Para finalizar sua compra, você precisa fazer login ou criar uma conta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAuthDialog(false)}
              data-testid="button-cancel-auth"
            >
              Cancelar
            </Button>
            <Button 
              onClick={() => setLocation('/login')}
              data-testid="button-go-login"
            >
              Fazer Login
            </Button>
            <Button 
              onClick={() => setLocation('/registro')}
              data-testid="button-go-register"
            >
              Criar Conta
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
