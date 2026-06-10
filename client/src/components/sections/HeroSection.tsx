import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Images, PenLine } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "wouter";

const pathMarkers = ["Nome na lista", "Farda", "Turma", "Formatura"];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(
    scrollY,
    [0, 520],
    [0, shouldReduceMotion ? 0 : 70]
  );

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="cinematic-hero relative min-h-[94vh] overflow-hidden bg-[#07152d] text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0.86 }}
        animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/images/guarda/hero-formacao.jpg"
          alt="Jovens uniformizados da Guarda Mirim em solenidade"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="cinematic-grid" />
      <div className="film-grain" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f6f3ea] via-[#f6f3ea]/55 to-transparent" />

      <div className="container relative z-10 flex min-h-[94vh] items-center pb-28 pt-28">
        <div className="max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md"
          >
            Guarda Mirim de Salinas · acervo vivo
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.82, ease: "easeOut" }}
            className="mt-8 w-full max-w-5xl min-w-0"
          >
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#d7b35b]">
              Cada turma deixou uma marca.
            </p>
            <h1 className="max-w-[12ch] text-4xl font-black leading-[0.95] text-white sm:max-w-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Uma história vestida de memória.
            </h1>
            <p className="mt-7 max-w-sm text-base leading-8 text-white/85 sm:max-w-3xl sm:text-lg md:text-xl">
              Uma linha do tempo para preservar a história, as turmas e as
              memórias da Guarda Mirim de Salinas.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/72 sm:max-w-2xl md:text-base">
              Quem passou pela Guarda sabe: o uniforme, a turma, o primeiro dia
              e a formatura ficam na memória.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.72, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-md bg-[#caa24a] px-7 text-base font-black text-[#101828] shadow-[0_18px_42px_rgba(202,162,74,0.28)] hover:bg-[#d7b35b] sm:w-auto"
            >
              <Link href="/inscricao">
                Fazer inscrição
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-md border-white/35 bg-white/10 px-7 text-base font-black text-white backdrop-blur-md hover:bg-white/20 sm:w-auto"
              onClick={() => scrollTo("#historia")}
            >
              <Images size={18} />
              Ver linha do tempo
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-14 w-full rounded-md px-7 text-base font-black text-white hover:bg-white/15 sm:w-auto"
              onClick={() => scrollTo("#memorias")}
            >
              <PenLine size={18} />
              Enviar memória
            </Button>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.8, ease: "easeOut" }}
            className="mt-14 max-w-4xl"
          >
            <div className="cinematic-rail">
              {pathMarkers.map(marker => (
                <div key={marker} className="cinematic-marker">
                  <span className="cinematic-marker-dot" />
                  <span>{marker}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#processo")}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label="Ir para o status do processo seletivo"
      >
        <ChevronDown size={34} className="animate-bounce" />
      </button>
    </section>
  );
}
