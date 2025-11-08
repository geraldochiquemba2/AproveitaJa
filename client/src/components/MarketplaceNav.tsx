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
            : '!bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" data-testid="link-logo">
              <div className="cursor-pointer">
                <h1 className={`text-xl md:text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}>
                  Aproveita Já
                </h1>
                <p className={`text-xs hidden md:block transition-colors ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}>
                  Economize Antes que Expire
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" data-testid="link-home">
                <span className={`cursor-pointer text-sm font-medium transition-colors ${
                  location === '/' 
                    ? (isScrolled ? 'text-primary' : 'text-white font-semibold')
                    : (isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white')
                }`}>
                  Início
                </span>
              </Link>
              <Link href="/sobre" data-testid="link-about">
                <span className={`cursor-pointer text-sm font-medium transition-colors ${
                  location === '/sobre'
                    ? (isScrolled ? 'text-primary' : 'text-white font-semibold')
                    : (isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white')
                }`}>
                  Sobre
                </span>
              </Link>
              <Link href="/contato" data-testid="link-contact">
                <span className={`cursor-pointer text-sm font-medium transition-colors ${
                  location === '/contato'
                    ? (isScrolled ? 'text-primary' : 'text-white font-semibold')
                    : (isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white')
                }`}>
                  Contato
                </span>
              </Link>
              {user?.role === 'seller' && (
                <Link href="/vendedor/dashboard" data-testid="link-dashboard">
                  <span className={`cursor-pointer text-sm font-medium transition-colors ${
                    location === '/vendedor/dashboard'
                      ? (isScrolled ? 'text-primary' : 'text-white font-semibold')
                      : (isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white')
                  }`}>
                    Meus Produtos
                  </span>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin" data-testid="link-admin">
                  <span className={`cursor-pointer text-sm font-medium transition-colors ${
                    location === '/admin'
                      ? (isScrolled ? 'text-primary' : 'text-white font-semibold')
                      : (isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white')
                  }`}>
                    Admin
                  </span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <Link href="/carrinho" data-testid="link-cart">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className={`relative transition-colors ${
                      isScrolled ? '' : 'text-white hover:text-white hover:bg-white/20'
                    }`}
                  >
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
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className={`transition-colors ${
                        isScrolled ? '' : 'text-white hover:text-white hover:bg-white/20'
                      }`}
                      data-testid="button-user-menu"
                    >
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
                  className={isScrolled ? '' : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/30'}
                  variant={isScrolled ? 'default' : 'outline'}
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

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-inset-bottom">
        <div className={`grid h-16 ${user ? 'grid-cols-4' : 'grid-cols-2'}`}>
          <Link href="/" data-testid="link-mobile-home">
            <button className={`flex flex-col items-center justify-center h-full gap-0.5 px-1 ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Home className="h-5 w-5 flex-shrink-0" />
              <span className="text-[10px] leading-tight">Início</span>
            </button>
          </Link>
          {user?.role === 'seller' && (
            <Link href="/vendedor/dashboard" data-testid="link-mobile-dashboard">
              <button className={`flex flex-col items-center justify-center h-full gap-0.5 px-1 ${location === '/vendedor/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Package className="h-5 w-5 flex-shrink-0" />
                <span className="text-[10px] leading-tight">Produtos</span>
              </button>
            </Link>
          )}
          {user && (
            <Link href="/carrinho" data-testid="link-mobile-cart">
              <button className={`flex flex-col items-center justify-center h-full gap-0.5 px-1 relative ${location === '/carrinho' ? 'text-primary' : 'text-muted-foreground'}`}>
                <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                {cartCount > 0 && (
                  <Badge className="absolute top-1.5 left-1/2 -translate-x-1/2 translate-x-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    {cartCount}
                  </Badge>
                )}
                <span className="text-[10px] leading-tight">Carrinho</span>
              </button>
            </Link>
          )}
          {user ? (
            <button
              onClick={() => logout()}
              className="flex flex-col items-center justify-center h-full gap-0.5 px-1 text-muted-foreground"
              data-testid="button-mobile-logout"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="text-[10px] leading-tight">Sair</span>
            </button>
          ) : (
            <button
              onClick={() => setLocation('/login')}
              className="flex flex-col items-center justify-center h-full gap-0.5 px-1 text-muted-foreground"
              data-testid="button-mobile-login"
            >
              <LogIn className="h-5 w-5 flex-shrink-0" />
              <span className="text-[10px] leading-tight">Entrar</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
