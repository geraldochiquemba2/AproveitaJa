import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import loginVideo from "@assets/6898054-hd_1920_1080_25fps_1762594567633.mp4";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = loginVideo;
      video.load();
      video.play().catch(() => {});
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({ phone, password, name, role });
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo ao Aproveita Já.',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Erro no registro',
        description: error.message || 'Não foi possível criar a conta.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 w-full max-w-md p-4">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4 bg-white/10 hover:bg-white/20 text-white border-white/20"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Card className="w-full bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Criar Conta</CardTitle>
            <CardDescription className="text-center text-white/80">
              Preencha os dados para se registrar
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Número de Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                data-testid="input-password"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Tipo de Conta</Label>
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="buyer" data-testid="radio-buyer" />
                  <Label htmlFor="buyer" className="font-normal cursor-pointer text-white">
                    Comprador
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seller" id="seller" data-testid="radio-seller" />
                  <Label htmlFor="seller" className="font-normal cursor-pointer text-white">
                    Vendedor (Loja/Supermercado)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-register"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-white/80">
            Já tem uma conta?{' '}
            <button
              onClick={() => setLocation('/login')}
              className="text-white hover:underline font-medium"
              data-testid="link-login"
            >
              Entrar
            </button>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
