# Guarda Mirim de Salinas - Website Institucional

Um site institucional moderno, harmônico e visualmente envolvente para o movimento Guarda Mirim de Salinas, um programa com mais de 40 anos de história que atua como porta de entrada dos jovens ao mundo do trabalho.

## 🎯 Visão Geral

O site foi desenvolvido com foco em:

- **Design profissional de alta qualidade** - Digno de um portfólio de agência de branding
- **Paleta institucional harmônica** - Azul, dourado, branco e verde representando confiança, tradição e juventude
- **Experiência visual envolvente** - Efeitos 3D, microanimações e transições fluidas
- **Responsividade total** - Otimizado para mobile, tablet e desktop
- **Acessibilidade** - Contraste adequado, navegação clara e semântica HTML correta

## 📋 Seções Principais

### 1. **Hero/Abertura** (`HeroSection`)

Seção de impacto com imagem inspiradora de jovens uniformizados, título impactante "Transformando Jovens em Profissionais" e estatísticas principais (40+ anos, 5000+ formados, 100% compromisso).

### 2. **Sobre a Guarda Mirim** (`AboutSection`)

História dos 40 anos, missão, valores e impacto social. Apresenta os quatro pilares: Missão, Valores, Excelência e Comunidade.

### 3. **Nossa Importância** (`ImportanceSection`)

Demonstra a conexão entre Educação, Cidadania, Trabalho e Futuro. Inclui estatísticas de impacto (85% empregabilidade, 200+ empresas parceiras).

### 4. **Linha do Tempo** (`TimelineSection`)

Apresenta 8 momentos marcantes da história (1983-2025) com animação de scroll. Layout alternado com linha central conectando os eventos.

### 5. **Depoimentos** (`TestimonialsSection`)

6 histórias reais de jovens que se tornaram profissionais de sucesso. Cards com avaliação em estrelas, citações e informações do profissional.

### 6. **Contato** (`ContactSection`)

Formulário de contato, informações de localização, telefone e email. Três opções de participação: Jovem Aprendiz, Empresa Parceira, Voluntário.

## 🎨 Sistema de Design

### Paleta de Cores

- **Azul Institucional**: `oklch(0.45 0.15 264)` - Confiança e profissionalismo
- **Dourado**: `oklch(0.75 0.15 50)` - Tradição e excelência
- **Verde Esperança**: `oklch(0.65 0.15 160)` - Juventude e futuro
- **Branco**: `oklch(1 0 0)` - Pureza e clareza
- **Cinza Claro**: `oklch(0.97 0.002 264)` - Backgrounds suaves

### Tipografia

- **Headings**: Poppins (600, 700, 800 weight)
- **Body**: Inter (400, 500, 600 weight)
- Importado via Google Fonts

### Efeitos e Animações

- **Parallax**: Background em hero section com movimento sutil
- **Scroll Animations**: Fade in + slide up com Framer Motion
- **Hover Effects**: Scale, elevação e mudança de cor
- **Transições**: Smooth scroll behavior entre seções

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework UI
- **Tailwind CSS 4** - Styling e design system
- **Framer Motion** - Animações e efeitos
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide Icons** - Ícones vetoriais
- **Vite** - Build tool e dev server
- **TypeScript** - Type safety

## 📁 Estrutura do Projeto

```
client/
├── public/
│   ├── jovem-aprendiz-group.jpg
│   ├── jovem-aprendiz-group.jpg
│   ├── training-group.png
│   ├── salinas-city-view.jpg
│   └── salinas-aerial.jpg
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Navegação fixa
│   │   ├── Footer.tsx              # Rodapé
│   │   ├── AnimatedSection.tsx      # Wrapper de animações
│   │   ├── SmoothScroll.tsx         # Scroll suave
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── ImportanceSection.tsx
│   │       ├── TimelineSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── ContactSection.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts    # Hook para animações ao scroll
│   ├── pages/
│   │   ├── Home.tsx                # Página principal
│   │   └── NotFound.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx        # Contexto de tema
│   ├── lib/
│   ├── App.tsx                     # Componente raiz
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Estilos globais e utilities
│   └── const.ts                    # Constantes
├── index.html                      # HTML base
└── tailwind.config.ts              # Configuração Tailwind
```

