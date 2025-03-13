import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import siteLogo from "/logo.png";

export function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height + 1}px`
      );
    }
  }, []);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      isActive ? "bg-accent text-accent-foreground" : "text-foreground/60"
    );

  return (
    <>
      <div
        ref={navbarRef}
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-evenly grow flex"
      >
        <div className="container flex h-14 items-center justify-evenly">
          {/* Logo on left */}
          <div className="flex-shrink-0">
            <Link to="." className="flex items-center space-x-2">
              <img src={siteLogo} className="w-10 h-10 rounded-full"></img>
              <span className="font-bold text-xl">Sneaker Hub</span>
            </Link>
          </div>

          {/* Navigation links in middle */}
          <div className="flex-grow flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    {({ isActive }) => (
                      <NavigationMenuLink className={navLinkClasses(isActive)}>
                        Home
                      </NavigationMenuLink>
                    )}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    {({ isActive }) => (
                      <NavigationMenuLink className={navLinkClasses(isActive)}>
                        About
                      </NavigationMenuLink>
                    )}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/footwear">
                    {({ isActive }) => (
                      <NavigationMenuLink className={navLinkClasses(isActive)}>
                        Footwear
                      </NavigationMenuLink>
                    )}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mode toggle on right */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <ModeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
}
