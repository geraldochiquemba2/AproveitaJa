import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Store, Product } from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Store as StoreIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MarketplaceNav from '@/components/MarketplaceNav';
import { useLocation } from 'wouter';
import { getProvinces, getMunicipalities, type ProvinceName } from '@shared/angola-locations';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceName | ''>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [productProvince, setProductProvince] = useState<ProvinceName | ''>('');
  const [productMunicipality, setProductMunicipality] = useState('');
  const [discountedPriceInput, setDiscountedPriceInput] = useState('');

  const { data: stores, isLoading: storesLoading } = useQuery<Store[]>({
    queryKey: ['/api/stores/my'],
    enabled: user?.role === 'seller',
  });

  const store = stores?.[0];

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/store', store?.id],
    enabled: !!store?.id,
  });

  const createStoreMutation = useMutation({
    mutationFn: async (data: {
      storeName: string;
      supervisorPhone: string;
      province: string;
      municipality: string;
      address: string;
    }) => {
      const response = await apiRequest('POST', '/api/stores', data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/stores/my'] });
      setStoreDialogOpen(false);
      setSelectedProvince('');
      setSelectedMunicipality('');
      toast({ title: 'Loja criada com sucesso!' });
    },
    onError: (error: any) => {
      toast({ title: 'Erro ao criar loja', description: error.message, variant: 'destructive' });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await apiRequest('POST', '/api/products', productData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products/store', store?.id] });
      setProductDialogOpen(false);
      setProductProvince('');
      setProductMunicipality('');
      setDiscountedPriceInput('');
      toast({ title: 'Produto adicionado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ title: 'Erro ao adicionar produto', description: error.message, variant: 'destructive' });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      const response = await apiRequest('PATCH', `/api/products/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products/store', store?.id] });
      setEditingProduct(null);
      toast({ title: 'Produto atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ title: 'Erro ao atualizar produto', description: error.message, variant: 'destructive' });
    },
  });

  const handleStoreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedProvince || !selectedMunicipality) {
      toast({ 
        title: 'Erro', 
        description: 'Por favor, selecione a província e o município',
        variant: 'destructive' 
      });
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    createStoreMutation.mutate({
      storeName: formData.get('storeName') as string,
      supervisorPhone: formData.get('supervisorPhone') as string,
      province: selectedProvince,
      municipality: selectedMunicipality,
      address: formData.get('address') as string,
    });
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!productProvince || !productMunicipality) {
      toast({ 
        title: 'Erro', 
        description: 'Por favor, selecione a província e o município',
        variant: 'destructive' 
      });
      return;
    }
    
    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      toast({ 
        title: 'Erro', 
        description: 'Por favor, selecione uma imagem',
        variant: 'destructive' 
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      const baseDiscountedPrice = parseFloat(formData.get('discountedPrice') as string);
      const finalDiscountedPrice = baseDiscountedPrice * 1.10;
      
      const productData = {
        storeId: store!.id,
        name: formData.get('name') as string,
        originalPrice: formData.get('originalPrice') as string,
        discountedPrice: finalDiscountedPrice.toFixed(2),
        expirationDate: new Date(formData.get('expirationDate') as string).toISOString(),
        imageUrl: base64String,
        province: productProvince,
        municipality: productMunicipality,
        supervisorPhone: formData.get('supervisorPhone') as string,
        stockQuantity: formData.get('stockQuantity') as string,
      };
      
      createProductMutation.mutate(productData);
    };
    
    reader.readAsDataURL(imageFile);
  };

  const handleDeactivateProduct = (id: string) => {
    updateProductMutation.mutate({ id, data: { isActive: false } });
  };

  if (user?.role !== 'seller') {
    setLocation('/');
    return null;
  }

  if (storesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen">
        <MarketplaceNav />
        <div className="max-w-2xl mx-auto p-4 sm:p-6 mt-6 sm:mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao Aproveita Já</CardTitle>
              <CardDescription>
                Para começar a vender, você precisa criar sua loja primeiro.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={storeDialogOpen} onOpenChange={setStoreDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-store">
                    <StoreIcon className="mr-2 h-4 w-4" />
                    Criar Minha Loja
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Loja</DialogTitle>
                    <DialogDescription>
                      Preencha as informações da sua loja
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleStoreSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="storeName">Nome da Loja</Label>
                      <Input
                        id="storeName"
                        name="storeName"
                        required
                        data-testid="input-store-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="supervisorPhone">Telefone do Supervisor</Label>
                      <Input
                        id="supervisorPhone"
                        name="supervisorPhone"
                        type="tel"
                        required
                        data-testid="input-supervisor-phone"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="province">Província</Label>
                        <Select
                          value={selectedProvince}
                          onValueChange={(value) => {
                            setSelectedProvince(value as ProvinceName);
                            setSelectedMunicipality('');
                          }}
                        >
                          <SelectTrigger id="province" data-testid="select-province">
                            <SelectValue placeholder="Selecione a província" />
                          </SelectTrigger>
                          <SelectContent>
                            {getProvinces().map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="municipality">Município</Label>
                        <Select
                          value={selectedMunicipality}
                          onValueChange={setSelectedMunicipality}
                          disabled={!selectedProvince}
                        >
                          <SelectTrigger id="municipality" data-testid="select-municipality">
                            <SelectValue placeholder="Selecione o município" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedProvince && getMunicipalities(selectedProvince).map((municipality) => (
                              <SelectItem key={municipality} value={municipality}>
                                {municipality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço Completo</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        data-testid="input-address"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={createStoreMutation.isPending}
                      data-testid="button-submit-store"
                      className="w-full"
                    >
                      {createStoreMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        'Criar Loja'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-6">
      <MarketplaceNav />
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold" data-testid="text-dashboard-title">
            Minha Loja: {store.storeName}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground break-words">{store.address}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Meus Produtos</h2>
          <Dialog 
            open={productDialogOpen} 
            onOpenChange={(open) => {
              setProductDialogOpen(open);
              if (!open) {
                setDiscountedPriceInput('');
                setProductProvince('');
                setProductMunicipality('');
              }
            }}
          >
            <DialogTrigger asChild>
              <Button data-testid="button-add-product" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
                <DialogDescription>
                  Preencha as informações do produto
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    data-testid="input-product-name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originalPrice">Preço Original (Kz)</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      step="0.01"
                      required
                      data-testid="input-original-price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountedPrice">Preço com Desconto (Kz)</Label>
                    <Input
                      id="discountedPrice"
                      name="discountedPrice"
                      type="number"
                      step="0.01"
                      required
                      data-testid="input-discounted-price"
                      onChange={(e) => setDiscountedPriceInput(e.target.value)}
                    />
                    {discountedPriceInput && parseFloat(discountedPriceInput) > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Preço Final (com taxa de 10%):</strong>{' '}
                        <span className="text-primary font-semibold">
                          {(parseFloat(discountedPriceInput) * 1.10).toFixed(2)} Kz
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="expirationDate">Data de Validade</Label>
                  <Input
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    required
                    data-testid="input-expiration-date"
                  />
                </div>
                <div>
                  <Label htmlFor="stockQuantity">Quantidade em Estoque</Label>
                  <Input
                    id="stockQuantity"
                    name="stockQuantity"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Ex: 100"
                    required
                    data-testid="input-stock-quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Foto do Produto</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    required
                    data-testid="input-product-image"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tire uma foto ou selecione do dispositivo
                  </p>
                </div>
                <div>
                  <Label htmlFor="supervisorPhone">Telefone do Supervisor</Label>
                  <Input
                    id="supervisorPhone"
                    name="supervisorPhone"
                    type="tel"
                    placeholder="+244 923 456 789"
                    required
                    data-testid="input-supervisor-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="productProvince">Província</Label>
                  <Select 
                    value={productProvince} 
                    onValueChange={(value) => {
                      setProductProvince(value as ProvinceName);
                      setProductMunicipality('');
                    }}
                  >
                    <SelectTrigger id="productProvince" data-testid="select-product-province">
                      <SelectValue placeholder="Selecione a província" />
                    </SelectTrigger>
                    <SelectContent>
                      {getProvinces().map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {productProvince && (
                  <div>
                    <Label htmlFor="productMunicipality">Município</Label>
                    <Select value={productMunicipality} onValueChange={setProductMunicipality}>
                      <SelectTrigger id="productMunicipality" data-testid="select-product-municipality">
                        <SelectValue placeholder="Selecione o município" />
                      </SelectTrigger>
                      <SelectContent>
                        {getMunicipalities(productProvince).map((municipality) => (
                          <SelectItem key={municipality} value={municipality}>
                            {municipality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={createProductMutation.isPending}
                  data-testid="button-submit-product"
                  className="w-full"
                >
                  {createProductMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adicionando...
                    </>
                  ) : (
                    'Adicionar Produto'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {productsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} data-testid={`card-product-${product.id}`}>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-xs">
                    Validade: {new Date(product.expirationDate).toLocaleDateString('pt-AO')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Original</p>
                      <p className="font-semibold">{parseFloat(product.originalPrice).toFixed(2)} Kz</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Desconto</p>
                      <p className="font-semibold text-primary">
                        {parseFloat(product.discountedPrice).toFixed(2)} Kz
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Estoque</p>
                      <p className="font-semibold" data-testid={`stock-${product.id}`}>
                        {parseFloat(product.stockQuantity).toFixed(0)} unidades
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                      data-testid={`status-${product.id}`}
                    >
                      {product.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeactivateProduct(product.id)}
                      disabled={!product.isActive || updateProductMutation.isPending}
                      data-testid={`button-deactivate-${product.id}`}
                      className="flex-1"
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Remover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Você ainda não tem produtos. Clique em "Adicionar Produto" para começar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
