import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

type SiteIntroProps = {
  siteRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
};

export function SiteIntro({ siteRef, onComplete }: SiteIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const site = siteRef.current;
      if (!overlay || !site) return;
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const counter = { value: 0 };
      document.documentElement.dataset.intro = "playing";
      const finish = () => onComplete();
      const onPreferenceChange = () => {
        if (media.matches) finish();
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") finish();
      };
      media.addEventListener("change", onPreferenceChange);
      window.addEventListener("keydown", onKeyDown);
      const fallback = window.setTimeout(finish, 4500);

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });
      timeline
        .to(
          counter,
          {
            value: 100,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => {
              const value = Math.round(counter.value);
              if (numberRef.current)
                numberRef.current.textContent = String(value).padStart(3, "0");
              progressRef.current?.setAttribute("aria-valuenow", String(value));
            },
          },
          0,
        )
        .fromTo(
          ".intro-progress-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          ".intro-emblem",
          { rotation: -35, scale: 0.85 },
          { rotation: 0, scale: 1, duration: 1.2 },
          0,
        )
        .addLabel("enter", 1.3)
        .to(
          ".intro-center",
          { scale: 1.12, autoAlpha: 0, duration: 0.45 },
          "enter",
        )
        .to(overlay, { autoAlpha: 0, duration: 0.55 }, "enter+=0.1")
        .fromTo(
          site.querySelector(".hero-composition"),
          { scale: 1.08 },
          { scale: 1, duration: 1, clearProps: "transform" },
          "enter",
        )
        .fromTo(
          site.querySelectorAll(".hero-copy > *"),
          { y: 38, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          "enter+=0.12",
        )
        .fromTo(
          site.querySelector(".ribbon-stage"),
          { rotation: -12, scale: 0.82, autoAlpha: 0 },
          {
            rotation: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            clearProps: "transform,opacity,visibility",
          },
          "enter",
        )
        .fromTo(
          site.querySelector(".site-header"),
          { y: -25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            clearProps: "transform,opacity,visibility",
          },
          "enter+=0.2",
        );

      return () => {
        window.clearTimeout(fallback);
        delete document.documentElement.dataset.intro;
        media.removeEventListener("change", onPreferenceChange);
        window.removeEventListener("keydown", onKeyDown);
      };
    },
    { scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      className="site-intro"
      aria-label="Website introduction"
    >
      <div className="intro-top">
        <span>BHA TECH</span>
        <span>Ideas into working software.</span>
      </div>
      <div className="intro-center">
        <svg
          className="intro-emblem"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 9 }, (_, index) => (
            <ellipse
              key={index}
              cx="80"
              cy="80"
              rx="66"
              ry={18 + index * 5}
              transform={`rotate(${index * 20} 80 80)`}
            />
          ))}
        </svg>
        <p>Opening the studio</p>
        <div
          ref={progressRef}
          className="intro-percentage"
          role="progressbar"
          aria-label="Introduction progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        >
          <span ref={numberRef}>000</span>
          <span className="intro-percent-sign">%</span>
        </div>
      </div>
      <div className="intro-bottom">
        <span>Independent minds. Connected systems.</span>
        <button type="button" onClick={onComplete}>
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="intro-progress-track" aria-hidden="true">
        <div className="intro-progress-fill" />
      </div>
    </div>
  );
}
