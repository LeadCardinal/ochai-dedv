import { useState, useEffect } from "react";

/**
 * ClientOnly - renders nothing during SSR/SSG, children after hydration.
 * Wraps any component that touches window/document at render time.
 * fallback prop accepts static HTML for crawlers to read instead of silence.
 */
const ClientOnly = ({ children, fallback = null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children;
};

export default ClientOnly;
