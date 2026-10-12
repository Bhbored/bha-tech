import { Reveal } from "@/app/shared/components/Reveal";
import { principles } from "../data/marketing";

export function AboutSection() {
  return (
    <>
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
    </>
  );
}
