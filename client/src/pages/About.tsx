import MarketplaceNav from '@/components/MarketplaceNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Clock, MapPin, TrendingDown } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pb-6">
      <MarketplaceNav />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">
            Sobre a Aproveita Já
          </h1>
          <p className="text-lg text-muted-foreground">
            Economize antes que expire
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A <strong className="text-foreground">Aproveita Já</strong> é um marketplace inovador que conecta 
                lojas e supermercados a consumidores conscientes que buscam economizar em produtos próximos ao vencimento.
              </p>
              <p className="text-muted-foreground">
                Nossa plataforma ajuda a reduzir o desperdício de alimentos enquanto oferece aos clientes 
                acesso a produtos de qualidade com preços especiais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Como Funciona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Lojas Cadastram Produtos</h3>
                    <p className="text-sm text-muted-foreground">
                      Supermercados e lojas registram produtos próximos ao vencimento com descontos atrativos.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Você Descobre Ofertas</h3>
                    <p className="text-sm text-muted-foreground">
                      Navegue pelos produtos disponíveis e encontre as melhores ofertas perto de você.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Compra e Economiza</h3>
                    <p className="text-sm text-muted-foreground">
                      Faça seu pedido e escolha entre entrega ou retirada na loja. Economize até 70%!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Produtos Sempre Frescos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todos os produtos na nossa plataforma são verificados e ainda estão dentro do prazo de validade. 
                Oferecemos apenas produtos próximos ao vencimento que ainda mantêm toda sua qualidade e segurança.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Presença em Angola
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Atualmente operamos em Luanda, conectando lojas locais com consumidores que valorizam 
                economia e sustentabilidade. Em breve, estaremos em mais províncias!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
