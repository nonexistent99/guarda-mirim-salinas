import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const stats = [
  { value: "40+", label: "anos de historia" },
  { value: "5 mil+", label: "jovens formados" },
  { value: "200+", label: "empresas parceiras" },
];

const pathMarkers = ["Disciplina", "Formacao", "Primeiro emprego", "Futuro"];

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.querySelector("#sobre");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="cinematic-hero relative min-h-screen overflow-hidden flex items-center"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/jovem-aprendiz-group.jpg')" }}
        initial={{ scale: 1.08, opacity: 0.88 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="cinematic-light-sweep" />
      <div className="cinematic-grid" />
      <div className="film-grain" />

      <div className="relative z-10 container pt-28 pb-20 text-white">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md"
          >
            <Sparkles size={16} className="text-secondary" />
            Guarda Mirim de Salinas
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
            className="mt-8 max-w-5xl"
          >
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
              <ShieldCheck size={18} className="text-accent" />
              Educacao, cidadania e trabalho
            </p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Uma entrada real para o mundo profissional.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg md:text-xl">
              Ha mais de quatro decadas, a Guarda Mirim conecta jovens, familias
              e empresas de Salinas em uma jornada de formacao, responsabilidade
              e oportunidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-14 rounded-lg bg-gradient-gold px-7 text-base font-bold text-secondary-foreground shadow-2xl hover:opacity-95"
            >
              <Link href="/inscricao">
                Fazer inscricao
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-lg border-white/35 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md hover:bg-white/20"
              onClick={() => {
                const element = document.querySelector("#historia");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver nossa historia
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.8, ease: "easeOut" }}
            className="mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {stats.map(stat => (
              <div key={stat.label} className="cinematic-stat">
                <div className="text-3xl font-black text-secondary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.58, duration: 0.8 }}
          className="mt-12 max-w-5xl"
        >
          <div className="cinematic-rail">
            {pathMarkers.map((marker, index) => (
              <div key={marker} className="cinematic-marker">
                <span className="cinematic-marker-dot" />
                <span>{marker}</span>
                {index === 1 && <BriefcaseBusiness size={16} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
        aria-label="Ir para a proxima secao"
      >
        <ChevronDown size={34} className="animate-bounce" />
      </button>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
