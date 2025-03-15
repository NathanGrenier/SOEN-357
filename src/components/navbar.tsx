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
import { Link, useRouter } from "@tanstack/react-router";
import { MenuIcon, BookOpenText, SparkleIcon, HouseIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiteLogo } from "@/components/site-logo";
import { cloneElement, useState } from "react";
import { Separator } from "@/components/ui/separator";
import FootwearIcon from "@/components/icons/FootwearIcon";

import { useAuth } from "@/hooks/use-auth";

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

  const NAVIGATION_MENU_ITEM_VARIANTS = {
    default: "",
    outline:
      "border rounded-md border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
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
          href: "/",
          description: "Test description",
        },
        {
          title: "Icon Test",
          href: "/",
          description: "Testing the rendering of icons",
          icon: <SparkleIcon />,
        },
        { title: "Another Test", href: "/" },
      ],
    },
    { title: "About", href: "/about", icon: <BookOpenText /> },
    { title: "Footwear", href: "/footwear", icon: <FootwearIcon /> },
  ];

  return (
    <section className="py-4 mb-4 flex items-center justify-center sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoWithTitle />
          </div>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem
                  className={NAVIGATION_MENU_ITEM_VARIANTS.outline}
                  key={link.href}
                >
                  {link.children ? (
                    <>
                      <NavigationMenuTrigger>
                        <div className="flex items-center gap-2">
                          {link.icon &&
                            cloneElement(link.icon, {
                              className: "h-5 w-5 text-muted-foreground",
                            })}
                          {link.title}
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 p-3">
                          {link.children.map((child, index) => (
                            <Link
                              to={child.href}
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
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
                                  <p className="text-sm text-muted-foreground">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
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
              ))}
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
            {isAuthenticated && (
              <Avatar>
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>
                  {user?.name?.substring(0, 2) || "UN"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <MobileNavbar navLinks={navLinks} authContext={authContext} />
        </nav>
      </div>
    </section>
  );
}

function MobileNavbar({
  navLinks,
  authContext,
}: {
  navLinks: NavLink[];
  authContext: ReturnType<typeof useAuth>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user, logout } = authContext;

  const handleLinkClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-4 justify-center lg:hidden items-center">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <ModeToggle />
        {isAuthenticated && (
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>
              {user?.name?.substring(0, 2) || "UN"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <SheetContent side="top" className="max-h-screen">
        <SheetHeader>
          <SheetTitle>
            <LogoWithTitle />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col px-2 py-4">
          <div className="flex flex-col space-y-2 mb-2">
            {navLinks
              .filter((link) => !link.children)
              .map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center rounded-md py-3 px-3 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    {link.icon}
                    {link.title}
                  </div>
                </Link>
              ))}
          </div>
          <Separator className="" />
          <Accordion
            type="single"
            collapsible
            className="mt-2 mb-2 px-3 w-full"
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
                  className="border-b border-border"
                >
                  <AccordionTrigger className="hover:no-underline py-4 font-medium text-base">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      {link.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-1">
                    <div className="grid gap-2 md:grid-cols-2">
                      {link.children.map((child, index) => (
                        <Link
                          to={child.href}
                          key={index}
                          onClick={handleLinkClick}
                          className="flex flex-col rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            {child.icon &&
                              cloneElement(child.icon, {
                                className: "h-5 w-5 text-muted-foreground",
                              })}
                            <p className="font-medium">{child.title}</p>
                          </div>
                          {child.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          <div className="mt-4 px-2 space-y-3">
            {isAuthenticated ? (
              <Button variant="destructive" className="w-full" onClick={logout}>
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
