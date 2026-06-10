import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, PenLine } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function AboutSection() {
  return (
    <section
      id="memorias"
      className="relative overflow-hidden bg-[#07152d] py-20 text-white md:py-28"
    >
      <div className="archive-texture absolute inset-0 opacity-55" />
      <div className="absolute -right-16 top-10 hidden w-[42vw] rotate-3 opacity-65 md:block">
        <img
          src="/images/guarda/formatura.jpg"
          alt="Registro de formatura da Guarda Mirim"
          className="aspect-[4/3] w-full object-cover grayscale-[25%]"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b35b]/55 to-transparent" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/18 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d7b35b]">
              <Camera size={16} />
              Envie sua memória
            </div>
            <h2 className="text-5xl font-black leading-[0.9] md:text-7xl">
              Talvez uma parte dessa história esteja com você.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
              Se você guardou uma foto, um nome de turma ou uma lembrança, ela
              também pode fazer parte dessa história.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-md bg-[#caa24a] font-black text-[#101828] hover:bg-[#d7b35b]"
              >
                <a href="#contato">
                  <PenLine size={18} />
                  Enviar relato
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-md border-white/22 bg-white/[0.04] font-black text-white hover:bg-white/12"
              >
                <a href="#historia">
                  Rever a linha do tempo
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
