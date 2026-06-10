import { Quote, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Gerente de Vendas",
    company: "Empresa Local",
    year: "Turma de 2010",
    quote:
      "A Guarda Mirim mudou completamente minha vida. Entrei como uma jovem sem perspectivas e saí preparada para conquistar o mundo. Hoje sou gerente e devo muito dessa conquista à formação que recebi.",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Empreendedor",
    company: "Próprio Negócio",
    year: "Turma de 2008",
    quote:
      "Os valores de disciplina, ética e responsabilidade que aprendi na Guarda Mirim foram fundamentais para eu abrir meu próprio negócio. Hoje emprego 15 pessoas e contribuo com a economia de Salinas.",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "Assistente Administrativa",
    company: "Prefeitura de Salinas",
    year: "Turma de 2015",
    quote:
      "Além da capacitação profissional, a Guarda Mirim me ensinou a ser uma cidadã melhor. Aprendi sobre direitos, deveres e a importância de contribuir para a comunidade. Sou grata por cada dia.",
    rating: 5,
  },
  {
    name: "Pedro Oliveira",
    role: "Técnico em Informática",
    company: "Tech Solutions",
    year: "Turma de 2018",
    quote:
      "O programa me deu a primeira oportunidade no mercado de trabalho. A experiência prática que tive durante o curso foi essencial para conseguir meu primeiro emprego e crescer na área de tecnologia.",
    rating: 5,
  },
  {
    name: "Carla Mendes",
    role: "Coordenadora de RH",
    company: "Indústria Regional",
    year: "Turma de 2012",
    quote:
      "A Guarda Mirim não apenas me preparou tecnicamente, mas também desenvolveu minhas habilidades de liderança e comunicação. Hoje trabalho com recursos humanos e valorizo profissionais com essa formação.",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "Bancário",
    company: "Banco Nacional",
    year: "Turma de 2016",
    quote:
      "Entrei na Guarda Mirim sem saber o que queria para meu futuro. Saí com objetivos claros, habilidades práticas e a confiança necessária para alcançar meus sonhos. Hoje trabalho em um banco e estou cursando faculdade.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="section-padding bg-muted/30">
      <div className="container">
        {/* Header */}
        <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            <Quote size={16} />
            Depoimentos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Histórias de{" "}
            <span className="text-gradient-primary">Transformação</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Conheça as histórias reais de jovens que passaram pela Guarda Mirim
            e hoje são profissionais de sucesso, contribuindo para o
            desenvolvimento de Salinas e construindo seus próprios futuros.
          </p>
        </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={0.05 * index}>
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="text-primary" size={24} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {testimonial.company} • {testimonial.year}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto text-center mt-16 p-10 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            Faça Parte Dessa História
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Você também pode transformar seu futuro através da Guarda Mirim de
            Salinas. Junte-se a milhares de jovens que já conquistaram seus
            sonhos.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector("#contato");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-xl bg-gradient-gold hover:opacity-90 text-secondary-foreground font-semibold text-lg shadow-lg hover-scale transition-all"
          >
            Inscreva-se Agora
          </button>
        </div>
      </div>
    </section>
  );
}
