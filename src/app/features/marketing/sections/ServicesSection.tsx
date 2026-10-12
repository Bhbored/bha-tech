import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/app/shared/components/Reveal";
import { services } from "../data/marketing";

export function ServicesSection() {
  return (
    <>
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
    </>
  );
}
