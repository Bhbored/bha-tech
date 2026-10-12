import { Reveal } from "@/app/shared/components/Reveal";
import { processSteps } from "../data/marketing";

export function ProcessSection() {
  return (
    <>
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
    </>
  );
}
