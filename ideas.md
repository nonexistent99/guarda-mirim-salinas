# Design Ideas - Guarda Mirim de Salinas

## Conceito Visual Escolhido

**Estilo**: Institucional moderno com elementos de confiança e juventude, inspirado no template Confer mas adaptado para contexto brasileiro e social.

## Paleta de Cores Institucional

### Cores Principais
- **Azul Institucional**: `#1e40af` (primary) - Confiança, profissionalismo, estabilidade
- **Azul Claro**: `#3b82f6` (accent) - Modernidade, tecnologia
- **Dourado**: `#f59e0b` (highlight) - Tradição, excelência, 40 anos de história
- **Verde Esperança**: `#10b981` (success) - Juventude, futuro, crescimento

### Cores Neutras
- **Branco**: `#ffffff` - Pureza, clareza
- **Cinza Claro**: `#f3f4f6` - Backgrounds suaves
- **Cinza Médio**: `#6b7280` - Textos secundários
- **Preto Suave**: `#1f2937` - Textos principais

## Tipografia

### Fontes
- **Headings**: "Poppins" - Moderna, forte, impactante (weights: 600, 700, 800)
- **Body**: "Inter" - Legível, profissional, versátil (weights: 400, 500, 600)

### Hierarquia
- **H1 (Hero)**: 4rem (64px) desktop / 2.5rem (40px) mobile - Bold
- **H2 (Seções)**: 3rem (48px) desktop / 2rem (32px) mobile - SemiBold
- **H3 (Subtítulos)**: 2rem (32px) desktop / 1.5rem (24px) mobile - SemiBold
- **Body**: 1.125rem (18px) desktop / 1rem (16px) mobile - Regular
- **Small**: 0.875rem (14px) - Medium

## Layout e Estrutura

### Hero Section
- **Altura**: 100vh (tela cheia)
- **Background**: Imagem de jovens uniformizados com overlay gradient (azul escuro → transparente)
- **Título**: Grande, bold, com palavra-chave destacada em dourado
- **Subtítulo**: Frase de impacto sobre formação de jovens
- **CTA**: Botão com gradiente azul-dourado, hover com scale e glow

### Seções Gerais
- **Espaçamento**: Padding vertical de 6rem (96px) desktop / 4rem (64px) mobile
- **Container**: Max-width 1280px, centralizado
- **Background**: Alternância entre branco e cinza claro para criar ritmo visual

### Navegação
- **Header**: Fixo no topo, background com blur e transparência
- **Logo**: À esquerda, altura 40px
- **Menu**: Links horizontais à direita, hover com underline animado
- **Mobile**: Menu hambúrguer com slide-in lateral

## Efeitos e Animações

### Parallax
- **Hero background**: Scroll mais lento que conteúdo (0.5x speed)
- **Elementos decorativos**: Movimento sutil em direções opostas

### Microanimações
- **Hover em cards**: Scale 1.02, shadow elevado, transição 300ms
- **Hover em botões**: Scale 1.05, glow effect, transição 200ms
- **Scroll reveal**: Fade in + translate up, stagger de 100ms entre elementos
- **Timeline items**: Aparecem sequencialmente ao scroll

### Transições
- **Entre seções**: Smooth scroll behavior
- **Imagens**: Lazy load com fade in
- **Textos**: Fade in + slide from bottom

## Elementos 3D

### Cards de Depoimentos
- **Transform**: rotateY leve no hover (5deg)
- **Perspective**: 1000px no container
- **Shadow**: Múltiplas camadas para profundidade

### Timeline
- **Linha central**: Gradiente vertical com glow
- **Marcadores**: Círculos com border dourado, scale no hover
- **Cards**: Alternados esquerda/direita, com transform 3D sutil

## Componentes Especiais

### Estatísticas (Sobre)
- **Layout**: Grid 3 colunas (1 coluna mobile)
- **Números**: Grande, bold, cor dourada, counter animation
- **Labels**: Texto pequeno, cinza médio

### Cards de Importância
- **Ícones**: Grandes (64px), cor azul, com background circular claro
- **Título**: H3, azul escuro
- **Descrição**: Body, cinza médio
- **Hover**: Elevação e mudança de cor do ícone para dourado

### Linha do Tempo
- **Layout**: Vertical com linha central
- **Anos**: Grandes, dourados, à esquerda da linha
- **Eventos**: Cards à direita, com seta conectando à linha
- **Animação**: Aparecem ao scroll, de baixo para cima

### Depoimentos
- **Layout**: Carousel ou grid 2 colunas
- **Foto**: Circular, 80px, border dourado
- **Quote**: Itálico, com aspas decorativas
- **Nome e profissão**: Bold + regular, cores contrastantes

## Responsividade

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Adaptações Mobile
- **Hero**: Altura 100vh mantida, texto menor, padding reduzido
- **Grid**: Todas as grids viram 1 coluna
- **Timeline**: Linha à esquerda, cards todos à direita
- **Espaçamentos**: Reduzidos em 33%
- **Fontes**: Reduzidas conforme hierarquia definida

## Acessibilidade

- **Contraste**: Mínimo 4.5:1 para textos normais, 3:1 para textos grandes
- **Focus states**: Outline azul visível em todos os elementos interativos
- **Alt texts**: Descritivos para todas as imagens
- **Semantic HTML**: Headers, sections, nav, footer corretos
- **Keyboard navigation**: Tab order lógico, skip links

## Referências de Qualidade

- **Inspiração visual**: Template Confer (Colorlib)
- **Nível de acabamento**: Portfolio de agência de branding
- **Autenticidade**: Evitar aparência de IA, usar imagens reais e conteúdo humanizado
