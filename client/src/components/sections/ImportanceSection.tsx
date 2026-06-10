import { BookOpen, Briefcase, HandHeart, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const pillars = [
  {
    icon: BookOpen,
    title: "Educação",
    description:
      "Formação técnica e profissional de qualidade, preparando jovens com conhecimentos práticos e teóricos para o mercado de trabalho moderno.",
    color: "primary",
  },
  {
    icon: HandHeart,
    title: "Cidadania",
    description:
      "Desenvolvimento de valores éticos, responsabilidade social e consciência cidadã, formando não apenas profissionais, mas cidadãos comprometidos.",
    color: "accent",
  },
  {
    icon: Briefcase,
    title: "Trabalho",
    description:
      "Conexão direta com o mercado através de parcerias com empresas locais, oferecendo experiência profissional real e oportunidades concretas.",
    color: "secondary",
  },
  {
    icon: TrendingUp,
    title: "Futuro",
    description:
      "Investimento no potencial dos jovens de Salinas, construindo uma geração preparada para os desafios e oportunidades do século XXI.",
    color: "primary",
  },
];

export default function ImportanceSection() {
  return (
    <section id="importancia" className="section-padding bg-muted/30">
      <div className="container">
        {/* Header */}
        <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Nossa Importância
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            O Elo Entre{" "}
            <span className="text-gradient-primary">Educação e Trabalho</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A Guarda Mirim de Salinas é muito mais que um programa de
            capacitação. Somos uma ponte essencial que conecta três pilares
            fundamentais para o desenvolvimento da juventude e da nossa
            comunidade.
          </p>
        </div>
        </AnimatedSection>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={index} delay={0.1 * index}>
            <div
              key={index}
              className="group relative p-10 rounded-3xl bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Icon */}
              <div className="flex items-start gap-6 mb-6">
                <div
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl ${
                    pillar.color === "primary"
                      ? "bg-primary/10"
                      : pillar.color === "accent"
                      ? "bg-accent/10"
                      : "bg-secondary/10"
                  } flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <pillar.icon
                    className={
                      pillar.color === "primary"
                        ? "text-primary"
                        : pillar.color === "accent"
                        ? "text-accent"
                        : "text-secondary"
                    }
                    size={40}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${
                  pillar.color === "primary"
                    ? "bg-gradient-primary"
                    : pillar.color === "accent"
                    ? "bg-accent"
                    : "bg-gradient-gold"
                } opacity-5 rounded-bl-full`}
              />
            </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Impact Statement */}
        <AnimatedSection delay={0.4}>
        <div className="relative max-w-5xl mx-auto p-12 rounded-3xl bg-gradient-primary text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Impacto Real na Comunidade
            </h3>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Cada jovem formado pela Guarda Mirim representa uma família com
              mais esperança, uma empresa com um profissional capacitado e uma
              cidade com um futuro mais promissor. Nosso trabalho transforma não
              apenas indivíduos, mas toda a comunidade de Salinas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-white/80">Taxa de Empregabilidade</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/30" />
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-white/80">Empresas Parceiras</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/30" />
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.8/5</div>
                <div className="text-white/80">Satisfação dos Jovens</div>
              </div>
            </div>
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
