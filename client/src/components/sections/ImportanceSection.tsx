import { ArrowRight, Building2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

export default function ImportanceSection() {
  return (
    <section id="empresas" className="bg-[#fbfaf4] py-16 text-[#10264d] md:py-24">
      <div className="container">
        <AnimatedSection>
          <div className="grid gap-8 border-y border-[#d8cda8] py-10 md:grid-cols-[0.62fr_0.38fr] md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#8a6a1e]">
                <Handshake size={16} />
                Empresas e parceiros
              </div>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.95] md:text-6xl">
                Oportunidade também se constrói em rede.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
                Para empresas, a Guarda Mirim aproxima jovens em formação de
                uma rotina de responsabilidade. Para os mirins, uma parceria
                pode ser o primeiro passo para novas possibilidades.
              </p>
            </div>

            <div className="md:justify-self-end">
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#10264d]/18 text-[#10264d]">
                <Building2 size={26} />
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-600">
                Nomes, vagas e números só devem aparecer quando forem
                confirmados pelas fontes oficiais.
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-md bg-[#10264d] font-black text-white hover:bg-[#173869]"
              >
                <a href="#contato">
                  Conversar sobre parceria
                  <ArrowRight size={18} />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
