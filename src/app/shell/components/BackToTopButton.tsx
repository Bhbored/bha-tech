import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [footerLinkVisible, setFooterLinkVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 700);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const link = document.querySelector(".footer-back-top");
    if (!link) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterLinkVisible(entry.isIntersecting),
    );
    observer.observe(link);
    return () => observer.disconnect();
  }, []);

  if (!visible || footerLinkVisible) return null;

  return (
    <button
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-navy text-white shadow-xl transition hover:bg-primary"
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        })
      }
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
