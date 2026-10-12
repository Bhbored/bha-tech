import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  drift = 0,
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;
        const animation = gsap.from(root, {
          autoAlpha: 0,
          y: 24,
          ...(drift ? { x: drift } : {}),
          duration: 0.7,
          delay,
          ease: "power3.out",
          paused: true,
        });
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              animation.play();
              observer.disconnect();
            }
          },
          { rootMargin: "0px 0px -8% 0px" },
        );
        observer.observe(root);
        return () => observer.disconnect();
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
