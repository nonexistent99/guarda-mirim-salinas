import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#inicio", label: "Inicio", type: "anchor" as const },
  { href: "#sobre", label: "Sobre", type: "anchor" as const },
  { href: "#importancia", label: "Importancia", type: "anchor" as const },
  { href: "#historia", label: "Historia", type: "anchor" as const },
  { href: "#depoimentos", label: "Depoimentos", type: "anchor" as const },
  { href: "/blog", label: "Blog", type: "route" as const },
  { href: "/galeria", label: "Galeria", type: "route" as const },
  { href: "/inscricao", label: "Inscricao", type: "route" as const },
  { href: "#contato", label: "Contato", type: "anchor" as const },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (location !== "/" && href.startsWith("#")) {
      setLocation("/");
      window.setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return;
    }

    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <a
            href="#inicio"
            onClick={e => {
              e.preventDefault();
              scrollToSection("#inicio");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
              GM
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Guarda Mirim
              </div>
              <div className="text-xs text-muted-foreground">de Salinas</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location === link.href;
              return link.type === "route" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300" />
                </a>
              );
            })}
            <Button
              onClick={() => scrollToSection("#contato")}
              className="bg-gradient-gold hover:opacity-90 text-secondary-foreground font-semibold shadow-lg hover-scale"
            >
              Participe
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <nav className="container py-6 flex flex-col gap-4">
            {navLinks.map(link => {
              const isActive = location === link.href;
              return link.type === "route" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              );
            })}
            <Button
              onClick={() => scrollToSection("#contato")}
              className="bg-gradient-gold hover:opacity-90 text-secondary-foreground font-semibold w-full"
            >
              Participe
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
