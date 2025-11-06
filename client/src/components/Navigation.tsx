import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Projetos", path: "/projetos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" data-testid="link-logo">
              <span className={`text-xl md:text-2xl font-light tracking-wide cursor-pointer ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                JACK MENDES
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-12">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                    <span
                      className={`text-sm uppercase tracking-wide cursor-pointer transition-all ${
                        isScrolled ? "text-foreground" : "text-white"
                      } ${
                        location === item.path
                          ? "border-b border-current"
                          : "hover:border-b hover:border-current"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              size="icon"
              variant="ghost"
              className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                <span
                  className={`text-2xl uppercase tracking-wide cursor-pointer ${
                    location === item.path ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
