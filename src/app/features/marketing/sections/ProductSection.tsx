import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/shared/components/Reveal";
import { products } from "../data/marketing";

export function ProductSection() {
  const product = products[0];
  return (
    <>
      <section
        id="products"
        data-nav-section="products"
        className="product-section section-space"
      >
        <div className="container-shell">
          <div className="section-index">
            <span>02 / Made by BHA</span>
            <span>Our flagship product</span>
          </div>
          {product && (
            <div className="product-layout">
              <Reveal className="product-copy">
                <p className="section-kicker">
                  One business. One connected platform.
                </p>
                <h2>
                  {product.name}
                  <span className="product-period">.</span>
                </h2>
                <p>{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className="button-primary"
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discover Shabakat{" "}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal className="product-art">
                <div
                  className="system-diagram"
                  role="img"
                  aria-label="Shabakat connects your people, operations, reporting, and modules in one platform"
                >
                  <div className="system-ring ring-outer" />
                  <div className="system-ring ring-inner" />
                  <svg viewBox="0 0 480 440" aria-hidden="true">
                    <path d="M240 220 L95 110 M240 220 L385 115 M240 220 L100 340 M240 220 L375 335" />
                  </svg>
                  <div className="system-core">
                    <span>sh</span>
                    <small>Shabakat</small>
                  </div>
                  <span className="system-node node-people">People</span>
                  <span className="system-node node-operations">
                    Operations
                  </span>
                  <span className="system-node node-reporting">Reporting</span>
                  <span className="system-node node-modules">Modules</span>
                  <span className="diagram-caption mono-label">
                    Separate workflows. Shared understanding.
                  </span>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
