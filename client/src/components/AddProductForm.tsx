import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface AddProductFormProps {
  onSubmit: (productData: any) => void;
}

export default function AddProductForm({ onSubmit }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    expirationDate: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const discountPercent = formData.originalPrice && formData.discountedPrice
    ? Math.round(((Number(formData.originalPrice) - Number(formData.discountedPrice)) / Number(formData.originalPrice)) * 100)
    : 0;

  const isValidDiscount = discountPercent >= 50;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Pão Fresco"
                required
                data-testid="input-product-name"
              />
            </div>

            <div>
              <Label htmlFor="originalPrice">Preço Original (Kz)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="500.00"
                required
                data-testid="input-original-price"
              />
            </div>

            <div>
              <Label htmlFor="discountedPrice">
                Preço com Desconto (Kz)
                {discountPercent > 0 && (
                  <span className={`ml-2 text-sm ${isValidDiscount ? 'text-green-600' : 'text-destructive'}`}>
                    ({discountPercent}% desconto)
                  </span>
                )}
              </Label>
              <Input
                id="discountedPrice"
                type="number"
                step="0.01"
                value={formData.discountedPrice}
                onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                placeholder="250.00"
                required
                data-testid="input-discounted-price"
              />
              {!isValidDiscount && formData.originalPrice && formData.discountedPrice && (
                <p className="text-sm text-destructive mt-1">
                  O desconto deve ser no mínimo 50%
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="expirationDate">Data de Validade</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
                data-testid="input-expiration-date"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="imageUrl">URL da Imagem do Produto</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                  data-testid="input-image-url"
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isValidDiscount}
            data-testid="button-submit-product"
          >
            Publicar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
