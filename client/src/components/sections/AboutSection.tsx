import { Award, Heart, Target, Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Preparar jovens para o mercado de trabalho através de formação profissional, educação cidadã e desenvolvimento de habilidades essenciais para o futuro.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Ética, responsabilidade social, respeito, disciplina e compromisso com o desenvolvimento integral dos jovens e da comunidade de Salinas.",
  },
  {
    icon: Award,
    title: "Excelência",
    description:
      "Mais de 40 anos de dedicação à formação de jovens profissionais, com reconhecimento pela qualidade e impacto social transformador na região.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description:
      "Parceria com empresas locais, famílias e instituições para criar um ecossistema de apoio e oportunidades reais para a juventude salinense.",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container">
        {/* Header */}
        <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Sobre Nós
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Uma História de{" "}
            <span className="text-gradient-gold">Transformação</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Desde 1983, a Guarda Mirim de Salinas tem sido referência na
            formação de jovens profissionais, conectando educação, cidadania e
            trabalho para construir um futuro melhor para nossa juventude e
            nossa cidade.
          </p>
        </div>
        </AnimatedSection>

        {/* Image and Text */}
        <AnimatedSection delay={0.2}>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/jovem-aprendiz-group.jpg"
                alt="Jovens da Guarda Mirim em treinamento"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-gold rounded-2xl -z-10 opacity-20" />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              40 Anos Transformando Vidas
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A Guarda Mirim de Salinas nasceu da necessidade de oferecer aos
              jovens da nossa cidade uma oportunidade real de desenvolvimento
              profissional e pessoal. Ao longo de quatro décadas, formamos mais
              de 5.000 jovens que hoje são profissionais de sucesso em diversas
              áreas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nosso programa vai além da capacitação técnica: trabalhamos o
              desenvolvimento de valores, cidadania, ética profissional e
              habilidades socioemocionais essenciais para o século XXI. Cada
              jovem que passa pela Guarda Mirim carrega consigo não apenas
              conhecimento, mas também orgulho, disciplina e esperança.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Em parceria com empresas e instituições de Salinas, criamos uma
              ponte sólida entre a educação e o mercado de trabalho, garantindo
              que nossos jovens tenham as melhores oportunidades para construir
              seus futuros.
            </p>
          </div>
        </div>
        </AnimatedSection>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={0.1 * index}>
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover-lift"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gradient-primary transition-colors">
                <value.icon
                  className="text-primary group-hover:text-white transition-colors"
                  size={32}
                />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
