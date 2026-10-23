import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="brand-logo"
      aria-label="BHA Tech home"
    >
      <span className="brand-logo-mark" aria-hidden="true" />
      <span>TECH</span>
    </Link>
  );
}
