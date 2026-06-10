import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#processo", label: "Processo" },
  { href: "#historia", label: "Linha do tempo" },
  { href: "#memorias", label: "Memórias" },
  { href: "#empresas", label: "Empresas" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerState =
    !isHome || isMobileMenuOpen || scrollY > 220
      ? "solid"
      : scrollY > 34
        ? "soft"
        : "hero";
  const onHero = headerState === "hero";

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (location !== "/" && href.startsWith("#")) {
      setLocation("/");
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        headerState === "solid"
          ? "border-b border-slate-200/80 bg-white/90 text-[#10264d] shadow-[0_14px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : headerState === "soft"
            ? "bg-[#07152d]/42 text-white backdrop-blur-md"
            : "bg-transparent text-white"
      }`}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-6">
          <a
            href="#inicio"
            onClick={event => {
              event.preventDefault();
              scrollToSection("#inicio");
            }}
            className="group flex min-w-0 items-center gap-3"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-all duration-500 ${
                onHero
                  ? "border-white/30 bg-white/10"
                  : "border-[#10264d]/15 bg-[#10264d]"
              }`}
            >
              <img
                src="/logo-gm.svg"
                alt="Guarda Mirim de Salinas"
                className="h-9 w-9"
              />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-sm font-black uppercase tracking-[0.18em]">
                Guarda Mirim
              </span>
              <span
                className={`block text-xs transition-colors duration-500 ${
                  onHero ? "text-white/72" : "text-slate-500"
                }`}
              >
                Salinas, Minas Gerais
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={event => {
                  event.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative text-sm font-bold transition-colors ${
                  onHero
                    ? "text-white/80 hover:text-white"
                    : "text-slate-700 hover:text-[#10264d]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="h-11 rounded-md bg-[#caa24a] px-5 font-black text-[#101828] shadow-none hover:bg-[#d7b35b]"
            >
              <Link href="/inscricao">Inscrição</Link>
            </Button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(open => !open)}
            className={`flex h-11 w-11 items-center justify-center border transition-colors lg:hidden ${
              onHero && !isMobileMenuOpen
                ? "border-white/30 text-white"
                : "border-slate-200 text-[#10264d]"
            }`}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white text-[#10264d] shadow-xl lg:hidden">
          <nav className="container grid gap-1 py-5">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={event => {
                  event.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-2 py-3 text-base font-bold"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-3 h-12 rounded-md bg-[#caa24a] font-black text-[#101828] hover:bg-[#d7b35b]"
            >
              <Link href="/inscricao" onClick={() => setIsMobileMenuOpen(false)}>
                Fazer inscrição
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
