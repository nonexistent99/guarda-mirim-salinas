import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Send,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    value: "(38) 9 9999-9999",
    link: "tel:+5538999999999",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@guardamirimsalinas.org.br",
    link: "mailto:contato@guardamirimsalinas.org.br",
  },
  {
    icon: MapPin,
    title: "Endereço",
    value: "Salinas, Minas Gerais, Brasil",
    link: null,
  },
];

const participationOptions = [
  {
    icon: UserPlus,
    title: "Seja um Jovem Aprendiz",
    description:
      "Inscreva-se no programa e dê o primeiro passo para sua carreira profissional.",
  },
  {
    icon: Building2,
    title: "Seja uma Empresa Parceira",
    description:
      "Junte-se às empresas que investem no futuro dos jovens de Salinas.",
  },
  {
    icon: Users,
    title: "Seja um Voluntário",
    description:
      "Contribua com seu tempo e conhecimento para transformar vidas.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Contato via Site",
    message: "",
  });

  const createMessageMutation = trpc.messages.create.useMutation();
  const isSubmitting = createMessageMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await createMessageMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Contato via Site",
        message: "",
      });
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <section id="contato" className="section-padding bg-background">
      <div className="container">
        {/* Header */}
        <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Send size={16} />
            Entre em Contato
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Faça Parte da{" "}
            <span className="text-gradient-gold">Guarda Mirim</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Seja você um jovem em busca de oportunidades, uma empresa querendo
            investir no futuro ou alguém que deseja contribuir, estamos prontos
            para recebê-lo.
          </p>
        </div>
        </AnimatedSection>

        {/* Participation Options */}
        <AnimatedSection delay={0.2}>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {participationOptions.map((option, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover-lift transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-colors">
                <option.icon
                  className="text-primary group-hover:text-white transition-colors"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {option.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
        </AnimatedSection>

        {/* Contact Grid */}
        <AnimatedSection delay={0.4}>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              Informações de Contato
            </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">
                        {info.title}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-muted-foreground">
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/salinas-city-view.jpg"
                alt="Vista de Salinas"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="font-bold text-xl mb-1">Salinas, MG</div>
                  <div className="text-sm opacity-90">
                    Nossa cidade, nosso compromisso
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              Envie sua Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  E-mail *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(38) 9 9999-9999"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudá-lo?"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-gold hover:opacity-90 text-secondary-foreground font-semibold text-lg py-6 hover-scale"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                <Send className="ml-2" size={20} />
              </Button>
            </form>
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
