import type { Founder } from "@/app/shared/types/marketing";

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="card-hover overflow-hidden border border-line bg-surface">
      <div className="grid aspect-4/3 place-items-center border-b border-line bg-background-soft">
        {founder.image ? <img src={founder.image} alt={founder.name} loading="lazy" className="h-full w-full object-cover" /> : <span className="text-5xl font-medium -tracking-widest text-accent" aria-hidden="true">{founder.name.slice(0, 1)}</span>}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-foreground">{founder.name}</h3>
        <p className="mt-1 text-sm font-bold text-accent">{founder.role}</p>
        <p className="mt-4 text-sm leading-6 text-muted">{founder.bio}</p>
      </div>
    </article>
  );
}