## 🔧 Como Executar

### Desenvolvimento

```bash
pnpm install
pnpm dev
```

O site estará disponível em `http://localhost:3000`

### Build para Produção

```bash
pnpm build
pnpm preview
```

## ✨ Recursos Principais

### Responsividade

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Tipografia adaptativa
- Navegação mobile com menu hambúrguer

### Acessibilidade

- Contraste mínimo 4.5:1 para textos normais
- Focus states visíveis em elementos interativos
- Alt text descritivo em imagens
- Semântica HTML correta (header, nav, section, footer)
- Keyboard navigation completa

### Performance

- Lazy loading de imagens
- Otimização de CSS com Tailwind
- Code splitting automático com Vite
- Smooth scroll behavior nativo

## 📝 Customização

### Mudar Cores

Edite as variáveis CSS em `client/src/index.css` na seção `:root`

### Mudar Conteúdo

- Textos: Edite os componentes em `client/src/components/sections/`
- Imagens: Substitua os arquivos em `client/public/`
- Informações de contato: Atualize em `ContactSection.tsx`

### Adicionar Seções

1. Crie novo componente em `client/src/components/sections/SectionName.tsx`
2. Importe em `client/src/pages/Home.tsx`
3. Adicione a seção no JSX

## 🎯 Próximos Passos

- [ ] Integrar formulário de contato com backend
- [ ] Adicionar blog/notícias
- [ ] Implementar galeria de fotos
- [ ] Adicionar vídeos de depoimentos
- [ ] SEO otimizado
- [ ] Analytics

## 📞 Contato

**Guarda Mirim de Salinas**

- Telefone: (38) 9 9999-9999
- E-mail: contato@guardamirimsalinas.org.br
- Localização: Salinas, Minas Gerais, Brasil

## 📄 Licença

Todos os direitos reservados © 2025 Guarda Mirim de Salinas

## 📰 Blog & Notícias

O site inclui uma seção completa de Blog/Notícias para divulgar as últimas novidades, eventos, destaques e histórias de sucesso da instituição.

### Funcionalidades do Blog

- **Listagem de Artigos**: Página dedicada com grid responsivo de artigos
- **Filtro por Categoria**: Notícias, Destaques, Eventos, Depoimentos
- **Busca de Artigos**: Busca em tempo real por título, excerpt e autor
- **Paginação**: Navegação intuitiva entre páginas (6 artigos por página)
- **Página Individual**: Detalhe completo do artigo com sidebar
- **Artigos Relacionados**: Sugestões de leitura da mesma categoria
- **Compartilhamento Social**: Botões para compartilhar no Facebook, Twitter e copiar link
- **Dados de Exemplo**: 10 artigos pré-configurados para demonstração

### Estrutura de Dados

Os artigos são definidos em `client/src/data/blog-posts.ts` com a seguinte estrutura:

```typescript
interface BlogPost {
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
```

### Adicionar Novo Artigo

Para adicionar um novo artigo, edite `client/src/data/blog-posts.ts` e adicione um novo objeto ao array `blogPosts`:

```typescript
{
  id: "11",
  title: "Título do Artigo",
  excerpt: "Resumo breve do artigo",
  content: "Conteúdo completo em parágrafos separados por \\n\\n",
  category: "noticia",
  author: "Nome do Autor",
  date: "2025-01-20",
  image: "/image-path.jpg",
  readTime: 5,
  featured: false,
}
```

### Rotas do Blog

- `/blog` - Página principal do blog com listagem de artigos
- `/blog/:id` - Página individual do artigo
