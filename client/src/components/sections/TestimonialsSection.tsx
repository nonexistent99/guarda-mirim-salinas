import { ArrowUpRight, Archive, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  recentArchiveItems,
  sourceStatusLabels,
  sourceStatusTone,
  typeLabels,
} from "@/data/guardTimeline";

export default function TestimonialsSection() {
  return (
    <section id="acervo" className="bg-[#f6f3ea] py-20 text-[#10264d] md:py-28">
      <div className="container">
        <AnimatedSection>
          <div className="grid gap-8 md:grid-cols-[0.45fr_0.55fr] md:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border border-[#caa24a]/45 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8a6a1e]">
                <Archive size={16} />
                Posts recentes / acervo
              </div>
              <h2 className="text-4xl font-black leading-[0.95] md:text-6xl">
                Registros para manter a história perto.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-700 md:text-lg">
              Esta área mostra marcos com fonte pública e pode evoluir para um
              acervo de fotos, nomes de turma e lembranças enviadas pela
              comunidade.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recentArchiveItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={0.06 * index}>
              <article className="group h-full overflow-hidden border border-[#d8cda8] bg-white/85">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-end bg-[#10264d] p-4 text-white">
                    <span className="text-sm font-black uppercase tracking-[0.18em] text-[#d7b35b]">
                      Memória em construção
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="border border-[#10264d]/15 bg-[#10264d] px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                      {typeLabels[item.type]}
                    </span>
                    <span
                      className={`border px-2 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${sourceStatusTone[item.sourceStatus]}`}
                    >
                      {sourceStatusLabels[item.sourceStatus]}
                    </span>
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#caa24a]">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-xl font-black leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.instagramUrl && (
                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-black text-[#10264d] hover:text-[#8a6a1e]"
                      >
                        Post
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-black text-[#10264d] hover:text-[#8a6a1e]"
                      >
                        Fonte
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
