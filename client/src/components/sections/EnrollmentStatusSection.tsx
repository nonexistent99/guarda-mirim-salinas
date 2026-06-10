import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { Link } from "wouter";
import { selectionStatus, sourceStatusLabels } from "@/data/guardTimeline";

export default function EnrollmentStatusSection() {
  return (
    <section id="processo" className="relative bg-[#07152d] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#caa24a]/70 to-transparent" />
      <div className="container py-7">
        <div className="grid gap-5 border-y border-white/12 py-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d7b35b]">
              Processo seletivo
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
              {selectionStatus.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 md:text-base">
              O edital público de 2026 está disponível no portal da Prefeitura.
              Para etapas, resultados e novas chamadas, acompanhe as fontes
              oficiais da Guarda Mirim.
            </p>
            <p className="mt-3 text-xs text-white/45">
              Fonte: {selectionStatus.sourceLabel} ·{" "}
              {sourceStatusLabels[selectionStatus.sourceStatus]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button
              asChild
              className="h-12 rounded-md bg-[#caa24a] font-black text-[#101828] hover:bg-[#d7b35b]"
            >
              <a
                href={selectionStatus.editalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={18} />
                Ver edital
                <ExternalLink size={16} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-md border-white/22 bg-white/[0.04] font-black text-white hover:bg-white/12"
            >
              <Link href="/inscricao">
                Processo seletivo
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
