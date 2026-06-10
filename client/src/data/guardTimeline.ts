export type TimelineSourceStatus =
  | "confirmed"
  | "possible"
  | "needs_confirmation";

export type TimelineItemType =
  | "origin"
  | "exam"
  | "class"
  | "formation"
  | "graduation"
  | "parade"
  | "social-action"
  | "anniversary"
  | "partner"
  | "digital"
  | "memory";

export type TimelineItem = {
  id: string;
  year: string;
  date?: string;
  title: string;
  subtitle?: string;
  type: TimelineItemType;
  className?: string;
  examNumber?: string;
  generation?: string;
  description: string;
  emotionalText: string;
  image?: string;
  gallery?: string[];
  instagramUrl?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  sourceStatus: TimelineSourceStatus;
  tags: string[];
  showOnHome: boolean;
  featured?: boolean;
  order: number;
};

export const typeLabels: Record<TimelineItemType, string> = {
  origin: "Origem",
  exam: "Exame de Seleção",
  class: "Turma",
  formation: "Formação",
  graduation: "Formatura",
  parade: "Desfile",
  "social-action": "Ação social",
  anniversary: "Aniversário",
  partner: "Empresas e parceiros",
  digital: "Nova fase digital",
  memory: "Memória",
};

export const sourceStatusLabels: Record<TimelineSourceStatus, string> = {
  confirmed: "Confirmado",
  possible: "Possível",
  needs_confirmation: "A confirmar",
};

export const sourceStatusTone: Record<TimelineSourceStatus, string> = {
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  possible: "border-amber-200 bg-amber-50 text-amber-800",
  needs_confirmation: "border-slate-200 bg-slate-50 text-slate-700",
};

export const timelineFilters = [
  { id: "all", label: "Todos", types: [] },
  { id: "exam", label: "Exames", types: ["exam"] },
  { id: "class", label: "Turmas", types: ["class", "formation"] },
  { id: "graduation", label: "Formaturas", types: ["graduation"] },
  { id: "parade", label: "Desfiles", types: ["parade"] },
  { id: "social", label: "Ações sociais", types: ["social-action"] },
  { id: "memory", label: "Memórias", types: ["memory"] },
  { id: "partner", label: "Empresas/parceiros", types: ["partner"] },
  { id: "needs_confirmation", label: "A confirmar", types: [] },
] as const;

