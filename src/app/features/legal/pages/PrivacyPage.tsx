import { LegalPage } from "./LegalPage";

const sections = [
  ["Information collected", "This draft should identify the personal and technical information the website collects."],
  ["Contact-form submissions", "Inquiry details may include names, contact details, company information, and the content voluntarily submitted."],
  ["Cookies", "Document any cookies used by the published website and explain their purpose."],
  ["Analytics", "List analytics services only after they have been selected and configured."],
  ["Data retention", "Define how long inquiry and operational data is retained and why."],
  ["Third-party services", "Identify service providers that process website or inquiry data."],
  ["User rights", "Describe applicable access, correction, deletion, and objection rights after legal review."],
  ["Contact information", "Replace this section with verified privacy contact details before publication."],
] as const;

export function PrivacyPage() {
  return <LegalPage title="Privacy Policy" description="This is an editable draft for review before publication. It does not yet describe a finalized data-processing practice." sections={sections} />;
}
