import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import loginVideo from "@assets/6898054-hd_1920_1080_25fps_1762594567633.mp4";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
      await login(phone, password);
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta.',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Erro no login',
        description: error.message || 'Telefone ou senha incorretos.',
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
            <CardTitle className="text-2xl font-bold text-center text-white">Aproveita Já</CardTitle>
            <CardDescription className="text-center text-white/80">
              Entre com seu telefone e senha
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                data-testid="input-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-white/80">
            Não tem uma conta?{' '}
            <button
              onClick={() => setLocation('/registro')}
              className="text-white hover:underline font-medium"
              data-testid="link-register"
            >
              Registre-se
            </button>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
