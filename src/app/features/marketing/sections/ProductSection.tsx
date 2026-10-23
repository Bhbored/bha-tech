import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { products } from "../data/marketing";

gsap.registerPlugin(useGSAP);

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const product = products[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !product) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ paused: true });
        timeline
          .from(".product-intro > *", {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          })
          .from(
            ".product-showcase",
            { autoAlpha: 0, y: 36, duration: 0.8, ease: "power3.out" },
            "<0.2",
          )
          .from(
            ".product-mark",
            { autoAlpha: 0, scale: 0.86, rotation: -8, duration: 0.9, ease: "power3.out" },
            "<0.15",
          )
          .from(
            ".product-capability",
            { autoAlpha: 0, x: 20, duration: 0.5, stagger: 0.08, ease: "power2.out" },
            "<0.15",
          );

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              timeline.play();
              observer.disconnect();
            }
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        observer.observe(section);
        return () => observer.disconnect();
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  if (!product) return null;

  return (
    <section
      ref={sectionRef}
      id="products"
      data-nav-section="products"
      className="product-section section-space"
    >
      <div className="container-shell">
        <div className="section-index">
          <span>02 / Made by BHA</span>
          <span>Our flagship product</span>
        </div>

        <div className="product-intro">
          <div>
            <p className="section-kicker">{product.category}</p>
            <h2>
              {product.name}<span className="product-period">.</span>
            </h2>
          </div>
          <div className="product-intro-detail">
            <p>{product.description}</p>
            <a
              className="product-link"
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore {product.name}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="product-showcase">
          <div className="product-showcase-meta mono-label">
            <span>BHA / Product 01</span>
            <span>Connected by design</span>
          </div>
          <div className="product-showcase-body">
            <div className="product-visual" aria-hidden="true">
              <span className="product-visual-line product-visual-line-one" />
              <span className="product-visual-line product-visual-line-two" />
              <span className="product-visual-line product-visual-line-three" />
              <span className="product-mark">sh</span>
              <span className="product-visual-caption mono-label">One connected platform</span>
            </div>
            <div className="product-capabilities">
              <p className="mono-label">What it brings together / 01—{String(product.features.length).padStart(2, "0")}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li className="product-capability" key={feature}>
                    <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-showcase-foot mono-label">
            <span>{product.name} / {product.status}</span>
            <span>Built by BHA Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
}
