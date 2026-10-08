import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const target = document.getElementById(location.hash.slice(1));
    window.requestAnimationFrame(() =>
      target?.scrollIntoView({ block: "start" }),
    );
  }, [location.hash, location.pathname, location.key]);

  return null;
}
