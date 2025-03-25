import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Default to false for SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      media.addEventListener("change", listener);

      return () => {
        media.removeEventListener("change", listener);
      };
    }
  }, [query]);

  return matches;
}
