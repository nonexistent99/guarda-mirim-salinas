import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Share2,
  Twitter,
  User,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import {
  BlogPost as BlogPostData,
  blogPosts,
  categories,
} from "@/data/blog-posts";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function normalizeDbPost(post: any): BlogPostData {
  return {
    id: String(post.id),
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
    date: post.createdAt
      ? new Date(post.createdAt).toISOString()
      : new Date().toISOString(),
    image: post.image || "/training-group.png",
    readTime: post.readTime || 5,
    featured: post.featured === 1,
  };
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;
  const numericPostId = Number(postId);
  const dbPostQuery = trpc.blog.getById.useQuery(numericPostId, {
    enabled: Boolean(postId) && Number.isFinite(numericPostId),
  });

  const post = dbPostQuery.data
    ? normalizeDbPost(dbPostQuery.data)
    : blogPosts.find(p => p.id === postId);
  const category = post ? categories.find(c => c.id === post.category) : null;
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  const handleShare = async (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        "_blank"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado");
    } catch {
      toast.error("Nao foi possivel copiar o link");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding">
          <div className="container text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Artigo nao encontrado
            </h1>
            <p className="mb-8 text-muted-foreground">
              O artigo que voce esta procurando nao existe ou ainda nao foi
              publicado.
            </p>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link href="/blog">Voltar ao Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="sticky top-20 z-40 border-b border-border bg-background">
          <div className="container py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft size={20} />
              Voltar ao Blog
            </Link>
          </div>
        </div>

        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <div className="space-y-6">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white ${
                    category?.color === "primary"
                      ? "bg-primary"
                      : category?.color === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-accent"
                  }`}
                >
                  {category?.label}
                </span>

                <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{post.readTime} minutos de leitura</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-background">
          <div className="container max-w-4xl">
            <AnimatedSection delay={0.2}>
              <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-4">
              <AnimatedSection className="lg:col-span-3" delay={0.3}>
                <article className="prose prose-lg max-w-none">
                  <div className="space-y-6 leading-relaxed text-muted-foreground">
                    {post.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-base sm:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>

                <div className="mt-12 border-t border-border pt-8">
                  <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="mb-3 font-bold text-foreground">
                        Compartilhe este artigo
                      </h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700"
                          aria-label="Compartilhar no Facebook"
                        >
                          <Facebook size={20} />
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400 text-white transition-colors hover:bg-blue-500"
                          aria-label="Compartilhar no Twitter"
                        >
                          <Twitter size={20} />
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90"
                          aria-label="Copiar link"
                        >
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection className="lg:col-span-1" delay={0.3}>
                <aside className="sticky top-24 space-y-8">
                  <div className="rounded-lg border border-border bg-card p-6">
                    <h3 className="mb-2 font-bold text-foreground">
                      Sobre o autor
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {post.author} compartilha noticias, experiencias e
                      registros da Guarda Mirim de Salinas.
                    </p>
                  </div>

                  {relatedPosts.length > 0 && (
                    <div>
                      <h3 className="mb-4 font-bold text-foreground">
                        Artigos relacionados
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map(relatedPost => (
                          <Link
                            key={relatedPost.id}
                            href={`/blog/${relatedPost.id}`}
                            className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
                          >
                            <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(relatedPost.date).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "short",
                                }
                              )}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container">
              <AnimatedSection>
                <h2 className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl">
                  Mais da categoria{" "}
                  <span className="text-gradient-gold">{category?.label}</span>
                </h2>
              </AnimatedSection>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <AnimatedSection key={relatedPost.id} delay={0.1 * index}>
                    <BlogCard post={relatedPost} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-gradient-primary text-white">
          <div className="container">
            <AnimatedSection>
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Quer fazer parte dessa historia?
                </h2>
                <p className="text-lg text-white/90">
                  Conheca mais sobre a Guarda Mirim de Salinas e as
                  oportunidades que oferecemos para transformar vidas.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    asChild
                    className="bg-white font-semibold text-primary hover:bg-white/90"
                  >
                    <Link href="/">Conheca Nosso Programa</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Link href="/#contato">Entre em Contato</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
