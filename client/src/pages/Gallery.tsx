import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const categories = ["evento", "treinamento", "atividade", "formatura", "outro"];

const fallbackPhotos = [
  {
    id: "local-1",
    title: "Jovens aprendizes em grupo",
    description: "Registro institucional dos jovens da Guarda Mirim.",
    imageUrl: "/jovem-aprendiz-group.jpg",
    category: "atividade",
    photographer: "Guarda Mirim",
    date: "2025-01-01",
  },
  {
    id: "local-2",
    title: "Treinamento profissional",
    description: "Momento de formacao e preparacao para o mercado de trabalho.",
    imageUrl: "/training-group.png",
    category: "treinamento",
    photographer: "Guarda Mirim",
    date: "2025-01-01",
  },
  {
    id: "local-3",
    title: "Salinas em perspectiva",
    description: "A cidade que inspira e recebe o trabalho da instituicao.",
    imageUrl: "/salinas-city-view.jpg",
    category: "outro",
    photographer: "Guarda Mirim",
    date: "2025-01-01",
  },
  {
    id: "local-4",
    title: "Vista aerea de Salinas",
    description: "Panorama da comunidade atendida pela Guarda Mirim.",
    imageUrl: "/salinas-aerial.jpg",
    category: "evento",
    photographer: "Guarda Mirim",
    date: "2025-01-01",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  // Buscar fotos do banco de dados
  const { data: galleryPhotos = [], isLoading } = trpc.gallery.list.useQuery({
    category: undefined,
  });
  const displayPhotos =
    galleryPhotos.length > 0 ? galleryPhotos : fallbackPhotos;

  const filteredPhotos = useMemo(() => {
    return displayPhotos.filter((photo: any) => {
      const matchesCategory =
        !selectedCategory || photo.category === selectedCategory;
      const matchesSearch =
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, displayPhotos]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
                  Galeria de Fotos
                </h1>
                <p className="text-lg text-muted-foreground">
                  Conheça os momentos especiais da Guarda Mirim de Salinas
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container">
            <AnimatedSection>
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar fotos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedCategory(null)}
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="rounded-full"
                  >
                    Todas
                  </Button>
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="rounded-full capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground">
                  {filteredPhotos.length} foto
                  {filteredPhotos.length !== 1 ? "s" : ""} encontrada
                  {filteredPhotos.length !== 1 ? "s" : ""}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : filteredPhotos.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPhotos.map((photo: any, index: number) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                          <p className="font-semibold">{photo.title}</p>
                          <p className="text-sm text-gray-200">
                            {photo.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold text-foreground">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {photo.photographer || "Guarda Mirim"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma foto encontrada</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full rounded-lg"
              />
              <div className="mt-4 bg-card rounded-lg p-4">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {selectedPhoto.title}
                </h2>
                <p className="text-muted-foreground mb-3">
                  {selectedPhoto.description}
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Fotógrafo: {selectedPhoto.photographer || "Guarda Mirim"}
                  </span>
                  <span>
                    {selectedPhoto.date
                      ? new Date(selectedPhoto.date).toLocaleDateString("pt-BR")
                      : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
