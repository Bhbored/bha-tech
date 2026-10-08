import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/app/shared/types/marketing";

type ProductCardProps = { product: Product; featured?: boolean };

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const available = product.status === "available";
  return (
    <article className={`card-hover border border-line bg-surface p-6 ${featured ? "lg:p-10" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="border border-line px-3 py-1 text-xs font-bold text-accent">{product.category}</span>
        <span className={`text-xs font-bold ${available ? "text-success" : "text-accent"}`}>{available ? "Available" : "In development"}</span>
      </div>
      <h3 className={`${featured ? "mt-7 text-4xl" : "mt-6 text-xl"} font-medium text-foreground`}>{product.name}</h3>
      <p className="mt-4 leading-7 text-muted">{product.description}</p>
      <ul className={`mt-6 grid gap-3 ${featured ? "sm:grid-cols-2" : ""}`}>
        {product.features.map((feature) => <li key={feature} className="flex gap-2 text-sm font-medium text-foreground"><Check className="mt-0.5 shrink-0 text-accent" size={16} aria-hidden="true" />{feature}</li>)}
      </ul>
      <div className="mt-7 flex flex-wrap gap-3">
        {product.websiteUrl ? <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-primary bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary-dark">Visit {product.name}<ArrowUpRight className="ml-2" size={16} aria-hidden="true" /></a> : null}
        <Link to="/#products" className="inline-flex min-h-11 items-center border border-line px-4 text-sm font-bold text-foreground transition hover:border-accent hover:text-accent">Details</Link>
      </div>
    </article>
  );
}
