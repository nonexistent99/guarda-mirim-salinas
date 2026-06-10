export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "noticia" | "destaque" | "evento" | "depoimento";
  author: string;
  date: string;
  image: string;
  readTime: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "edital-26-exame-2026",
    title: "26º Exame de Seleção tem edital publicado no portal oficial",
    excerpt:
      "O Edital nº 001/2026 está disponível no portal da Prefeitura de Salinas para consulta pública.",
    content: `O portal oficial da Prefeitura de Salinas publicou o Edital nº 001/2026 do 26º Exame de Seleção da Guarda Mirim Municipal de Salinas.

A página pública informa a publicação do edital e mantém o documento disponível para consulta. Antes de divulgar novas etapas, datas ou chamadas na home, a equipe deve conferir a situação atual diretamente no portal oficial e no Instagram da Guarda Mirim.

Fonte: https://www.salinas.mg.gov.br/portal/editais/0/3/3238/`,
    category: "noticia",
    author: "Fonte pública oficial",
    date: "2026-03-09",
    image: "/images/guarda/hero-formacao.jpg",
    readTime: 2,
    featured: true,
  },
  {
    id: "guarda-mirim-34-anos-2025",
    title: "Guarda Mirim completa 34 anos em 2025",
    excerpt:
      "Registro público destaca a trajetória da Guarda Mirim na formação de jovens cidadãos em Salinas.",
    content: `Em 2025, fontes públicas registraram os 34 anos da Guarda Mirim de Salinas. O marco aparece em notícia vinculada ao portal da Prefeitura e em matéria pública sobre a instituição.

Esse tipo de conteúdo deve ser usado como referência para a narrativa da linha do tempo, sempre com link de fonte e sem transformar frases comemorativas em estatísticas não confirmadas.

Fontes: https://www.salinas.mg.gov.br/portal/noticias/0/3/3208/na-midia---guarda-mirim-de-salinas-comemora-34-anos-formando-jovens-cidadaos/ e https://minasnews.com.br/guarda-mirim-de-salinas-completa-34-anos-com-destaque-na-formacao-de-jovens-cidadaos/`,
    category: "destaque",
    author: "Fonte pública",
    date: "2025-05-12",
    image: "/images/timeline/2025-desfile.jpg",
    readTime: 3,
    featured: true,
  },
  {
    id: "aula-inaugural-2025",
    title: "Aula inaugural do Curso de Assistente Administrativo",
    excerpt:
      "A Prefeitura publicou registro da aula inaugural realizada pela Guarda Mirim em 2025.",
    content: `A Prefeitura de Salinas publicou notícia sobre a aula inaugural do Curso de Assistente Administrativo da Guarda Mirim em 2025.

Esse registro reforça a importância de tratar a home como acervo vivo: cada formação, aula inaugural e solenidade pode alimentar a timeline com data, fonte, imagem e contexto.

Fonte: https://www.salinas.mg.gov.br/portal/noticias/0/3/3225/guarda-mirim-realiza-aula-inaugural-do-curso-de-assistente-administrativo/`,
    category: "evento",
    author: "Prefeitura de Salinas",
    date: "2025-05-22",
    image: "/images/guarda/hero-formacao.jpg",
    readTime: 2,
  },
  {
    id: "graduacao-2024",
    title: "Solenidade de graduação registrada pela Prefeitura",
    excerpt:
      "Notícia oficial de 2024 registra solenidade de graduação da Guarda Mirim.",
    content: `A Prefeitura de Salinas publicou registro da solenidade de graduação da Guarda Mirim realizada em 2024.

O conteúdo é uma das bases visuais e documentais da nova timeline: formaturas são momentos de fechamento de ciclo e devem aparecer com foto, fonte e texto emocional separado da descrição factual.

Fonte: https://www.salinas.mg.gov.br/portal/noticias/0/3/2764/guarda-mirim-realiza-solenidade-de-graduacao/`,
    category: "evento",
    author: "Prefeitura de Salinas",
    date: "2024-04-26",
    image: "/images/guarda/formatura.jpg",
    readTime: 2,
    featured: true,
  },
  {
    id: "papai-noel-correios-2023",
    title: "Ação social no Papai Noel dos Correios",
    excerpt:
      "Registro oficial mostra participação da Guarda Mirim em ação social de 2023.",
    content: `A Guarda Mirim de Salinas participou da campanha Papai Noel dos Correios 2023, conforme notícia publicada no portal da Prefeitura.

Na nova home, esse tipo de registro entra como ação social: um marco que mostra a presença dos mirins também fora da rotina de formação.

Fonte: https://www.salinas.mg.gov.br/portal/noticias/0/3/2565/guarda-mirim-de-salinas-participa-do-papai-noel-dos-correios-2023/`,
    category: "noticia",
    author: "Prefeitura de Salinas",
    date: "2023-12-20",
    image: "/salinas-city-view.jpg",
    readTime: 2,
  },
  {
    id: "memorias-em-construcao",
    title: "Memórias de ex-mirins entram em revisão antes de ir ao ar",
    excerpt:
      "A nova linha do tempo abre espaço para relatos, fotos antigas e lembranças enviadas pela comunidade.",
    content: `A nova experiência do site foi preparada para receber memórias de ex-mirins, familiares, instrutores e parceiros.

Todo relato recebido deve passar por revisão, autorização de uso de imagem e checagem mínima de contexto antes de virar item público da timeline. Quando não houver confirmação suficiente, o conteúdo deve permanecer marcado como "a confirmar".`,
    category: "depoimento",
    author: "Equipe do site",
    date: "2026-06-10",
    image: "/images/guarda/desfile.jpg",
    readTime: 2,
  },
];

export const categories = [
  { id: "noticia", label: "Notícias", color: "primary" },
  { id: "destaque", label: "Destaques", color: "secondary" },
  { id: "evento", label: "Eventos", color: "accent" },
  { id: "depoimento", label: "Memórias", color: "primary" },
];
