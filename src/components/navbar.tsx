import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      // HACK: Add 1px to the height to prevent the scrollbar from appearing
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height + 1}px`
      );
    }
  }, []);

  return (
    <>
      <div ref={navbarRef} className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
    </>
  );
}
