import { Instagram, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

const galleryPreview = [
  {
    src: "/images/guarda/hero-formacao.jpg",
    alt: "Jovens uniformizados em solenidade",
  },
  { src: "/images/guarda/uniforme.jpg", alt: "Guarda Mirim em formação" },
  { src: "/images/guarda/desfile.jpg", alt: "Porta-bandeiras da Guarda Mirim" },
  { src: "/images/guarda/formatura.jpg", alt: "Solenidade de formatura" },
  { src: "/salinas-city-view.jpg", alt: "Vista de Salinas" },
  { src: "/salinas-aerial.jpg", alt: "Vista aérea de Salinas" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07152d] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10">
                <img
                  src="/logo-gm.svg"
                  alt="Guarda Mirim de Salinas"
                  className="h-8 w-8"
                />
              </div>
              <div>
                <div className="text-lg font-black uppercase tracking-[0.16em]">
                  Guarda Mirim
                </div>
                <div className="text-sm text-white/68">de Salinas</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/76">
              Linha do tempo digital para preservar registros, turmas,
              processos seletivos e memórias da Guarda Mirim de Salinas.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#d7b35b]">
              Contato oficial
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+553838416512"
                className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Phone size={18} />
                <span>(38) 3841-6512</span>
              </a>
              <a
                href="mailto:guardamirim@salinas.mg.gov.br"
                className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Mail size={18} />
                <span>guardamirim@salinas.mg.gov.br</span>
              </a>
              <div className="flex items-start gap-3 text-sm leading-6 text-white/80">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>R. Ver. Corinto Pereira de Castro, 163 - Alvorada</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#d7b35b]">
              Redes
            </h3>
            <a
              href="https://www.instagram.com/guardamirimsalinas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Instagram oficial da Guarda Mirim"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <h3 className="mb-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white/68">
            Acervo visual
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {galleryPreview.map((photo, index) => (
              <img
                key={`${photo.src}-${index}`}
                src={photo.src}
                alt={photo.alt}
                className="h-24 w-full object-cover opacity-80 transition-opacity hover:opacity-100"
                loading="lazy"
              />
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/galeria"
              className="inline-block text-sm font-bold text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              Ver galeria
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-7 text-sm text-white/60 md:flex-row">
          <p>Copyright {currentYear} Guarda Mirim de Salinas.</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <LogIn size={14} />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
