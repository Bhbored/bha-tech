import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/app/shared/components/Logo";
import { navigation } from "../navigation";
import { useTheme } from "@/app/providers/useTheme";

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    let previous = window.scrollY;
    let travel = 0;
    let frame = 0;
    const update = () => {
      const current = Math.max(0, window.scrollY);
      const delta = current - previous;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      setScrolled(current > 24);
      if (current < 80) setCollapsed(false);
      else if (Math.abs(travel) > 14) setCollapsed(travel > 0);
      previous = current;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const content = document.querySelectorAll<HTMLElement>("main, footer");
    content.forEach((element) => {
      element.inert = open;
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && open) {
        const controls = Array.from(
          headerRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
        ).filter((element) => element.offsetParent !== null);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      content.forEach((element) => {
        element.inert = false;
      });
      window.removeEventListener("resize", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(
              (entry.target as HTMLElement).dataset.navSection ?? "home",
            );
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("[data-nav-section]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? " is-scrolled" : ""}${collapsed && !open ? " is-compact" : ""}${open ? " is-open" : ""}`}
    >
      <nav className="site-nav" aria-label="Main navigation">
        <Logo />
        <div className="desktop-navigation">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={hrefFor(item.id)}
              data-nav-link={item.id}
              aria-current={
                isHome && activeSection === item.id ? "location" : undefined
              }
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          <span className="nav-divider" aria-hidden="true" />
          <ThemeButton theme={theme} onClick={toggleTheme} />
          <Link to={hrefFor("contact")} className="nav-project-link">
            Start a project
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="mobile-navigation">
          <ThemeButton theme={theme} onClick={toggleTheme} />
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </nav>
      {open ? (
        <div id="mobile-menu" className="mobile-nav-panel">
          <div className="flex flex-col gap-1 p-5">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={hrefFor(item.id)}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center rounded-sm px-4 font-semibold ${isHome && activeSection === item.id ? "border border-primary bg-primary/10 text-primary-light" : "text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={hrefFor("contact")}
              onClick={() => setOpen(false)}
              className="mt-4 flex min-h-12 items-center justify-center border border-primary bg-primary px-5 font-bold text-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ThemeButton({
  theme,
  onClick,
  className = "",
}: {
  theme: "dark" | "light";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      aria-pressed={theme === "light"}
      className={`theme-button ${className}`}
    >
      {theme === "light" ? (
        <Moon size={17} aria-hidden="true" />
      ) : (
        <Sun size={17} aria-hidden="true" />
      )}
    </button>
  );
}