export const timelineItems: TimelineItem[] = [
  {
    id: "1991-origem",
    year: "1991",
    date: "02/08/1991",
    title: "O começo da Guarda Mirim",
    subtitle: "Lei Municipal nº 1.277",
    type: "origin",
    description:
      "A página oficial da Prefeitura registra a criação da Guarda Mirim Municipal de Salinas pela Lei Municipal nº 1.277, de 02 de agosto de 1991.",
    emotionalText:
      "Antes de virar lembrança para tantas gerações, a Guarda começou como uma presença organizada na cidade.",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/secretarias/66/guarda-mirim/",
    sourceLabel: "Prefeitura de Salinas",
    sourceStatus: "confirmed",
    tags: ["origem", "lei", "cidade"],
    showOnHome: true,
    featured: true,
    order: 10,
  },
  {
    id: "2017-21-exame",
    year: "2017",
    title: "21º Exame de Seleção",
    type: "exam",
    examNumber: "21º",
    generation: "Turma 2017",
    description:
      "Registro público do 21º Exame de Seleção foi localizado no Instagram oficial da Guarda Mirim.",
    emotionalText:
      "Uma nova turma dava o primeiro passo. Antes da farda, vinha a prova. Antes da rotina, vinha a expectativa.",
    instagramUrl: "https://www.instagram.com/p/BZzjGSRFGqs/",
    sourceLabel: "Instagram oficial",
    sourceStatus: "possible",
    tags: ["exame", "turma", "instagram"],
    showOnHome: true,
    order: 20,
  },
  {
    id: "2020-graduacao-regional",
    year: "2020",
    date: "15/02/2020",
    title: "Uma solenidade para marcar ciclos",
    subtitle: "Graduação regional",
    type: "graduation",
    description:
      "A Prefeitura registrou solenidade de graduação envolvendo Salinas, São João do Paraíso e Virgem da Lapa, com parceria citada com a Polícia Militar.",
    emotionalText:
      "A formatura é o momento em que a rotina vira reconhecimento. A família vê, a cidade vê, e o jovem entende que aquela etapa ficou para sempre.",
    image: "/images/timeline/2020-graduacao.jpg",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/secretarias/66/guarda-mirim/",
    sourceLabel: "Prefeitura de Salinas",
    sourceStatus: "confirmed",
    tags: ["formatura", "graduação", "regional"],
    showOnHome: true,
    featured: true,
    order: 30,
  },
  {
    id: "2021-30-anos",
    year: "2021",
    title: "Três décadas de história",
    type: "anniversary",
    description:
      "A Prefeitura noticiou comemoração dos 30 anos da Guarda Mirim de Salinas em 2021.",
    emotionalText:
      "Não se comemora apenas uma data. Comemora-se cada jovem que passou, cada família que acompanhou e cada memória que ficou.",
    image: "/images/timeline/2021-30-anos.jpg",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/noticias/0/3/1852/guarda-mirim-de-salinas-realiza-serie-de-atividades-em-comemoracao-aos-30-anos-da-instituicao",
    sourceLabel: "Notícia da Prefeitura",
    sourceStatus: "confirmed",
    tags: ["aniversário", "30 anos", "memória"],
    showOnHome: true,
    order: 40,
  },
  {
    id: "2022-23-exame",
    year: "2022",
    title: "23º Exame de Seleção",
    type: "exam",
    examNumber: "23º",
    generation: "Turma 2022",
    description:
      "O portal oficial lista o 23º Exame de Seleção e vídeos públicos vinculados ao processo de 2022.",
    emotionalText:
      "A cada processo seletivo, a Guarda se renova. Novos rostos chegam, mas o sentimento de pertencimento continua.",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/secretarias/66/guarda-mirim/",
    sourceLabel: "Prefeitura de Salinas",
    sourceStatus: "confirmed",
    tags: ["exame", "turma", "processo seletivo"],
    showOnHome: true,
    order: 50,
  },
  {
    id: "2023-acao-social",
    year: "2023",
    title: "A Guarda além da formação",
    subtitle: "Posse, cultura e solidariedade",
    type: "social-action",
    description:
      "Foram encontrados registros públicos de posse de aprovados, edital do 24º exame, participação cultural e ação Papai Noel dos Correios.",
    emotionalText:
      "A história também aparece nos encontros, nas ações solidárias, nos jogos, na música e nos momentos em que a cidade reconhece seus jovens.",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/noticias/0/3/2565/guarda-mirim-de-salinas-participa-do-papai-noel-dos-correios-2023/",
    sourceLabel: "Notícia da Prefeitura",
    sourceStatus: "confirmed",
    tags: ["ação social", "solidariedade", "cidade"],
    showOnHome: true,
    order: 60,
  },
  {
    id: "2024-formacao",
    year: "2024",
    title: "Aprender, representar e concluir",
    type: "formation",
    examNumber: "24º",
    generation: "Turma 2024",
    description:
      "Há registros oficiais do 24º Exame, aula inaugural, curso preparatório, solenidade de graduação e fotos públicas vinculadas à Guarda Mirim.",
    emotionalText:
      "Entre aulas, orientações e solenidades, cada jovem atravessa uma jornada: entra como candidato e sai carregando uma postura diferente.",
    image: "/images/timeline/2024-formacao.jpg",
    gallery: [
      "/images/guarda/uniforme.jpg",
      "/images/guarda/formatura.jpg",
      "/images/guarda/desfile.jpg",
    ],
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/noticias/0/3/2764/guarda-mirim-realiza-solenidade-de-graduacao/",
    sourceLabel: "Notícia da Prefeitura",
    sourceStatus: "confirmed",
    tags: ["formação", "24º exame", "graduação"],
    showOnHome: true,
    featured: true,
    order: 70,
  },
  {
    id: "2025-memoria-turma",
    year: "2025",
    title: "Memória, turma e presença na cidade",
    type: "anniversary",
    examNumber: "25º",
    generation: "Turma 2025",
    description:
      "Fontes públicas registram o 25º Exame de Seleção, aula inaugural, 34 anos da Guarda e participação em desfile cívico.",
    emotionalText:
      "Quem desfila não caminha sozinho. Caminha com a turma, com a família e com todos que um dia vestiram esse uniforme.",
    image: "/images/timeline/2025-desfile.jpg",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/noticias/0/3/3208/na-midia---guarda-mirim-de-salinas-comemora-34-anos-formando-jovens-cidadaos/",
    sourceLabel: "Prefeitura de Salinas",
    sourceStatus: "confirmed",
    tags: ["25º exame", "34 anos", "desfile"],
    showOnHome: true,
    featured: true,
    order: 80,
  },
  {
    id: "2026-fase-digital",
    year: "2026",
    title: "A história agora também mora no digital",
    type: "digital",
    examNumber: "26º",
    generation: "Turma 2026",
    description:
      "O portal oficial lista o Edital nº 001/2026 do 26º Exame de Seleção, e o Instagram público registra etapas como edital, inscrições, prova, gabarito e classificados.",
    emotionalText:
      "O que antes ficava espalhado em posts, fotos e lembranças começa a ganhar uma casa própria: um lugar para acompanhar inscrições, preservar turmas e guardar memórias.",
    instagramUrl: "https://www.instagram.com/p/DVuCTrbAU-x/",
    sourceUrl:
      "https://www.salinas.mg.gov.br/portal/editais/0/3/3238/",
    sourceLabel: "Edital oficial 2026",
    sourceStatus: "confirmed",
    tags: ["26º exame", "digital", "edital"],
    showOnHome: true,
    featured: true,
    order: 90,
  },
];

export const selectionStatus = {
  statusLabel: "Acompanhe os próximos processos seletivos",
  title: "26º Exame de Seleção no portal oficial",
  description:
    "O edital público de 2026 está disponível no portal da Prefeitura. Como a etapa de prova já tinha data oficial para 19/04/2026, a home evita afirmar que há inscrição ativa sem confirmação nova da Guarda.",
  nextStep: "Confirmar próxima etapa com a Guarda Mirim antes de publicar novo aviso.",
  editalUrl:
    "https://www.salinas.mg.gov.br/portal/editais/0/3/3238/",
  registrationUrl: "/inscricao",
  resultUrl:
    "https://www.salinas.mg.gov.br/portal/secretarias/66/guarda-mirim/",
  sourceStatus: "confirmed" as TimelineSourceStatus,
  sourceLabel: "Prefeitura de Salinas",
};

export const recentArchiveItems = timelineItems
  .filter(item => item.showOnHome && item.featured)
  .sort((a, b) => b.order - a.order)
  .slice(0, 4);

