import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, align = "left", children }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
      <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-.06em] text-foreground sm:text-4xl lg:text-6xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
      {children}
    </div>
  );
}
