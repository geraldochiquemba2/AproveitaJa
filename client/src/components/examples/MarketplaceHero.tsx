import MarketplaceHero from '../MarketplaceHero';
import heroImage from '@assets/generated_images/Hero_image_shoppers_Angola_00c6e573.png';

export default function MarketplaceHeroExample() {
  return (
    <MarketplaceHero
      imageSrc={heroImage}
      onSearch={(query) => console.log('Search:', query)}
    />
  );
}
