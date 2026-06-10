import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogPost, blogPosts, categories } from "@/data/blog-posts";
import { trpc } from "@/lib/trpc";

const POSTS_PER_PAGE = 6;

function normalizeDbPost(post: any): BlogPost {
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

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: dbPosts = [] } = trpc.blog.list.useQuery({
    limit: 100,
    offset: 0,
  });

  const allPosts = useMemo(() => {
    const publishedPosts = dbPosts.map(normalizeDbPost);
    return publishedPosts.length > 0 ? publishedPosts : blogPosts;
  }, [dbPosts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured posts
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  Blog & Notícias
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Fique por Dentro das{" "}
                  <span className="text-gradient-gold">Novidades</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Acompanhe as últimas notícias, eventos, destaques e histórias
                  de sucesso da Guarda Mirim de Salinas.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
                  Destaques
                </h2>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post, index) => (
                  <AnimatedSection key={post.id} delay={0.1 * index}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Buscar artigos, autores..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-12 py-6 text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setCurrentPage(1);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === null
                        ? "bg-primary text-white"
                        : "bg-card border border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedCategory === category.id
                          ? `${
                              category.color === "primary"
                                ? "bg-primary text-white"
                                : category.color === "secondary"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-accent text-white"
                            }`
                          : "bg-card border border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} artigo
                  {filteredPosts.length !== 1 ? "s" : ""} encontrado
                  {filteredPosts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-background">
          <div className="container">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedPosts.map((post, index) => (
                    <AnimatedSection key={post.id} delay={0.05 * index}>
                      <BlogCard post={post} />
                    </AnimatedSection>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "border border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Próximo
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhum artigo encontrado
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setCurrentPage(1);
                  }}
                  variant="outline"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
