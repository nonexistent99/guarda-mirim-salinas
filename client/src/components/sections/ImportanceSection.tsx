import { ArrowRight, Building2, FileCheck2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const partnerNotes = [
  {
    icon: Building2,
    title: "Para empresas",
    text: "A Guarda Mirim representa jovens em formação, acompanhados por uma história pública de disciplina, responsabilidade e preparo.",
  },
  {
    icon: Handshake,
    title: "Para os mirins",
    text: "A parceria pode ser a ponte entre aprendizado, rotina de trabalho e primeira oportunidade com acompanhamento institucional.",
  },
  {
    icon: FileCheck2,
    title: "Com fonte e cuidado",
    text: "Números, vagas e nomes de parceiros só devem aparecer quando forem cadastrados com fonte ou confirmação oficial.",
  },
];

export default function ImportanceSection() {
  return (
    <section id="empresas" className="bg-white py-20 text-[#10264d] md:py-28">
      <div className="container">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex border border-[#caa24a]/45 bg-[#fff7df] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8a6a1e]">
              Para empresas e parceiros
            </div>
            <h2 className="text-4xl font-black leading-[0.95] md:text-6xl">
              Oportunidade também se constrói em rede.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-700 md:text-lg">
              Para empresas, a Guarda Mirim representa jovens em formação,
              acompanhados por uma história de disciplina, responsabilidade e
              preparo. Para os mirins, pode ser a ponte entre aprendizado e
              oportunidade.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {partnerNotes.map((note, index) => (
            <AnimatedSection key={note.title} delay={0.08 * index}>
              <div className="h-full border border-slate-200 bg-[#fbfaf4] p-6 transition-colors hover:border-[#caa24a]/70">
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#10264d]/15 bg-white text-[#10264d]">
                  <note.icon size={24} />
                </div>
                <h3 className="text-xl font-black">{note.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {note.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.25}>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-y border-[#d8cda8] py-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Cadastro preparado no admin
              </p>
              <p className="mt-2 max-w-2xl text-lg font-semibold leading-8">
                A home fica pronta para exibir parceiros quando houver fonte,
                autorização e conteúdo validado.
              </p>
            </div>
            <Button
              asChild
              className="h-12 rounded-md bg-[#10264d] font-black text-white hover:bg-[#173869]"
            >
              <a href="#contato">
                Quero ser parceiro
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
