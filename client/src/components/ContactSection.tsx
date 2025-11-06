import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4" data-testid="text-contact-title">
            Entre em Contato
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Vamos criar algo extraordinário juntos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm uppercase tracking-wide mb-2 block">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="py-4 px-6"
              data-testid="input-name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm uppercase tracking-wide mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="py-4 px-6"
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm uppercase tracking-wide mb-2 block">
              Mensagem
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="resize-none text-base"
              data-testid="input-message"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto md:px-12 py-6"
            data-testid="button-submit"
          >
            Enviar Mensagem
          </Button>
        </form>

        <div className="mt-12 md:mt-16 pt-12 border-t border-border text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Informações de Contato
          </p>
          <p className="text-base" data-testid="text-email">contato@jackmendes.com</p>
          <p className="text-base" data-testid="text-phone">+55 11 9 9999-9999</p>
          <p className="text-base text-muted-foreground" data-testid="text-address">São Paulo, Brasil</p>
        </div>
      </div>
    </section>
  );
}
