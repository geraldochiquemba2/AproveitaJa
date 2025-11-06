import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Order, Product, Store, User } from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Package, MapPin, Phone, User as UserIcon, Store as StoreIcon, ArrowLeft } from 'lucide-react';
import MarketplaceNav from '@/components/MarketplaceNav';

type OrderWithDetails = Order & {
  product: Product;
  store: Store;
  buyer: User;
};

export default function AdminPanel() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: orders, isLoading } = useQuery<OrderWithDetails[]>({
    queryKey: ['/api/orders'],
    enabled: user?.role === 'admin',
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await apiRequest('PATCH', `/api/orders/${orderId}/status`, { status });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({ title: 'Status atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (user?.role !== 'admin') {
    setLocation('/');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em Processamento';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen pb-6">
      <MarketplaceNav />
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-admin-title">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Coordenação de pedidos e logística
          </p>
        </div>

        {!orders || orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Nenhum pedido registrado ainda.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} data-testid={`card-order-${order.id}`}>
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Pedido #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(order.createdAt).toLocaleDateString('pt-AO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        Informações do Comprador
                      </h3>
                      <div className="text-sm space-y-1 text-muted-foreground">
                        <p><strong>Nome:</strong> {order.buyer.name}</p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <strong>Telefone:</strong> {order.buyer.phone}
                        </p>
                        {order.buyer.address && (
                          <p><strong>Endereço:</strong> {order.buyer.address}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Detalhes do Produto
                      </h3>
                      <div className="text-sm space-y-1 text-muted-foreground">
                        <p><strong>Nome:</strong> {order.product.name}</p>
                        <p><strong>Quantidade:</strong> {order.quantity}</p>
                        <p>
                          <strong>Preço Original:</strong>{' '}
                          <span className="line-through">
                            {parseFloat(order.product.originalPrice).toFixed(2)} Kz
                          </span>
                        </p>
                        <p>
                          <strong>Preço com Desconto:</strong>{' '}
                          <span className="text-primary font-semibold">
                            {parseFloat(order.product.discountedPrice).toFixed(2)} Kz
                          </span>
                        </p>
                        <p>
                          <strong>Total:</strong>{' '}
                          <span className="text-primary font-semibold">
                            {parseFloat(order.totalPrice).toFixed(2)} Kz
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <StoreIcon className="h-4 w-4" />
                        Informações da Loja
                      </h3>
                      <div className="text-sm space-y-1 text-muted-foreground">
                        <p><strong>Nome:</strong> {order.store.storeName}</p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <strong>Supervisor:</strong> {order.store.supervisorPhone}
                        </p>
                        <p><strong>Província:</strong> {order.store.province}</p>
                        <p><strong>Município:</strong> {order.store.municipality}</p>
                        <p><strong>Endereço:</strong> {order.store.address}</p>
                        {order.store.latitude && order.store.longitude && (
                          <p>
                            <strong>Coordenadas:</strong> {order.store.latitude}, {order.store.longitude}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Informações de Entrega
                      </h3>
                      <div className="text-sm space-y-1 text-muted-foreground">
                        <p>
                          <strong>Tipo:</strong>{' '}
                          {order.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}
                        </p>
                        {order.deliveryType === 'delivery' && order.deliveryAddress && (
                          <>
                            <p><strong>Endereço:</strong> {order.deliveryAddress}</p>
                            {order.deliveryLatitude && order.deliveryLongitude && (
                              <p>
                                <strong>Coordenadas:</strong> {order.deliveryLatitude}, {order.deliveryLongitude}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-sm font-medium">Atualizar Status:</span>
                    <Select
                      value={order.status}
                      onValueChange={(status) =>
                        updateStatusMutation.mutate({ orderId: order.id, status })
                      }
                    >
                      <SelectTrigger className="w-[200px]" data-testid={`select-status-${order.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="processing">Em Processamento</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
