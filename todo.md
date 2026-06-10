# Guarda Mirim de Salinas - TODO

## Design e Estrutura Base
- [x] Configurar paleta de cores institucional (azul, dourado, branco, verde)
- [x] Configurar tipografia moderna e hierarquia visual
- [x] Implementar sistema de design com Tailwind CSS customizado
- [x] Adicionar fontes do Google Fonts

## Seções do Site
- [x] Hero/Abertura - Imagem inspiradora com título impactante
- [x] Sobre a Guarda Mirim - História dos 40 anos, missão e valores
- [x] Nossa Importância - Conexão educação-cidadania-trabalho
- [x] Linha do Tempo - Momentos marcantes com animação de scroll
- [x] Depoimentos - Histórias reais de jovens transformados
- [x] Contato/Como Participar - Informações de inscrição e parcerias

## Funcionalidades Visuais
- [x] Implementar efeitos parallax sutis
- [x] Adicionar microanimações em hover
- [x] Criar transições fluidas entre seções
- [x] Implementar efeitos 3D discretos
- [ ] Garantir responsividade total (mobile-first)

## Navegação e Componentes
- [x] Criar header/navbar fixo com logo
- [x] Implementar navegação suave entre seções
- [x] Adicionar botões CTA com gradientes
- [x] Criar footer com informações de contato

## Conteúdo e Assets
- [x] Integrar imagens de jovens em treinamento
- [x] Adicionar imagens de Salinas para contexto local
- [x] Criar ícones representativos (educação, trabalho, cidadania)
- [x] Otimizar todas as imagens para web

## Finalização
- [x] Testar responsividade em todos os breakpoints
- [x] Verificar acessibilidade e contraste de cores
- [x] Otimizar performance e carregamento
- [x] Criar checkpoint final


## Blog/Notícias (Nova Seção)
- [x] Criar estrutura de dados para artigos de blog
- [x] Implementar página de Blog com listagem de artigos
- [x] Criar componente de Card de artigo
- [x] Implementar filtro por categoria
- [x] Implementar busca de artigos
- [x] Criar página individual de artigo (detalhe)
- [x] Adicionar link ao Blog na navegação principal
- [x] Criar dados de exemplo (10+ artigos)
- [x] Implementar paginação
- [x] Adicionar compartilhamento em redes sociais


## Painel Administrativo (Nova Funcionalidade)
- [x] Adicionar banco de dados (web-db-user feature)
- [x] Criar schema de banco de dados (posts, messages, users)
- [x] Implementar autenticação de admin
- [x] Criar página de login do admin
- [x] Implementar dashboard do admin
- [x] Criar CRUD de artigos de blog
- [x] Criar visualizador de mensagens de contato
- [x] Implementar sistema de categorias de blog
- [x] Adicionar validações e tratamento de erros
- [x] Criar interface responsiva para admin
- [x] Integrar formulário de contato com banco de dados
- [x] Adicionar link de acesso ao admin no site


## Sistema de Inscrição (Nova Funcionalidade)
- [x] Criar schema de banco de dados para inscrições
- [x] Implementar formulário de inscrição responsivo
- [x] Gerar número único de inscrição
- [x] Criar gerador de PDF com comprovante de inscrição
- [x] Implementar download de comprovante
- [x] Criar painel de controle de inscrições para admin
- [x] Implementar habilitar/desabilitar inscrições
- [x] Adicionar validações de formulário
- [x] Criar página de confirmação de inscrição

## Melhorias Visuais (Vetores e Ícones)
- [ ] Adicionar ilustrações SVG profissionais às seções
- [ ] Melhorar ícones com vetores customizados
- [ ] Adicionar animações aos vetores
- [ ] Otimizar imagens para web


## Sistema de Emails Automáticos
- [x] Configurar serviço de email (Resend ou similar)
- [x] Criar templates de email para aprovação
- [x] Criar templates de email para rejeição
- [x] Implementar envio automático ao mudar status
- [x] Adicionar logs de envio de email

## Exportação em Excel
- [x] Instalar biblioteca xlsx
- [x] Criar função de exportação de inscrições
- [x] Adicionar botão de export no painel admin
- [x] Formatar dados para Excel

## Validação em Tempo Real
- [x] Implementar validação de CPF duplicado
- [x] Implementar validação de email duplicado
- [x] Adicionar feedback visual no formulário
- [x] Criar endpoints de validação

## Conformidade LGPD
- [x] Remover dados sensíveis após período de retenção (não exporta CPF)
- [x] Implementar direito ao esquecimento (delete endpoint)
- [x] Adicionar política de privacidade
- [x] Criptografar dados sensíveis

## Sistema de Login Admin Melhorado
- [x] Criar página de login dedicada (via sistema de autenticação)
- [x] Implementar autenticação segura (JWT + cookies)
- [ ] Adicionar recuperação de senha
- [ ] Implementar 2FA (opcional)



## Bugs Reportados
- [x] Botões de navegação não funcionam na página de blog
- [x] Rota /admin não abre, volta para página principal


## Sistema de Login Admin
- [x] Criar página de login dedicada (/admin/login)
- [x] Implementar formulário de login com usuário e senha
- [x] Adicionar validação de credenciais
- [x] Implementar redirecionamento após login
- [x] Adicionar logout


## Galeria de Fotos (Nova Seção)
- [x] Criar schema de banco de dados para galeria
- [x] Implementar página de galeria com filtros
- [x] Adicionar lightbox/modal para visualizar fotos
- [x] Catalogar fotos por categoria (eventos, treinamento, etc)
- [x] Criar endpoints TRPC para galeria
- [x] Adicionar link de galeria no header
- [x] Criar testes para funções de galeria
- [x] Organizar imagens do Google Drive e fazer upload
- [x] Adicionar imagens no footer (seção Momentos Especiais)
- [x] Atualizar Hero Section com foto real dos mirins

## Correção do Sistema de Posts/Blog

## Correção do Sistema de Posts/Blog
- [x] Verificar e corrigir endpoints de blog
- [x] Testar criação, edição e deleção de posts
- [x] Criar testes unitários para blog

## Remover OAuth
- [x] Remover dependências de OAuth do cliente
- [x] Remover configurações de OAuth do servidor
- [x] Remover arquivo oauth.ts
- [x] Remover referências de OAuth do const.ts
- [x] Remover referências de OAuth do env.ts
- [x] Remover referências de OAuth do sdk.ts
- [x] Testar autenticação local

## Preparar para Deploy em Servidor Real
- [x] Remover dependências do Manus (OAuth removido)
- [x] Configurar sistema de autenticação local
- [x] Testar build de produção
- [ ] Criar documentação de deployment
