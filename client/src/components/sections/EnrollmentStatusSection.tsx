import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardList,
  ExternalLink,
  FileText,
  History,
} from "lucide-react";
import { Link } from "wouter";
import { selectionStatus, sourceStatusLabels } from "@/data/guardTimeline";

const statusSteps = [
  { label: "Edital", state: "publicado" },
  { label: "Prova", state: "data oficial no edital" },
  { label: "Gabarito", state: "acompanhar fonte" },
  { label: "Resultado", state: "acompanhar fonte" },
];

export default function EnrollmentStatusSection() {
  return (
    <section id="processo" className="relative bg-[#f6f3ea] py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#caa24a]/70 to-transparent" />
      <div className="container">
        <div className="grid gap-6 overflow-hidden border border-[#d8cda8] bg-white/75 p-4 shadow-[0_24px_80px_rgba(22,34,55,0.08)] backdrop-blur md:grid-cols-[1.1fr_1fr] md:p-6">
          <div className="flex gap-4">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center border border-[#caa24a]/40 bg-[#10264d] text-white sm:flex">
              <ClipboardList size={24} />
            </div>
            <div>
              <div className="mb-3 inline-flex max-w-full whitespace-normal border border-amber-200 bg-amber-50 px-3 py-1 text-left text-xs font-bold uppercase leading-5 tracking-[0.12em] text-amber-900">
                {selectionStatus.statusLabel}
              </div>
              <h2 className="text-2xl font-black leading-tight text-[#10264d] md:text-3xl">
                {selectionStatus.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
                {selectionStatus.description}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Próxima etapa: {selectionStatus.nextStep}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {statusSteps.map(step => (
                <div
                  key={step.label}
                  className="border border-slate-200 bg-[#fbfaf4] p-3"
                >
                  <div className="text-xs font-black uppercase tracking-[0.14em] text-[#10264d]">
                    {step.label}
                  </div>
                  <div className="mt-2 text-xs leading-5 text-slate-600">
                    {step.state}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-md bg-[#caa24a] font-bold text-[#101828] hover:bg-[#d7b35b]"
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
                className="h-12 rounded-md border-[#10264d]/25 bg-white font-bold text-[#10264d] hover:bg-[#10264d] hover:text-white"
              >
                <Link href="/inscricao">
                  Fazer inscrição
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-md font-bold text-[#10264d] hover:bg-[#10264d]/10"
              >
                <a href="#historia">
                  <History size={18} />
                  Ver linha do tempo
                </a>
              </Button>
            </div>

            <div className="text-xs text-slate-500">
              Fonte: {selectionStatus.sourceLabel} ·{" "}
              {sourceStatusLabels[selectionStatus.sourceStatus]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
