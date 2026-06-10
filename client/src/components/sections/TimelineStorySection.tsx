import {
  ArrowUpRight,
  Camera,
  ChevronDown,
  Circle,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  sourceStatusLabels,
  timelineFilters,
  timelineItems,
  type TimelineItem,
  type TimelineItemType,
  typeLabels,
} from "@/data/guardTimeline";

type TimelineFilterId =
  | "all"
  | "exam"
  | "class"
  | "graduation"
  | "parade"
  | "social"
  | "memory";

type ChapterCopy = {
  factual: string;
  emotional: string;
};

const publicFilterIds: TimelineFilterId[] = [
  "all",
  "exam",
  "class",
  "graduation",
  "parade",
  "social",
  "memory",
];

const chapterCopy: Record<string, ChapterCopy> = {
  "1991-origem": {
    factual: "A Lei Municipal nº 1.277 registrou a criação da Guarda Mirim.",
    emotional:
      "Ali começava uma presença que atravessaria gerações em Salinas.",
  },
  "2017-21-exame": {
    factual: "O 21º Exame de Seleção aparece em registro do Instagram oficial.",
    emotional:
      "Antes da farda, vinha a prova. Antes da rotina, vinha a expectativa.",
  },
  "2020-graduacao-regional": {
    factual: "A Prefeitura registrou uma solenidade regional de graduação.",
    emotional:
      "A formatura transforma rotina em reconhecimento diante da família.",
  },
  "2021-30-anos": {
    factual: "A Guarda Mirim celebrou três décadas de história em 2021.",
    emotional:
      "Uma data assim guarda muitos nomes, famílias e caminhos começados.",
  },
  "2022-23-exame": {
    factual: "O portal oficial lista o 23º Exame de Seleção.",
    emotional:
      "A cada processo seletivo, a história ganha novos rostos.",
  },
  "2023-acao-social": {
    factual: "Registros públicos mostram ações sociais e culturais da Guarda.",
    emotional:
      "A formação também acontece quando a cidade encontra seus jovens.",
  },
  "2024-formacao": {
    factual: "O 24º Exame, a aula inaugural e a graduação têm registro oficial.",
    emotional:
      "Entre aulas e solenidades, o candidato passa a carregar postura de turma.",
  },
  "2025-memoria-turma": {
    factual: "Fontes públicas registram exame, aniversário e presença cívica.",
    emotional:
      "Quem desfila caminha com a turma, a família e a memória da cidade.",
  },
  "2026-fase-digital": {
    factual: "O Edital 001/2026 do 26º Exame está no portal da Prefeitura.",
    emotional:
      "Agora as lembranças também ganham uma casa para permanecer.",
  },
};

function getChapterCopy(item: TimelineItem): ChapterCopy {
  return (
    chapterCopy[item.id] ?? {
      factual: item.description.split(".")[0] + ".",
      emotional: item.emotionalText.split(".")[0] + ".",
    }
  );
}

function getChapterTone(index: number) {
  const tones = [
    {
      section: "bg-[#07152d] text-white",
      eyebrow: "text-[#d7b35b]",
      muted: "text-white/70",
      soft: "text-white/58",
      line: "bg-white/18",
      accent: "bg-[#d7b35b]",
      frame: "border-white/18 bg-white/[0.04]",
      source: "text-white/56",
      link: "border-white/20 text-white hover:bg-white/10",
      year: "text-white/[0.07]",
    },
    {
      section: "bg-[#efe6d2] text-[#10264d]",
      eyebrow: "text-[#8a6a1e]",
      muted: "text-slate-700",
      soft: "text-slate-500",
      line: "bg-[#10264d]/16",
      accent: "bg-[#caa24a]",
      frame: "border-[#10264d]/14 bg-white/30",
      source: "text-slate-500",
      link: "border-[#10264d]/20 text-[#10264d] hover:bg-[#10264d]/10",
      year: "text-[#10264d]/[0.06]",
    },
    {
      section: "bg-[#fbfaf4] text-[#10264d]",
      eyebrow: "text-[#8a6a1e]",
      muted: "text-slate-700",
      soft: "text-slate-500",
      line: "bg-[#caa24a]/32",
      accent: "bg-[#10264d]",
      frame: "border-[#caa24a]/25 bg-[#f6f3ea]/65",
      source: "text-slate-500",
      link: "border-[#10264d]/20 text-[#10264d] hover:bg-[#10264d]/10",
      year: "text-[#caa24a]/[0.12]",
    },
  ];

  return tones[index % tones.length];
}

