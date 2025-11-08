import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import MarketplaceNav from "@/components/MarketplaceNav";
import MarketplaceHero from "@/components/MarketplaceHero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

import heroImage from '@assets/generated_images/Hero_image_shoppers_Angola_00c6e573.png';
import sideVideo from '@assets/products-side-video.mp4';

const MARKETPLACE_FEE = 0.15;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [, setLocation] = useLocation();
  const productsRef = useRef<HTMLElement>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = ["Padaria", "Laticínios", "Frutas", "Bebidas", "Snacks"];

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
      <MarketplaceNav cartCount={0} />
      
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCategory ? `Categoria: ${selectedCategory}` : "Produtos em Destaque"}
            </h2>
            <p className="text-muted-foreground">
              Economize até 70% em produtos frescos antes da validade
            </p>
          </div>

          <div className="flex gap-6">
            <div className="hidden lg:block sticky top-20 h-fit">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-64 h-[600px] object-cover rounded-lg shadow-lg"
              >
                <source src={sideVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
          </div>
        </div>
      </section>
    </div>
  );
}
