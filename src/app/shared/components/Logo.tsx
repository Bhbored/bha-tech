import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="brand-logo"
      aria-label="BHA Tech home"
    >
      <img
        src="/bha-mark-transparent.png"
        alt=""
        width="1991"
        height="789"
      />
      <span>TECH</span>
    </Link>
  );
}
