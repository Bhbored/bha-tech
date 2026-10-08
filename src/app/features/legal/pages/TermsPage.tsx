import { LegalPage } from "./LegalPage";

const sections = [
  ["Website use", "Define acceptable use of the BHA Tech website and its publicly available materials."],
  ["Intellectual property", "Clarify ownership and permitted use of brand assets, website content, and software materials."],
  ["Product information", "Explain that product descriptions may evolve and do not create a contractual commitment."],
  ["External links", "State how links to third-party websites, including product websites, are treated."],
  ["Limitations", "Add appropriate limitations only after professional legal review."],
  ["Changes", "Describe how updated terms will be published and become effective."],
  ["Governing terms", "Insert the appropriate governing law and jurisdiction after legal advice."],
  ["Contact information", "Replace this section with verified company contact details before publication."],
] as const;

export function TermsPage() {
  return <LegalPage title="Terms of Use" description="This draft must be reviewed and adapted before publication. It is not legal advice." sections={sections} />;
}
