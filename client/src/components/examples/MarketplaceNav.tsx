import MarketplaceNav from '../MarketplaceNav';

export default function MarketplaceNavExample() {
  return (
    <div className="min-h-screen">
      <MarketplaceNav cartCount={3} userRole="buyer" />
      <div className="p-8 mb-16">
        <p className="text-muted-foreground">Navigation example with cart count</p>
      </div>
    </div>
  );
}
