import { useState } from 'react';
import { useLocation } from 'wouter';
import MarketplaceNav from '@/components/MarketplaceNav';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import contactImage from '@assets/stock_images/customer_service_con_35454930.jpg';
import scheduleImage from '@assets/stock_images/business_hours_clock_61cd4781.jpg';
import messageImage from '@assets/stock_images/writing_message_cont_012fa992.jpg';

export default function Contact() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Mensagem enviada!',
      description: 'Entraremos em contato em breve.',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MarketplaceNav />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">
            Entre em Contato
          </h1>
          <p className="text-lg text-muted-foreground">
            Estamos aqui para ajudar. Envie sua mensagem!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${contactImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
              <div className="relative">
                <CardHeader>
                  <CardTitle className="text-white dark:text-white">Informações de Contato</CardTitle>
                  <CardDescription className="text-white/90 dark:text-white/90">
                    Entre em contato através dos nossos canais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Telefone</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">+244 923 456 789</p>
                      <p className="text-sm text-white/90 dark:text-white/90">+244 945 678 901</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Email</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">contato@aproveitaja.ao</p>
                      <p className="text-sm text-white/90 dark:text-white/90">suporte@aproveitaja.ao</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white dark:text-white">Endereço</h3>
                      <p className="text-sm text-white/90 dark:text-white/90">
                        Rua Ho Chi Minh<br />
                        Luanda, Angola
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${scheduleImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
              <div className="relative">
                <CardHeader>
                  <CardTitle className="text-white dark:text-white">Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/90 dark:text-white/90">Segunda - Sexta</span>
                      <span className="font-medium text-white dark:text-white">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/90 dark:text-white/90">Sábado</span>
                      <span className="font-medium text-white dark:text-white">9:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/90 dark:text-white/90">Domingo</span>
                      <span className="font-medium text-white dark:text-white">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          <Card className="relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${messageImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
            <div className="relative">
              <CardHeader>
                <CardTitle className="text-white dark:text-white">Envie sua Mensagem</CardTitle>
                <CardDescription className="text-white/90 dark:text-white/90">
                  Preencha o formulário e responderemos em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white dark:text-white">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white dark:text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white dark:text-white">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white dark:text-white">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar?"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      data-testid="input-message"
                    />
                  </div>

                  <Button type="submit" className="w-full" data-testid="button-send">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
