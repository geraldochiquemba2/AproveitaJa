import { useLocation } from 'wouter';
import MarketplaceNav from '@/components/MarketplaceNav';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Clock, MapPin, TrendingDown, ArrowLeft } from 'lucide-react';

import missionImage from '@assets/stock_images/grocery_store_market_7fbd4ba2.jpg';
import processImage from '@assets/stock_images/step_by_step_process_d1d73227.jpg';
import freshImage from '@assets/stock_images/fresh_vegetables_fru_815ccd1f.jpg';
import luandaImage from '@assets/stock_images/luanda_angola_city_s_338cbee5.jpg';

export default function About() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNav />
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">
            Sobre a Aproveita Já
          </h1>
          <p className="text-lg text-muted-foreground">
            Economize antes que expire
          </p>
        </div>

        <div className="space-y-6">
          <Card className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${missionImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
            <div className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white dark:text-white">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/90 dark:text-white/90">
                  A <strong className="text-white dark:text-white">Aproveita Já</strong> é um marketplace inovador que conecta 
                  lojas e supermercados a consumidores conscientes que buscam economizar em produtos próximos ao vencimento.
                </p>
                <p className="text-white/90 dark:text-white/90">
                  Nossa plataforma ajuda a reduzir o desperdício de alimentos enquanto oferece aos clientes 
                  acesso a produtos de qualidade com preços especiais.
                </p>
              </CardContent>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${processImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
            <div className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white dark:text-white">
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
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Lojas Cadastram Produtos</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">
                        Supermercados e lojas registram produtos próximos ao vencimento com descontos atrativos.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Você Descobre Ofertas</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">
                        Navegue pelos produtos disponíveis e encontre as melhores ofertas perto de você.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Compra e Economiza</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">
                        Faça seu pedido e escolha entre entrega ou retirada na loja. Economize até 70%!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${freshImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
            <div className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white dark:text-white">
                  <Clock className="h-5 w-5 text-primary" />
                  Produtos Sempre Frescos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 dark:text-white/90">
                  Todos os produtos na nossa plataforma são verificados e ainda estão dentro do prazo de validade. 
                  Oferecemos apenas produtos próximos ao vencimento que ainda mantêm toda sua qualidade e segurança.
                </p>
              </CardContent>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${luandaImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
            <div className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white dark:text-white">
                  <MapPin className="h-5 w-5 text-primary" />
                  Presença em Angola
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 dark:text-white/90">
                  Atualmente operamos em Luanda, conectando lojas locais com consumidores que valorizam 
                  economia e sustentabilidade. Em breve, estaremos em mais províncias!
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
