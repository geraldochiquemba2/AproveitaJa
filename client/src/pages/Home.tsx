import { useState } from "react";
import MarketplaceNav from "@/components/MarketplaceNav";
import MarketplaceHero from "@/components/MarketplaceHero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";

import heroImage from '@assets/generated_images/Hero_image_shoppers_Angola_00c6e573.png';
import bakeryImage from '@assets/generated_images/Bakery_products_showcase_d3685112.png';
import dairyImage from '@assets/generated_images/Dairy_products_display_4914624c.png';
import produceImage from '@assets/generated_images/Fresh_produce_assortment_8f0aba1c.png';
import snacksImage from '@assets/generated_images/Snacks_beverages_products_e98014c5.png';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Padaria", "Laticínios", "Frutas", "Bebidas", "Snacks"];

  const mockProducts = [
    {
      id: "1",
      name: "Pão Fresco Artesanal",
      originalPrice: 500,
      discountedPrice: 250,
      storeName: "Supermercado Central",
      imageUrl: bakeryImage,
      expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Padaria",
    },
    {
      id: "2",
      name: "Leite Fresco 1L",
      originalPrice: 800,
      discountedPrice: 350,
      storeName: "Loja do Bairro",
      imageUrl: dairyImage,
      expirationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Laticínios",
    },
    {
      id: "3",
      name: "Mix de Frutas Frescas",
      originalPrice: 1200,
      discountedPrice: 500,
      storeName: "Mercado Verde",
      imageUrl: produceImage,
      expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Frutas",
    },
    {
      id: "4",
      name: "Pack Snacks Variados",
      originalPrice: 1500,
      discountedPrice: 600,
      storeName: "Supermercado Popular",
      imageUrl: snacksImage,
      expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Snacks",
    },
    {
      id: "5",
      name: "Croissants Frescos",
      originalPrice: 600,
      discountedPrice: 280,
      storeName: "Padaria Moderna",
      imageUrl: bakeryImage,
      expirationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Padaria",
    },
    {
      id: "6",
      name: "Iogurte Natural",
      originalPrice: 400,
      discountedPrice: 180,
      storeName: "Supermercado Central",
      imageUrl: dairyImage,
      expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Laticínios",
    },
  ];

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : mockProducts;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <MarketplaceNav cartCount={0} />
      
      <MarketplaceHero
        imageSrc={heroImage}
        onSearch={(query) => console.log("Search:", query)}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">
              Economize até 70% em produtos frescos antes da validade
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => console.log("Product clicked:", product.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
