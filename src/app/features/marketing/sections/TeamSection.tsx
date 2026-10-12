import { Reveal } from "@/app/shared/components/Reveal";
import { founders } from "../data/marketing";

export function TeamSection() {
  return (
    <>
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
    </>
  );
}
