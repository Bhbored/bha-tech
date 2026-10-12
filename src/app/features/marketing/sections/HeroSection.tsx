import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { KineticRibbon } from "../components/KineticRibbon";

export function HeroSection() {
  return (
    <>
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
    </>
  );
}