function matchesFilter(item: TimelineItem, filterId: TimelineFilterId) {
  if (filterId === "all") return true;
  const filter = timelineFilters.find(candidate => candidate.id === filterId);
  const filterTypes = (filter?.types ?? []) as readonly TimelineItemType[];

  return filterTypes.includes(item.type);
}

function MemoryPlaceholder({ item }: { item: TimelineItem }) {
  return (
    <div className="relative flex h-full min-h-[58vh] overflow-hidden border border-[#d7b35b]/30 bg-[#07152d] p-5 text-white md:min-h-[72vh] md:p-8">
      <div className="archive-texture absolute inset-0 opacity-70" />
      <div className="absolute inset-5 border border-white/12" />
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#d7b35b]">
            <Camera size={16} />
            Memória em construção
          </span>
          <span className="rotate-3 border border-[#d7b35b]/45 px-3 py-1 text-sm font-black text-[#d7b35b]">
            {item.year}
          </span>
        </div>
        <div>
          <p className="max-w-xs text-4xl font-black leading-none text-white/92 md:text-6xl">
            Espaço para uma foto que ainda precisa aparecer.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/64">
            Se esse ano mora em uma caixa, um álbum ou uma lembrança de família,
            ele pode entrar nesta história.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChapterImage({
  item,
  index,
  reduceMotion,
}: {
  item: TimelineItem;
  index: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const parallaxY = useTransform(y, [0, 1], [-24, 24]);

  if (!item.image) {
    return (
      <motion.div
        ref={ref}
        initial={reduceMotion ? false : { opacity: 0, y: 34 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <MemoryPlaceholder item={item} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-3 border border-[#d7b35b]/25 md:-inset-5" />
      <div className="relative overflow-hidden bg-[#07152d] shadow-[0_30px_120px_rgba(0,0,0,0.28)]">
        <motion.img
          src={item.image}
          alt={item.title}
          loading={index < 2 ? "eager" : "lazy"}
          style={reduceMotion ? undefined : { y: parallaxY }}
          className="h-[58vh] w-full scale-105 object-cover grayscale-[18%] transition duration-700 hover:grayscale-0 md:h-[74vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/12" />
      </div>
    </motion.div>
  );
}

function Chapter({
  item,
  index,
  onActive,
}: {
  item: TimelineItem;
  index: number;
  onActive: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    margin: "-35% 0px -45% 0px",
    once: false,
  });
  const reduceMotion = Boolean(useReducedMotion());
  const copy = getChapterCopy(item);
  const tone = getChapterTone(index);
  const sourceHref = item.sourceUrl ?? item.instagramUrl;

  useEffect(() => {
    if (isInView) onActive(item.id);
  }, [isInView, item.id, onActive]);

  return (
    <article
      id={`marco-${item.id}`}
      ref={ref}
      className={`relative min-h-[88vh] overflow-hidden py-16 md:py-24 ${tone.section}`}
    >
      <div className="film-grain opacity-35" />
      <div
        className={`pointer-events-none absolute -right-8 top-4 font-black leading-none ${tone.year} text-[30vw] tracking-[-0.06em] md:-right-16 md:-top-8 md:text-[20vw]`}
      >
        {item.year}
      </div>

      <div className="container relative z-10">
        <div
          className={`grid min-h-[72vh] gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-center ${
            index % 2 ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <ChapterImage item={item} index={index} reduceMotion={reduceMotion} />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className={`mb-8 h-px w-28 ${tone.line}`}>
              <div className={`h-px w-12 ${tone.accent}`} />
            </div>

            <div
              className={`mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] ${tone.eyebrow}`}
            >
              <Circle size={9} fill="currentColor" />
              {typeLabels[item.type]}
              {item.examNumber && <span>{item.examNumber}</span>}
            </div>

            <div className="flex items-baseline gap-4">
              <span className={`text-7xl font-black leading-none md:text-9xl ${tone.eyebrow}`}>
                {item.year}
              </span>
              {item.date && (
                <span className={`text-xs font-black uppercase tracking-[0.18em] ${tone.soft}`}>
                  {item.date}
                </span>
              )}
            </div>

            <h3 className="mt-7 max-w-xl text-4xl font-black leading-[0.94] md:text-6xl">
              {item.title}
            </h3>

            <p className={`mt-7 max-w-xl text-base font-semibold leading-8 md:text-lg ${tone.muted}`}>
              {copy.factual}
            </p>

            <p className="mt-5 max-w-xl border-l-2 border-[#d7b35b] pl-5 text-xl font-black leading-8 md:text-2xl md:leading-9">
              {copy.emotional}
            </p>

            <div className={`mt-8 flex flex-wrap items-center gap-3 text-xs ${tone.source}`}>
              <span>
                Fonte: {item.sourceLabel ?? sourceStatusLabels[item.sourceStatus]}
                {item.sourceStatus !== "confirmed" &&
                  ` · ${sourceStatusLabels[item.sourceStatus]}`}
              </span>
              {sourceHref && (
                <a
                  href={sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${tone.link}`}
                >
                  Abrir fonte
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

function TimelineYearNav({
  items,
  activeId,
  progress,
}: {
  items: TimelineItem[];
  activeId: string;
  progress: MotionValue<number>;
}) {
  const activeItem = items.find(item => item.id === activeId) ?? items[0];

  const scrollToChapter = (id: string) => {
    document
      .querySelector(`#marco-${CSS.escape(id)}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <aside className="pointer-events-none sticky top-24 z-20 hidden h-[calc(100vh-7rem)] w-24 shrink-0 xl:flex xl:flex-col xl:items-center xl:justify-between">
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
          Agora
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeItem?.year}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-2 text-3xl font-black text-[#d7b35b]"
          >
            {activeItem?.year}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative flex flex-1 py-8">
        <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-white/14" />
        <motion.div
          className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px origin-top -translate-x-1/2 bg-[#d7b35b]"
          style={{ scaleY: progress }}
        />
        <div className="pointer-events-auto relative z-10 flex flex-col justify-between">
          {items.map(item => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToChapter(item.id)}
                className={`group flex h-8 w-16 items-center justify-center text-xs font-black transition-colors ${
                  isActive ? "text-[#d7b35b]" : "text-white/45 hover:text-white"
                }`}
                aria-label={`Ir para ${item.year}`}
              >
                <span
                  className={`mr-2 h-2 w-2 rounded-full border transition-colors ${
                    isActive
                      ? "border-[#d7b35b] bg-[#d7b35b]"
                      : "border-white/35 bg-[#07152d]"
                  }`}
                />
                {item.year}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function FilterNav({
  activeFilter,
  activeYear,
  onFilterChange,
}: {
  activeFilter: TimelineFilterId;
  activeYear: string;
  onFilterChange: (filter: TimelineFilterId) => void;
}) {
  const filters = timelineFilters.filter(filter =>
    publicFilterIds.includes(filter.id as TimelineFilterId)
  );

  return (
    <div className="sticky top-0 z-30 border-y border-white/10 bg-[#07152d]/92 text-white backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-3">
        <div className="hidden min-w-20 text-sm font-black text-[#d7b35b] sm:block">
          {activeYear}
        </div>
        <div className="flex flex-1 gap-2 overflow-x-auto pb-1 sm:justify-center sm:pb-0">
          {filters.map(filter => (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id as TimelineFilterId)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                activeFilter === filter.id
                  ? "border-[#d7b35b] bg-[#d7b35b] text-[#07152d]"
                  : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/35 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryIntro() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07152d] text-white">
      <div className="archive-texture absolute inset-0 opacity-70" />
      <div className="film-grain opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07152d] to-transparent" />
      <div className="absolute -right-10 top-24 hidden w-[52vw] rotate-2 md:block">
        <img
          src="/images/guarda/desfile.jpg"
          alt="Guarda Mirim em desfile"
          className="h-[54vh] w-full object-cover opacity-72 grayscale"
        />
      </div>
      <div className="absolute right-[18vw] top-[32vh] hidden w-[22vw] -rotate-3 border border-white/18 bg-white/5 p-2 md:block">
        <img
          src="/images/guarda/formatura.jpg"
          alt="Solenidade da Guarda Mirim"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="absolute bottom-14 right-10 hidden w-[22vw] rotate-6 border border-[#d7b35b]/28 bg-[#d7b35b]/8 p-2 lg:block">
        <img
          src="/images/guarda/uniforme.jpg"
          alt="Jovens da Guarda Mirim uniformizados"
          className="aspect-[4/3] w-full object-cover grayscale-[25%]"
        />
      </div>

      <div className="container relative z-10 flex min-h-screen items-center py-24">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#d7b35b]">
            <Sparkles size={16} />
            Linha do tempo documental
          </div>
          <div className="text-[22vw] font-black leading-[0.72] text-white/[0.08] md:text-[13rem]">
            1991
          </div>
          <h2 className="-mt-4 max-w-4xl text-5xl font-black leading-[0.9] md:text-7xl lg:text-8xl">
            Uma linha do tempo feita de nomes, turmas e memórias.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
            De geração em geração, a Guarda Mirim de Salinas foi deixando
            marcas: no uniforme, nas formaturas, nos desfiles, nas famílias e na
            cidade.
          </p>
          <a
            href="#marco-1991-origem"
            className="mt-10 inline-flex items-center gap-3 border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
          >
            Começar a história
            <ChevronDown size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TimelineStorySection() {
  const [activeFilter, setActiveFilter] = useState<TimelineFilterId>("all");
  const [activeId, setActiveId] = useState(timelineItems[0]?.id ?? "");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 80%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const filteredItems = useMemo(() => {
    return timelineItems
      .filter(item => item.showOnHome)
      .filter(item => matchesFilter(item, activeFilter))
      .sort((a, b) => a.order - b.order);
  }, [activeFilter]);

  useEffect(() => {
    if (filteredItems[0]) setActiveId(filteredItems[0].id);
  }, [filteredItems]);

  const activeYear =
    filteredItems.find(item => item.id === activeId)?.year ??
    filteredItems[0]?.year ??
    "";

  return (
    <section id="historia" ref={sectionRef} className="relative bg-[#07152d]">
      <StoryIntro />
      <FilterNav
        activeFilter={activeFilter}
        activeYear={activeYear}
        onFilterChange={setActiveFilter}
      />

      <div className="relative">
        <div className="container pointer-events-none absolute inset-x-0 top-0 z-20 hidden xl:flex">
          <TimelineYearNav
            items={filteredItems}
            activeId={activeId}
            progress={progress}
          />
        </div>

        <div className="xl:pl-24">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Chapter
                key={item.id}
                item={item}
                index={index}
                onActive={setActiveId}
              />
            ))
          ) : (
            <div className="container py-24 text-center text-white">
              <p className="text-3xl font-black">Ainda não há capítulos aqui.</p>
              <p className="mx-auto mt-4 max-w-xl text-white/62">
                Quando uma memória for confirmada, ela poderá aparecer como um
                novo capítulo desta história.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
