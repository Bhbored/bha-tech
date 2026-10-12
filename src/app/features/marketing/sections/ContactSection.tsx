import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { Reveal } from "@/app/shared/components/Reveal";

export function ContactSection() {
  return (
    <>
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
