import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="group flex min-h-12 items-center gap-3 text-foreground"
      aria-label="BHA Tech home"
    >
      <span
        className="grid size-9 place-items-center border border-accent text-sm font-medium text-accent"
        aria-hidden="true"
      >
        B
      </span>
      <span>
        <span className="block text-lg font-medium leading-none tracking-[-.08em]">
          BHA
        </span>
        <span className="mt-1 block text-[9px] font-bold tracking-[.18em] text-accent">
          TECH
        </span>
      </span>
    </Link>
  );
}
