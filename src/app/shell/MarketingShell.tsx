import { useCallback, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BackToTopButton } from "./components/BackToTopButton";
import { Footer } from "./components/Footer";
import { HashScrollManager } from "./components/HashScrollManager";
import { Navbar } from "./components/Navbar";
import { SiteIntro } from "./components/SiteIntro";

export function MarketingShell() {
  const siteRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();
  const [introActive, setIntroActive] = useState(
    () =>
      pathname === "/" &&
      !hash &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const finishIntro = useCallback(() => {
    const restoreFocus = document.activeElement?.closest(".site-intro");
    setIntroActive(false);
    if (restoreFocus)
      requestAnimationFrame(() =>
        siteRef.current
          ?.querySelector<HTMLElement>("main")
          ?.focus({ preventScroll: true }),
      );
  }, []);
  return (
    <div className="marketing-shell">
      <div ref={siteRef} className="site-content" inert={introActive}>
        <HashScrollManager />
        <a
          className="fixed left-4 top-3 z-100 -translate-y-20 rounded-sm bg-surface px-4 py-3 text-sm font-bold text-foreground transition focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="relative z-10" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
      {introActive && <SiteIntro siteRef={siteRef} onComplete={finishIntro} />}
    </div>
  );
}
