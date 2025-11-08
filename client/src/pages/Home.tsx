import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import MarketplaceNav from "@/components/MarketplaceNav";
import MarketplaceHero from "@/components/MarketplaceHero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

import heroImage from '@assets/generated_images/Hero_image_shoppers_Angola_00c6e573.png';
import padariaImg from '@assets/stock_images/fresh_bakery_bread_p_3b5fff0c.jpg';
import laticiniosImg from '@assets/stock_images/dairy_products_milk__cc494009.jpg';
import frutasImg from '@assets/stock_images/fresh_colorful_fruit_dfd109f7.jpg';
import bebidasImg from '@assets/stock_images/beverages_drinks_beb_c5a8a04d.jpg';
import snacksImg from '@assets/stock_images/snacks_chips_treats_c90f0da2.jpg';
import destaqueImg from '@assets/stock_images/grocery_shopping_pro_88af1288.jpg';

const MARKETPLACE_FEE = 0.15;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [, setLocation] = useLocation();
  const productsRef = useRef<HTMLElement>(null);

  const categoryBackgrounds: Record<string, string> = {
    "Padaria": padariaImg,
    "Laticínios": laticiniosImg,
    "Frutas": frutasImg,
    "Bebidas": bebidasImg,
    "Snacks": snacksImg,
  };

  useEffect(() => {
    const allImages = [...Object.values(categoryBackgrounds), destaqueImg];
    allImages.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  }, []);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = ["Padaria", "Laticínios", "Frutas", "Bebidas", "Snacks", "Carnes", "Mercearia", "Congelados", "Higiene"];

  const filteredProducts = selectedCategory
    ? (products || []).filter((p: any) => p.category === selectedCategory)
    : (products || []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    setTimeout(() => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MarketplaceNav />
      
      <div className="-mt-16">
        <MarketplaceHero
          imageSrc={heroImage}
          onSearch={(query) => console.log("Search:", query)}
        />
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <section ref={productsRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className="mb-6 rounded-lg p-6 relative overflow-hidden"
            style={{
              backgroundImage: selectedCategory && categoryBackgrounds[selectedCategory] 
                ? `url(${categoryBackgrounds[selectedCategory]})` 
                : `url(${destaqueImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">
                {selectedCategory ? `Categoria: ${selectedCategory}` : "Produtos em Destaque"}
              </h2>
              <p className="text-white/90">
                Economize até 70% em produtos frescos antes da validade
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const discountedPrice = parseFloat(product.discountedPrice);
                const priceWithFee = discountedPrice * (1 + MARKETPLACE_FEE);
                
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    originalPrice={parseFloat(product.originalPrice)}
                    discountedPrice={priceWithFee}
                    storeName="Loja"
                    imageUrl={product.imageUrl}
                    expirationDate={product.expirationDate.toString()}
                    onClick={() => setLocation(`/produto/${product.id}`)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum produto disponível no momento. Volte em breve!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
