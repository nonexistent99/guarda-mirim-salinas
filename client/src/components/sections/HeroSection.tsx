import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "wouter";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(
    scrollY,
    [0, 620],
    [0, shouldReduceMotion ? 0 : 82]
  );

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="cinematic-hero relative min-h-screen overflow-hidden bg-[#07152d] text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0.9 }}
        animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/images/guarda/hero-formacao.jpg"
          alt="Jovens uniformizados da Guarda Mirim em solenidade"
          className="h-full w-full object-cover object-[62%_center]"
          fetchPriority="high"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,45,0.94)_0%,rgba(7,21,45,0.78)_36%,rgba(7,21,45,0.28)_70%,rgba(7,21,45,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(215,179,91,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.34))]" />
      <div className="cinematic-grid opacity-45" />
      <div className="film-grain" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07152d] via-[#07152d]/70 to-transparent" />

      <div className="container relative z-10 flex min-h-screen items-center pb-28 pt-28">
        <div className="max-w-4xl">
          <div className="inline-flex border border-white/20 bg-black/18 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/86 backdrop-blur-md">
            Guarda Mirim de Salinas
          </div>

          <div className="mt-8 min-w-0">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#d7b35b]">
              Cada turma deixou uma marca.
            </p>
            <h1 className="max-w-[10ch] text-5xl font-black leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Cada mirim levou uma história.
            </h1>
            <p className="mt-7 w-full max-w-[32ch] text-base leading-8 text-white/78 sm:max-w-xl sm:text-lg md:text-xl">
              Um percurso visual pela história, pelas turmas e pelas memórias da
              Guarda Mirim de Salinas.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-14 w-full rounded-md bg-[#caa24a] px-7 text-base font-black text-[#101828] shadow-[0_18px_42px_rgba(202,162,74,0.28)] hover:bg-[#d7b35b] sm:w-auto"
              onClick={() => scrollTo("#historia")}
            >
              Ver linha do tempo
              <ArrowRight size={18} />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-md border-white/30 bg-black/12 px-7 text-base font-black text-white backdrop-blur-md hover:bg-white/16 sm:w-auto"
            >
              <Link href="/inscricao">
                <FileText size={18} />
                Processo seletivo
              </Link>
            </Button>
          </div>
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
