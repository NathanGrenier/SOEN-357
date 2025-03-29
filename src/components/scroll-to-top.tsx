import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      } bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary fixed right-8 bottom-8 z-50 cursor-pointer rounded-xl p-2 shadow-md transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
