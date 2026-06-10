import { Button } from "@/components/ui/button";
import { Camera, Check, PenLine, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const memoryFields = [
  "Nome",
  "Relação com a Guarda",
  "Ano ou turma aproximada",
  "Foto ou documento",
  "Relato curto",
  "Autorização de uso de imagem",
  "Contato",
  "Status de aprovação",
];

export default function AboutSection() {
  return (
    <section id="memorias" className="bg-[#10264d] py-20 text-white md:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatedSection direction="right">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d7b35b]">
                Ajude a completar essa história
              </div>
              <h2 className="text-4xl font-black leading-[0.95] md:text-6xl">
                Algumas memórias não estão em documentos.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/78">
                Estão em fotos guardadas, em amizades antigas e no orgulho de
                quem um dia vestiu esse uniforme.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
                Ex-mirins, familiares, instrutores e parceiros podem ajudar a
                preencher períodos que ainda aparecem como lacunas na linha do
                tempo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-md bg-[#caa24a] font-black text-[#101828] hover:bg-[#d7b35b]"
                >
                  <a href="#contato">
                    <PenLine size={18} />
                    Enviar memória
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-md border-white/25 bg-white/5 font-black text-white hover:bg-white/12"
                >
                  <a href="#historia">
                    <Camera size={18} />
                    Ver lacunas
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} direction="left">
            <div className="border border-white/20 bg-white/[0.07] p-5 backdrop-blur md:p-6">
              <div className="mb-5 flex items-center gap-3 border-b border-white/15 pb-5">
                <div className="flex h-11 w-11 items-center justify-center border border-[#caa24a]/45 text-[#d7b35b]">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black">
                    Memórias enviadas entram em revisão.
                  </h3>
                  <p className="mt-1 text-sm text-white/62">
                    O admin já fica preparado para aprovar, recusar ou converter
                    relatos em itens da timeline.
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {memoryFields.map(field => (
                  <div
                    key={field}
                    className="flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-3 text-sm font-semibold text-white/80"
                  >
                    <Check size={16} className="text-[#d7b35b]" />
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
