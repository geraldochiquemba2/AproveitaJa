import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Home, Package, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MarketplaceNavProps {
  cartCount?: number;
}

export default function MarketplaceNav({ cartCount = 0 }: MarketplaceNavProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" data-testid="link-logo">
              <div className="cursor-pointer">
                <h1 className="text-xl md:text-2xl font-bold text-primary">Aproveita Já</h1>
                <p className="text-xs text-muted-foreground hidden md:block">Economize Antes que Expire</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" data-testid="link-home">
                <span className={`cursor-pointer text-sm font-medium ${location === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Início
                </span>
              </Link>
              {user?.role === 'seller' && (
                <Link href="/vendedor/dashboard" data-testid="link-dashboard">
                  <span className={`cursor-pointer text-sm font-medium ${location === '/vendedor/dashboard' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    Meus Produtos
                  </span>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin" data-testid="link-admin">
                  <span className={`cursor-pointer text-sm font-medium ${location === '/admin' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    Admin
                  </span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <Link href="/carrinho" data-testid="link-cart">
                  <Button size="icon" variant="ghost" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" data-testid="button-user-menu">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      {user.phone}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} data-testid="button-logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setLocation('/login')}
                  data-testid="button-login-nav"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className={`grid h-16 ${user ? 'grid-cols-4' : 'grid-cols-2'}`}>
          <Link href="/" data-testid="link-mobile-home">
            <button className={`flex flex-col items-center justify-center h-full ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Início</span>
            </button>
          </Link>
          {user?.role === 'seller' && (
            <Link href="/vendedor/dashboard" data-testid="link-mobile-dashboard">
              <button className={`flex flex-col items-center justify-center h-full ${location === '/vendedor/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Package className="h-5 w-5" />
                <span className="text-xs mt-1">Produtos</span>
              </button>
            </Link>
          )}
          {user && (
            <Link href="/carrinho" data-testid="link-mobile-cart">
              <button className={`flex flex-col items-center justify-center h-full relative ${location === '/carrinho' ? 'text-primary' : 'text-muted-foreground'}`}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute top-2 right-1/4 h-4 w-4 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
                <span className="text-xs mt-1">Carrinho</span>
              </button>
            </Link>
          )}
          {user ? (
            <button
              onClick={() => logout()}
              className="flex flex-col items-center justify-center h-full text-muted-foreground"
              data-testid="button-mobile-logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs mt-1">Sair</span>
            </button>
          ) : (
            <button
              onClick={() => setLocation('/login')}
              className="flex flex-col items-center justify-center h-full text-muted-foreground"
              data-testid="button-mobile-login"
            >
              <LogIn className="h-5 w-5" />
              <span className="text-xs mt-1">Entrar</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
