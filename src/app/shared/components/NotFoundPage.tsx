import { Link } from "react-router-dom";
import { PageMeta } from "./PageMeta";

export function NotFoundPage() {
  return (
    <section className="not-found page-space">
      <PageMeta
        title="Page not found | BHA Tech"
        description="The requested BHA Tech page could not be found."
      />
      <div className="container-shell">
        <p className="section-kicker">Page not found</p>
        <h1>That page is not part of this public site.</h1>
        <p>
          Use the homepage to view BHA Tech products, services, and contact
          details.
        </p>
        <Link className="button button-primary" to="/">
          Return to BHA Tech
        </Link>
      </div>
    </section>
  );
}
