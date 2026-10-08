import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { KineticRibbon } from "../components/KineticRibbon";
import { Reveal } from "../components/Reveal";
import { PageMeta } from "@/app/shared/components/PageMeta";
import {
  founders,
  principles,
  processSteps,
  products,
  services,
} from "@/app/shared/data/marketing";

export function HomePage() {
  const product = products[0];
  return (
    <>
      <PageMeta
        title="BHA Tech | Ideas into working software"
        description="We build SaaS products, custom business systems, web and mobile applications. An independent software team, built in Lebanon."
      />
      <section id="home" data-nav-section="home" className="hero-section">
        <div className="container-shell">
          <div className="hero-topline">
            <span>Independent minds. Connected systems.</span>
            <span>Based in Lebanon / Building beyond</span>
          </div>
          <div className="hero-composition">
            <div className="hero-copy">
              <p className="section-kicker">Software, with a point of view.</p>
              <h1>
                Good ideas.
                <br />
                Great <span>software.</span>
              </h1>
              <p className="hero-description">
                We turn complex business challenges into software that just
                makes sense. Built around your people. Ready for what comes
                next.
              </p>
              <div className="hero-actions">
                <Link to="/#contact" className="button-primary">
                  Let’s build something{" "}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
                <Link to="/#products" className="text-link">
                  Meet our products
                </Link>
              </div>
            </div>
            <KineticRibbon />
          </div>
          <div className="hero-bottom">
            <span>Strategy. Engineering. A little obsession.</span>
            <Link to="/#about">
              The thinking behind the build{" "}
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <div className="capability-strip" aria-label="Our focus">
        <span>Business systems</span>
        <span aria-hidden="true">/</span>
        <span>Digital products</span>
        <span aria-hidden="true">/</span>
        <span>Connected experiences</span>
      </div>
      <section
        id="about"
        data-nav-section="about"
        className="section-space about-section"
      >
        <div className="container-shell">
          <div className="section-index">
            <span>01 / The way we think</span>
            <span>Less friction. More possibility.</span>
          </div>
          <Reveal>
            <h2 className="statement-heading">
              Your business isn’t ordinary.
              <br />
              Your software <em>shouldn’t be either.</em>
            </h2>
          </Reveal>
          <div className="about-layout">
            <Reveal>
              <p className="about-intro">
                We’re BHA Tech. A team of developers building useful things for
                ambitious businesses. We get close to the problem, connect the
                right pieces, and make the complicated feel simple.
              </p>
            </Reveal>
            <div className="principles-list">
              {principles.map((principle, index) => (
                <Reveal key={principle.title}>
                  <article>
                    <span className="mono-label">0{index + 1}</span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
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
      <section
        id="services"
        data-nav-section="services"
        className="section-space services-section"
      >
        <div className="container-shell">
          <div className="section-index">
            <span>03 / What we build</span>
            <span>From the first idea to the next release</span>
          </div>
          <div className="services-heading">
            <Reveal>
              <h2 className="display-heading">
                Big picture.
                <br />
                <em>Every detail.</em>
              </h2>
            </Reveal>
            <p>
              A single product or an entire connected operation. We bring the
              engineering to move your idea forward.
            </p>
          </div>
          <div className="services-list">
            {services.map((service, index) => (
              <Reveal key={service.id}>
                <details className="service-item" name="services">
                  <summary>
                    <span className="mono-label">0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <Plus size={24} aria-hidden="true" />
                  </summary>
                  <div className="service-description">
                    <p>{service.description}</p>
                    <Link to="/#contact" className="text-link">
                      Discuss this service{" "}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="process-section section-space">
        <div className="container-shell">
          <div className="section-index">
            <span>04 / How it comes together</span>
            <span>A shared process, from day one</span>
          </div>
          <Reveal>
            <h2 className="display-heading">
              A clear path.
              <br />
              Room to evolve.
            </h2>
          </Reveal>
          <div className="process-track">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article>
                  <span className="process-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="team-section section-space">
        <div className="container-shell team-layout">
          <Reveal>
            <p className="section-kicker">The people behind the pixels</p>
            <h2 className="display-heading">
              Builders.
              <br />
              <em>By nature.</em>
            </h2>
            <p className="team-intro">
              Work directly with the people who plan, write, and refine your
              software.
            </p>
          </Reveal>
          <div className="team-list">
            {founders.map((founder, index) => (
              <Reveal key={founder.name}>
                <article>
                  <span className="founder-monogram" aria-hidden="true">
                    {founder.name[0]}
                    <span>0{index + 1}</span>
                  </span>
                  <div>
                    <h3>{founder.name}</h3>
                    <p>{founder.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        data-nav-section="contact"
        className="contact-section section-space"
      >
        <div className="container-shell">
          <div className="section-index">
            <span>05 / Your next chapter</span>
            <span>Start with a conversation</span>
          </div>
          <div className="contact-layout">
            <Reveal>
              <h2 className="display-heading">
                What are
                <br />
                you <em>building?</em>
              </h2>
              <p className="contact-intro">
                An idea on a napkin. A system you’ve outgrown. A product ready
                for its next chapter. Tell us where you want to go.
              </p>
              <div className="contact-signature" aria-hidden="true">
                Let’s make it work.
                <ArrowUpRight />
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
