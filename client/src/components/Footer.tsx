import { Facebook, Instagram, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

const galleryPreview = [
  { src: "/jovem-aprendiz-group.jpg", alt: "Jovens em atividade" },
  { src: "/training-group.png", alt: "Treinamento da Guarda Mirim" },
  { src: "/salinas-city-view.jpg", alt: "Vista de Salinas" },
  { src: "/salinas-aerial.jpg", alt: "Vista aerea de Salinas" },
  { src: "/jovem-aprendiz-group.jpg", alt: "Grupo de jovens aprendizes" },
  { src: "/training-group.png", alt: "Formacao profissional" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold font-bold text-secondary-foreground">
                GM
              </div>
              <div>
                <div className="text-lg font-bold">Guarda Mirim</div>
                <div className="text-sm opacity-80">de Salinas</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Ha mais de 40 anos transformando vidas e preparando jovens para o
              mundo do trabalho com educacao, cidadania e oportunidades.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contato</h3>
            <div className="space-y-3">
              <a
                href="tel:+5538999999999"
                className="flex items-center gap-3 text-sm opacity-90 transition-opacity hover:opacity-100"
              >
                <Phone size={18} />
                <span>(38) 9 9999-9999</span>
              </a>
              <a
                href="mailto:contato@guardamirimsalinas.org.br"
                className="flex items-center gap-3 text-sm opacity-90 transition-opacity hover:opacity-100"
              >
                <Mail size={18} />
                <span>contato@guardamirimsalinas.org.br</span>
              </a>
              <div className="flex items-start gap-3 text-sm opacity-90">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Salinas, Minas Gerais, Brasil</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Redes sociais</h3>
            <p className="mb-4 text-sm opacity-90">
              Acompanhe nossas atividades e fique por dentro das novidades.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-8">
          <h3 className="mb-4 text-center text-lg font-bold">
            Momentos especiais
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {galleryPreview.map((photo, index) => (
              <img
                key={`${photo.src}-${index}`}
                src={photo.src}
                alt={photo.alt}
                className="h-24 w-full rounded-lg object-cover transition-opacity hover:opacity-80"
                loading="lazy"
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/galeria"
              className="inline-block text-sm text-background underline transition-opacity hover:opacity-80"
            >
              Ver todas as fotos
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-8 text-center">
          <p className="text-sm opacity-80">
            Copyright {currentYear} Guarda Mirim de Salinas. Todos os direitos
            reservados.
          </p>
          <Link
            href="/admin"
            className="mt-3 inline-flex items-center gap-1 text-xs opacity-50 transition-opacity hover:opacity-100"
          >
            <LogIn size={12} />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
