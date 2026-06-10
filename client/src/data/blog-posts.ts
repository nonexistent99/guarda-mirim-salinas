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
    id: "1",
    title: "Guarda Mirim celebra 40 anos com evento histórico em Salinas",
    excerpt:
      "Instituição marca quatro décadas de dedicação à formação de jovens com cerimônia especial reunindo ex-alunos, parceiros e autoridades.",
    content: `A Guarda Mirim de Salinas celebrou em grande estilo seus 40 anos de história com um evento memorável que reuniu mais de 500 pessoas. A cerimônia, realizada no auditório da Prefeitura Municipal, contou com a presença de ex-alunos que hoje são profissionais de sucesso, empresários parceiros, autoridades locais e familiares.

Durante o evento, foram homenageados os fundadores da instituição e apresentados os principais marcos de sua trajetória. "Estes 40 anos representam mais de 5 mil vidas transformadas e uma comunidade inteira que cresceu junto com a Guarda Mirim", afirmou o diretor executivo.

O destaque foi a apresentação de um documentário mostrando histórias de sucesso de ex-alunos que hoje ocupam posições de destaque em suas áreas profissionais. A celebração contou também com apresentações culturais de jovens aprendizes atuais.`,
    category: "noticia",
    author: "Redação Guarda Mirim",
    date: "2025-01-15",
    image: "/jovem-aprendiz-group.jpg",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    title: "Novo programa de capacitação em tecnologia é lançado",
    excerpt:
      "Guarda Mirim amplia oferta de cursos com foco em programação, desenvolvimento web e análise de dados.",
    content: `A Guarda Mirim de Salinas anunciou o lançamento de um novo programa de capacitação em tecnologia, respondendo à crescente demanda do mercado por profissionais qualificados nesta área.

O programa inclui cursos em programação (Python, JavaScript), desenvolvimento web (HTML, CSS, React), análise de dados e segurança da informação. As aulas serão ministradas por profissionais experientes da área tech e contarão com laboratórios equipados com computadores modernos.

"A tecnologia é o futuro, e queremos garantir que nossos jovens estejam preparados para as oportunidades que virão", explicou a coordenadora pedagógica. O programa terá início em fevereiro com inscrições abertas para jovens entre 14 e 24 anos.`,
    category: "destaque",
    author: "Coordenação Pedagógica",
    date: "2025-01-10",
    image: "/training-group.png",
    readTime: 4,
    featured: true,
  },
  {
    id: "3",
    title: "Parceria com 15 novas empresas amplia oportunidades de trabalho",
    excerpt:
      "Guarda Mirim firma convênios com empresas de diversos setores, criando mais de 50 vagas de aprendizagem.",
    content: `A Guarda Mirim de Salinas anunciou uma importante expansão de suas parcerias com o setor empresarial. Quinze novas empresas assinaram convênios com a instituição, comprometendo-se a oferecer oportunidades de aprendizagem prática para jovens formados pelo programa.

As empresas parceiras atuam em diversos setores: comércio, serviços, indústria, saúde e educação. Ao todo, foram criadas mais de 50 vagas de aprendizagem para os próximos meses.

"Estas parcerias são fundamentais para conectar a educação ao mercado de trabalho. Nossos jovens terão a oportunidade de ganhar experiência prática enquanto continuam sua formação", destacou o diretor de parcerias.`,
    category: "noticia",
    author: "Departamento de Parcerias",
    date: "2025-01-05",
    image: "/jovem-aprendiz-group.jpg",
    readTime: 3,
  },
  {
    id: "4",
    title: "Evento de Networking conecta jovens aprendizes com profissionais",
    excerpt:
      "Encontro reúne 200 participantes para troca de experiências e oportunidades de mentoria.",
    content: `A Guarda Mirim realizou com sucesso o primeiro evento de Networking do ano, reunindo 200 jovens aprendizes, profissionais experientes e empresários. O encontro, realizado no Centro de Convenções de Salinas, proporcionou momentos de troca de experiências, mentoria e networking.

Durante o evento, foram realizadas palestras com profissionais de sucesso que compartilharam suas trajetórias e dicas para o desenvolvimento profissional. Houve também rodas de conversa temáticas sobre diferentes áreas de atuação.

"Eventos como este são essenciais para que nossos jovens entendam as possibilidades que existem e façam conexões valiosas para suas carreiras", afirmou a coordenadora de eventos.`,
    category: "evento",
    author: "Coordenação de Eventos",
    date: "2024-12-20",
    image: "/salinas-city-view.jpg",
    readTime: 4,
  },
  {
    id: "5",
    title: "Depoimento: Como a Guarda Mirim mudou minha vida",
    excerpt:
      "João Silva, formado em 2018, conta sua história de transformação e sucesso profissional.",
    content: `João Silva, 24 anos, é um exemplo vivo do impacto transformador da Guarda Mirim de Salinas. Formado em 2018, ele passou de um jovem sem perspectivas para um profissional bem-sucedido na área de administração.

"Quando entrei na Guarda Mirim, eu não sabia o que queria para meu futuro. O programa não apenas me ensinou habilidades técnicas, mas também me mostrou a importância da disciplina, ética e responsabilidade", relembra João.

Após sua formação, João foi contratado por uma empresa local onde trabalhou por dois anos. Hoje, ele é gerente administrativo em uma empresa regional e está cursando faculdade de Administração. "Devo tudo isso à Guarda Mirim. A instituição mudou minha vida e a de minha família", conclui com gratidão.`,
    category: "depoimento",
    author: "João Silva",
    date: "2024-12-15",
    image: "/jovem-aprendiz-group.jpg",
    readTime: 5,
  },
  {
    id: "6",
    title: "Programa de bolsas para educação continuada é aprovado",
    excerpt:
      "Guarda Mirim abre inscrições para bolsas de estudo em cursos técnicos e superiores.",
    content: `A Guarda Mirim de Salinas anunciou a aprovação de um novo programa de bolsas destinado a apoiar ex-alunos que desejam continuar seus estudos em cursos técnicos ou superiores.

O programa oferecerá bolsas parciais e integrais, dependendo do perfil socioeconômico do candidato. As inscrições estão abertas para ex-alunos que completaram o programa de aprendizagem há pelo menos um ano.

"Acreditamos que a educação é um direito e um caminho para a transformação social. Este programa reflete nosso compromisso com o desenvolvimento contínuo de nossos ex-alunos", explicou a diretora educacional.`,
    category: "destaque",
    author: "Departamento Educacional",
    date: "2024-12-10",
    image: "/training-group.png",
    readTime: 3,
  },
  {
    id: "7",
    title: "Guarda Mirim recebe prêmio de Responsabilidade Social",
    excerpt:
      "Instituição é reconhecida por seu impacto na formação de jovens e desenvolvimento comunitário.",
    content: `A Guarda Mirim de Salinas foi homenageada com o Prêmio Regional de Responsabilidade Social, reconhecimento que destaca seu trabalho transformador na formação de jovens e impacto na comunidade.

O prêmio foi entregue durante cerimônia realizada em Belo Horizonte, com a presença de autoridades estaduais e representantes de diversas instituições. A premiação reconhece o trabalho de 40 anos da Guarda Mirim em conectar educação, cidadania e trabalho.

"Este prêmio é uma validação do nosso trabalho e um incentivo para continuarmos transformando vidas", afirmou o diretor executivo ao receber a honraria.`,
    category: "noticia",
    author: "Redação Guarda Mirim",
    date: "2024-12-05",
    image: "/salinas-aerial.jpg",
    readTime: 3,
  },
  {
    id: "8",
    title: "Workshop de empreendedorismo capacita jovens aprendizes",
    excerpt:
      "Evento prático ensina conceitos de negócios e plano de negócios para futuros empreendedores.",
    content: `A Guarda Mirim realizou um workshop intensivo sobre empreendedorismo, reunindo 80 jovens aprendizes interessados em abrir seus próprios negócios.

O evento contou com a participação de empreendedores locais bem-sucedidos que compartilharam suas experiências e desafios. Os participantes aprenderam sobre plano de negócios, gestão financeira, marketing e como transformar uma ideia em realidade.

"Muitos de nossos ex-alunos se tornam empreendedores. Este workshop é uma forma de preparar os atuais aprendizes para esta possibilidade", explicou o coordenador de empreendedorismo.`,
    category: "evento",
    author: "Coordenação de Empreendedorismo",
    date: "2024-11-30",
    image: "/jovem-aprendiz-group.jpg",
    readTime: 4,
  },
  {
    id: "9",
    title: "Estudo mostra 85% de empregabilidade entre ex-alunos",
    excerpt:
      "Pesquisa comprova efetividade do programa na inserção profissional de jovens.",
    content: `Um estudo realizado pela Guarda Mirim de Salinas revelou que 85% dos ex-alunos conseguem se inserir no mercado de trabalho dentro de seis meses após a conclusão do programa.

A pesquisa, que entrevistou mais de 1.000 ex-alunos dos últimos cinco anos, também mostrou que 60% deles conseguem manter seus empregos por mais de dois anos, indicando uma boa adaptação e desenvolvimento profissional.

"Estes números comprovam que nosso modelo de formação funciona e prepara realmente os jovens para o mercado de trabalho", afirmou o coordenador de pesquisa.`,
    category: "destaque",
    author: "Departamento de Pesquisa",
    date: "2024-11-25",
    image: "/salinas-city-view.jpg",
    readTime: 4,
  },
  {
    id: "10",
    title: "Inscrições abertas para turma 2025 da Guarda Mirim",
    excerpt:
      "Instituição recebe inscrições para novo ciclo de aprendizagem com 150 vagas disponíveis.",
    content: `A Guarda Mirim de Salinas abriu as inscrições para a turma de 2025, oferecendo 150 vagas para jovens entre 14 e 24 anos interessados em participar do programa de formação profissional.

As inscrições podem ser realizadas presencialmente na sede da instituição ou através do site. O processo seletivo inclui entrevista e avaliação de conhecimentos básicos.

"Estamos prontos para receber uma nova geração de jovens e transformar suas vidas através da educação, cidadania e trabalho", convida o diretor de admissões.`,
    category: "noticia",
    author: "Departamento de Admissões",
    date: "2024-11-20",
    image: "/training-group.png",
    readTime: 3,
  },
];

export const categories = [
  { id: "noticia", label: "Notícias", color: "primary" },
  { id: "destaque", label: "Destaques", color: "secondary" },
  { id: "evento", label: "Eventos", color: "accent" },
  { id: "depoimento", label: "Depoimentos", color: "primary" },
];
