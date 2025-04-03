import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useRouter, useLocation } from "@tanstack/react-router";
import {
  MenuIcon,
  BookOpenText,
  SparkleIcon,
  HouseIcon,
  PlusCircleIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiteLogo } from "@/components/site-logo";
import { cloneElement, useState } from "react";
import { Separator } from "@/components/ui/separator";
import FootwearIcon from "@/components/icons/FootwearIcon";

import { useAuth } from "@/hooks/use-auth";
import { User } from "@/lib/types";

type NavLinkChild = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactElement<{ className?: string }>;
};

type NavLink = {
  title: string;
  href: string;
  icon?: React.ReactElement<{ className?: string }>;
  children?: NavLinkChild[];
};

function LogoWithTitle() {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center space-x-2">
        <SiteLogo size="sm" />
        <span className="text-lg font-semibold">Sneaker Hub</span>
      </Link>
    </div>
  );
}

export function Navbar() {
  const authContext = useAuth();
  const { isAuthenticated, user, logout } = authContext;
  const router = useRouter();
  const currentPath = useLocation({
    select: (location) => location.pathname,
  });

  const NAVIGATION_MENU_ITEM_VARIANTS = {
    default: "",
    outline:
      "border rounded-md border-input shadow-xs hover:bg-accent hover:text-accent-foreground",
  };

  const navLinks: NavLink[] = [
    { title: "Home", href: "/", icon: <HouseIcon /> },
    {
      title: "Features",
      href: "/features",
      icon: <SparkleIcon />,
      children: [
        {
          title: "Test",
          href: "/test",
          description: "Test description",
        },
        {
          title: "Icon Test",
          href: "/test",
          description: "Testing the rendering of icons",
          icon: <SparkleIcon />,
        },
        { title: "Another Test", href: "/test" },
      ],
    },
    { title: "Footwear", href: "/footwear", icon: <FootwearIcon /> },
    { title: "Sell", href: "/sell", icon: <PlusCircleIcon /> },
    { title: "About", href: "/about", icon: <BookOpenText /> },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <section className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 mb-4 flex items-center justify-center border-b px-4 py-4 backdrop-blur">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoWithTitle />
          </div>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <NavigationMenuItem
                    className={`${NAVIGATION_MENU_ITEM_VARIANTS.outline} ${active ? "nav-item-active" : ""}`}
                    key={link.href}
                  >
                    {link.children ? (
                      <>
                        <NavigationMenuTrigger>
                          <div className={`flex items-center gap-2`}>
                            {link.icon &&
                              cloneElement(link.icon, {
                                className: "h-5 w-5 text-muted-foreground",
                              })}
                            {link.title}
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[600px] grid-cols-2 p-3">
                            {link.children.map((child, index) => {
                              const active = isLinkActive(child.href);

                              return (
                                <Link
                                  to={child.href}
                                  key={index}
                                  className={`hover:bg-muted/70 rounded-md p-3 transition-colors ${active ? "nav-item-active" : ""}`}
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      {child.icon &&
                                        cloneElement(child.icon, {
                                          className:
                                            "h-5 w-5 text-muted-foreground",
                                        })}
                                      <p className="mb-1 font-semibold">
                                        {child.title}
                                      </p>
                                    </div>
                                    {child.description && (
                                      <p className="text-muted-foreground text-sm">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <>
                        <Link
                          to={link.href}
                          className={navigationMenuTriggerStyle()}
                        >
                          <div className="flex items-center gap-2">
                            {link.icon &&
                              cloneElement(link.icon, {
                                className: "h-5 w-5 text-muted-foreground",
                              })}
                            {link.title}
                          </div>
                        </Link>
                      </>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {isAuthenticated ? (
              <Button variant="destructive" onClick={logout}>
                Sign out
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  void router.navigate({ to: "/login" });
                }}
              >
                Sign in
              </Button>
            )}
            <ModeToggle />

            {isAuthenticated && <UserAvatar user={user} />}
          </div>
          <MobileNavbar
            navLinks={navLinks}
            authContext={authContext}
            isLinkActive={isLinkActive}
          />
        </nav>
      </div>
    </section>
  );
}

function MobileNavbar({
  navLinks,
  authContext,
  isLinkActive,
}: {
  navLinks: NavLink[];
  authContext: ReturnType<typeof useAuth>;
  isLinkActive: (href: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user, logout } = authContext;

  const handleLinkClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-center gap-4 lg:hidden">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <ModeToggle />
        {isAuthenticated && <UserAvatar user={user} />}
      </div>
      <SheetContent side="top" className="max-h-screen">
        <SheetHeader className="dark:bg-muted/10">
          <SheetTitle>
            <LogoWithTitle />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col px-2 py-4">
          <div className="mb-2 flex flex-col space-y-2">
            {navLinks
              .filter((link) => !link.children)
              .map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={handleLinkClick}
                    className={`hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-3 font-medium transition-colors ${active ? "nav-item-active" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      {link.icon}
                      {link.title}
                    </div>
                  </Link>
                );
              })}
          </div>
          <Separator className="" />
          <Accordion
            type="single"
            collapsible
            className="mt-2 mb-2 w-full px-3"
          >
            {navLinks
              .filter(
                (link): link is NavLink & { children: NavLinkChild[] } =>
                  !!link.children
              )
              .map((link, index) => (
                <AccordionItem
                  key={index}
                  value={link.title}
                  className="border-border border-b"
                >
                  <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      {link.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-1">
                    <div className="grid gap-2 md:grid-cols-2">
                      {link.children.map((child, index) => {
                        const active = isLinkActive(child.href);

                        return (
                          <Link
                            to={child.href}
                            key={index}
                            onClick={handleLinkClick}
                            className={`hover:bg-accent hover:text-accent-foreground flex flex-col rounded-md p-3 transition-colors ${active ? "nav-item-active" : ""}`}
                          >
                            <div className="flex items-center gap-2">
                              {child.icon &&
                                cloneElement(child.icon, {
                                  className: "h-5 w-5 text-muted-foreground",
                                })}
                              <p className="font-medium">{child.title}</p>
                            </div>
                            {child.description && (
                              <p className="text-muted-foreground mt-1 text-sm">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          <div className="mt-4 space-y-3 px-2">
            {isAuthenticated ? (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
              >
                Sign out
              </Button>
            ) : (
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  void router.navigate({ to: "/login" });
                }}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function UserAvatar({ user }: { user: User | null }) {
  if (!user) return;

  return (
    <Avatar>
      <AvatarImage src={user?.avatarUrl} />
      <AvatarFallback>
        {user?.name?.substring(0, 2).toUpperCase() || "UN"}
      </AvatarFallback>
    </Avatar>
  );
}
