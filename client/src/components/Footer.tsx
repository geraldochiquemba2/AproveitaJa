import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiInstagram, SiLinkedin, SiFacebook } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Aproveita Já</h3>
            <p className="text-sm text-muted-foreground">
              Economize antes que expire. Conectando lojas e consumidores conscientes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" data-testid="footer-link-home">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Início
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sobre" data-testid="footer-link-about">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Sobre Nós
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" data-testid="footer-link-contact">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Contato
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Para Vendedores</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/registro" data-testid="footer-link-register">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Cadastrar Loja
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/login" data-testid="footer-link-login">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer">
                    Entrar
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+244 923 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@aproveitaja.ao</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Luanda, Angola</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {currentYear} Aproveita Já. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/aproveitaja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
              data-testid="link-instagram"
            >
              <SiInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/company/aproveitaja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
              data-testid="link-linkedin"
            >
              <SiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/aproveitaja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Facebook"
              data-testid="link-facebook"
            >
              <SiFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
