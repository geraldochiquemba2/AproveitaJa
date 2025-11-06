import ProductCard from '../ProductCard';
import productImage from '@assets/generated_images/Bakery_products_showcase_d3685112.png';

export default function ProductCardExample() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);

  return (
    <div className="max-w-xs">
      <ProductCard
        id="1"
        name="Pão Fresco Artesanal"
        originalPrice={500}
        discountedPrice={250}
        storeName="Supermercado Central"
        imageUrl={productImage}
        expirationDate={expirationDate.toISOString()}
        onClick={() => console.log('Product clicked')}
      />
    </div>
  );
}
