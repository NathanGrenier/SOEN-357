import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
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
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } fixed bottom-8 right-8 bg-primary text-primary-foreground p-2 rounded-xl shadow-md hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50 cursor-pointer`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
