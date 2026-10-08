import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/app/features/marketing/components/Reveal";
import { Logo } from "@/app/shared/components/Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="footer-top">
          <Logo />
          <span className="mono-label">
            Independent minds. / Lebanon & beyond.
          </span>
        </div>
        <div className="footer-main">
          <Reveal className="footer-invitation">
            <p className="section-kicker">A good place to start.</p>
            <Link to="/#contact" className="footer-contact-link">
              <span>
                Big ideas start
                <br />
                with a <em>hello.</em>
              </span>
              <span className="footer-contact-arrow">
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
            <p>Bring the challenge. We’ll bring the engineering.</p>
          </Reveal>
          <nav className="footer-explore" aria-label="Explore BHA Tech">
            <p className="mono-label">Take a look around</p>
            <Link to="/#about">The team & the thinking</Link>
            <Link to="/#products">Our products</Link>
            <Link to="/#services">What we build</Link>
            <a
              href="https://shabakatlb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shabakat <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="footer-brand-row">
          <div className="footer-wordmark" aria-hidden="true">
            BHA TECH<span>.</span>
          </div>
          <Link
            className="footer-back-top"
            to="/#home"
            aria-label="Return to the top"
          >
            <ArrowUp size={22} aria-hidden="true" />
            <span>Back to top</span>
          </Link>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BHA Tech. Built with intent.</p>
          <nav aria-label="Footer navigation">
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of use</Link>
          </nav>
          <span>From the first idea to what’s next.</span>
        </div>
      </div>
    </footer>
  );
}
