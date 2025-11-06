import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="h-screen bg-muted">
      <Navigation />
      <div className="pt-32 px-4 text-center">
        <p className="text-muted-foreground">Scroll to see navigation change</p>
      </div>
    </div>
  );
}
