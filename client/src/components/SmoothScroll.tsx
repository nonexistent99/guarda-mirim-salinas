import { useEffect } from "react";

function findHashTarget(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return null;

  return document.getElementById(decodeURIComponent(id));
}

export default function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const element = findHashTarget(href);
      if (!element) return;

      e.preventDefault();
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return null;
}
