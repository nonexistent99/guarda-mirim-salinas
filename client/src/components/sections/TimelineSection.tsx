import { Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const timelineEvents = [
  {
    year: "1983",
    title: "Fundação da Guarda Mirim",
    description:
      "Nascimento do movimento em Salinas, com a missão de preparar jovens para o mercado de trabalho e promover cidadania.",
  },
  {
    year: "1990",
    title: "Expansão das Parcerias",
    description:
      "Estabelecimento de convênios com mais de 50 empresas locais, ampliando as oportunidades para os jovens da cidade.",
  },
  {
    year: "2000",
    title: "Reconhecimento Regional",
    description:
      "Prêmio de Responsabilidade Social pela excelência na formação profissional e impacto na comunidade de Salinas.",
  },
  {
    year: "2010",
    title: "Modernização do Programa",
    description:
      "Implementação de novas metodologias de ensino e inclusão de tecnologia nos cursos de capacitação profissional.",
  },
  {
    year: "2015",
    title: "Marco de 3.000 Formados",
    description:
      "Celebração de mais de 3.000 jovens formados, com histórias de sucesso em diversas áreas profissionais.",
  },
  {
    year: "2020",
    title: "Adaptação Digital",
    description:
      "Implementação de plataformas online para continuidade das atividades durante a pandemia, mantendo o compromisso com os jovens.",
  },
  {
    year: "2023",
    title: "40 Anos de História",
    description:
      "Celebração de quatro décadas de dedicação à juventude salinense, com mais de 5.000 jovens transformados.",
  },
  {
    year: "2025",
    title: "Futuro em Construção",
    description:
      "Novos projetos, parcerias e investimentos para continuar transformando vidas e construindo o futuro de Salinas.",
  },
];

export default function TimelineSection() {
  return (
    <section id="historia" className="section-padding bg-background">
      <div className="container">
        {/* Header */}
        <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            <Calendar size={16} />
            Nossa História
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-gradient-gold">40 Anos</span> de Dedicação e
            Conquistas
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Uma jornada marcada por momentos históricos, conquistas
            significativas e milhares de vidas transformadas ao longo de quatro
            décadas de compromisso com a juventude de Salinas.
          </p>
        </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 hidden md:block" />
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent md:hidden" />

          {/* Events */}
          <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <AnimatedSection key={index} delay={0.1 * index}>
            <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-secondary-foreground font-bold text-lg shadow-xl z-10 border-4 border-background">
                  {event.year}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-24 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-[calc(50%+3rem)]"
                      : "md:ml-[calc(50%+3rem)]"
                  } w-full md:w-[calc(50%-3rem)]`}
                >
                  <div className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover-lift transition-all duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                </div>
              </div>
            </div>
            </AnimatedSection>
          ))}
          </div>

          {/* End Marker */}
          <div className="relative flex items-center justify-center mt-16">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-xl">
              <div className="w-8 h-8 rounded-full bg-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="max-w-3xl mx-auto text-center mt-20">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            O Futuro Continua
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa história está longe de terminar. Cada dia é uma nova
            oportunidade de transformar vidas, criar oportunidades e construir
            um futuro melhor para a juventude de Salinas. Juntos, continuamos
            escrevendo essa história de sucesso.
          </p>
        </div>
      </div>
    </section>
  );
}
