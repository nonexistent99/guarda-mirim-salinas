import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  ExternalLink,
  Filter,
  Hourglass,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  sourceStatusLabels,
  sourceStatusTone,
  timelineFilters,
  timelineItems,
  type TimelineItem,
  typeLabels,
} from "@/data/guardTimeline";

type TimelineFilterId = (typeof timelineFilters)[number]["id"];

function TimelineImage({ item }: { item: TimelineItem }) {
  if (!item.image) {
    return (
      <div className="flex aspect-[4/3] min-h-72 flex-col justify-between border border-dashed border-[#caa24a]/50 bg-[#f6f3ea] p-5 text-[#10264d]">
        <div className="inline-flex h-11 w-11 items-center justify-center border border-[#10264d]/20">
          <Camera size={20} />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a6a1e]">
            Memória em construção
          </p>
          <p className="mt-2 text-2xl font-black leading-tight">
            Imagem histórica a ser adicionada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden border border-white/70 bg-slate-100 shadow-[0_20px_70px_rgba(15,23,42,0.14)]">
      <img
        src={item.image}
        alt={item.title}
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        loading="lazy"
      />
    </div>
  );
}

function SourceBadge({ item }: { item: TimelineItem }) {
  return (
    <span
      className={`inline-flex border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${sourceStatusTone[item.sourceStatus]}`}
    >
      {sourceStatusLabels[item.sourceStatus]}
    </span>
  );
}

function TimelineCard({
  item,
  onActive,
  reduceMotion,
}: {
  item: TimelineItem;
  onActive: (year: string) => void;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    margin: "-35% 0px -45% 0px",
    once: false,
  });

  useEffect(() => {
    if (isInView) onActive(item.year);
  }, [isInView, item.year, onActive]);

  return (
    <motion.article
      ref={ref}
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-6 border border-[#d9d0ba] bg-white/85 p-4 shadow-[0_18px_80px_rgba(24,35,53,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-6"
    >
      <div className="absolute -left-[2.35rem] top-8 hidden h-4 w-4 border-2 border-[#f6f3ea] bg-[#caa24a] shadow-[0_0_0_6px_rgba(202,162,74,0.2)] lg:block" />
      <TimelineImage item={item} />

      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="border border-[#10264d]/15 bg-[#10264d] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
              {typeLabels[item.type]}
            </span>
            <SourceBadge item={item} />
            {item.examNumber && (
              <span className="border border-[#caa24a]/40 bg-[#fff7df] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#7b5a10]">
                {item.examNumber} exame
              </span>
            )}
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-5xl font-black leading-none text-[#caa24a]">
              {item.year}
            </span>
            {item.date && (
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {item.date}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-black leading-tight text-[#10264d] md:text-3xl">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
              {item.subtitle}
            </p>
          )}

          <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base">
            {item.description}
          </p>
          <blockquote className="mt-5 border-l-2 border-[#caa24a] pl-4 text-lg font-semibold leading-8 text-[#10264d]">
            {item.emotionalText}
          </blockquote>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {item.instagramUrl && (
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#10264d] bg-[#10264d] px-4 py-2 text-sm font-black text-white transition-colors hover:bg-[#173869]"
            >
              Ver post original
              <ArrowUpRight size={16} />
            </a>
          )}
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 text-sm font-black text-[#10264d] transition-colors hover:border-[#10264d]"
            >
              Ver fonte
              <ExternalLink size={16} />
            </a>
          )}
          {item.sourceLabel && (
            <span className="text-xs font-semibold text-slate-500">
              Fonte: {item.sourceLabel}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function MemoryGapCard() {
  return (
    <div className="border border-dashed border-[#caa24a]/60 bg-[#10264d] p-5 text-white md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d7b35b]">
            Linha do tempo aberta
          </p>
          <h3 className="mt-2 text-2xl font-black">
            Tem uma memória desse período?
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
            Se você foi mirim, familiar, instrutor ou guardou uma foto antiga,
            essa memória também pode fazer parte da linha do tempo.
          </p>
        </div>
        <a
          href="#memorias"
          className="inline-flex items-center justify-center border border-white/30 px-4 py-3 text-sm font-black text-white transition-colors hover:bg-white/10"
        >
          Enviar memória
          <ArrowUpRight className="ml-2" size={16} />
        </a>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const [activeFilter, setActiveFilter] = useState<TimelineFilterId>("all");
  const [activeYear, setActiveYear] = useState(timelineItems[0]?.year ?? "");
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 68%", "end 54%"],
  });

  const filteredItems = useMemo(() => {
    const filter = timelineFilters.find(item => item.id === activeFilter);

    return timelineItems
      .filter(item => item.showOnHome)
      .filter(item => {
        if (activeFilter === "all") return true;
        if (activeFilter === "needs_confirmation") {
          return item.sourceStatus === "needs_confirmation";
        }

        return filter?.types.includes(item.type as never);
      })
      .sort((a, b) => a.order - b.order);
  }, [activeFilter]);

  useEffect(() => {
    if (filteredItems[0]) setActiveYear(filteredItems[0].year);
  }, [filteredItems]);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f6f3ea] py-20 text-[#10264d] md:py-28"
    >
      <div className="archive-texture absolute inset-0 opacity-80" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
            <div className="border-y border-[#caa24a]/45 py-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a6a1e]">
                Linha do tempo documental
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[0.95] md:text-6xl">
                Cada mirim levou uma história.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base">
                Os marcos abaixo separam fato e memória: cada item mostra a
                fonte, o status de confirmação e o espaço para completar lacunas
                com fotos antigas, relatos e registros oficiais.
              </p>
            </div>

            <div className="mt-8 hidden lg:block">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Ano ativo
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.28 }}
                  className="mt-2 text-8xl font-black leading-none text-[#caa24a]"
                >
                  {activeYear}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                <CheckCircle2 size={16} />
                Fonte visível
              </div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                <Hourglass size={16} />
                Lacunas editáveis
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-8 border border-[#d8cda8] bg-white/72 p-3">
              <div className="mb-3 flex items-center gap-2 px-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                <Filter size={15} />
                Filtrar linha do tempo
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {timelineFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`shrink-0 border px-4 py-2 text-sm font-black transition-colors ${
                      activeFilter === filter.id
                        ? "border-[#10264d] bg-[#10264d] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#10264d]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 hidden h-full w-px bg-[#d8cda8] lg:block" />
              <motion.div
                className="absolute left-0 top-0 hidden w-px origin-top bg-[#caa24a] lg:block"
                style={{ height: "100%", scaleY: scrollYProgress }}
              />

              <div className="grid gap-8 lg:pl-10">
                <AnimatePresence initial={false}>
                  {filteredItems.map(item => (
                    <div key={item.id} className="grid gap-8">
                      <TimelineCard
                        item={item}
                        onActive={setActiveYear}
                        reduceMotion={reduceMotion}
                      />
                      {item.id === "2017-21-exame" && <MemoryGapCard />}
                    </div>
                  ))}
                </AnimatePresence>

                {filteredItems.length === 0 && (
                  <div className="border border-dashed border-[#caa24a]/60 bg-white/80 p-8 text-center">
                    <p className="text-lg font-black text-[#10264d]">
                      Nenhum item nesse filtro ainda.
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Essa lacuna fica aberta para validação da Guarda Mirim e
                      envio de memórias.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
