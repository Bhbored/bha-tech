import { PageMeta } from "@/app/shared/components/PageMeta";

type LegalSection = readonly [string, string];

type LegalPageProps = {
  title: string;
  description: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <>
      <PageMeta title={`${title} | BHA Tech`} description={description} />
      <header data-scene="legal" className="legal-header">
        <div className="container-shell">
          <p className="section-kicker">Legal draft</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>
      <article className="container-shell legal-copy">
        <p className="legal-notice">Draft status: legal review is required before relying on or publishing this document.</p>
        {sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
      </article>
    </>
  );
}
