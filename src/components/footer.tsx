import { Link } from "@tanstack/react-router";
import { SiteLogo } from "@/components/site-logo";

export const defaultSocialLinks: SocialLink[] = [
  {
    name: "Instagram",
    icon: "https://cdn.simpleicons.org/instagram",
    to: "/",
  },
  {
    name: "X",
    icon: "https://cdn.simpleicons.org/x",
    to: "/",
  },
  {
    name: "Facebook",
    icon: "https://cdn.simpleicons.org/facebook",
    to: "/",
  },
];

export const defaultFooterLinkGroups: FooterLinkGroupProps[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/" },
      { label: "Men", to: "/" },
      { label: "Women", to: "/" },
      { label: "Kids", to: "/" },
      { label: "Collections", to: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/" },
      { label: "Order Status", to: "/" },
      { label: "Returns & Exchanges", to: "/" },
      { label: "Contact Us", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Store Locations", to: "/" },
      { label: "Terms & Conditions", to: "/" },
      { label: "Privacy Policy", to: "/" },
    ],
  },
];

export type FooterProps = {
  linkGroups?: FooterLinkGroupProps[];
  socialLinks?: SocialLink[];
};

export function Footer({
  linkGroups = defaultFooterLinkGroups,
  socialLinks = defaultSocialLinks,
}: FooterProps) {
  return (
    <footer className="mx-auto w-full max-w-6xl py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="ml-4 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-4 md:mr-4 md:border-r md:pr-6">
            <Link className="flex items-center gap-2" to={"/"}>
              <SiteLogo size="sm" />
              <span className="text-xl font-bold">Sneaker Hub</span>
            </Link>
            <p className="text-muted-foreground text-center text-sm">
              Your destination for premium sneakers and streetwear.
            </p>
            <SocialLinks links={socialLinks} />
          </div>

          {linkGroups.map((group) => (
            <FooterLinkGroup
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}
        </div>
        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          Sole Society &copy; {new Date().getFullYear()} Sneaker Hub. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export type FooterLink = {
  label: string;
  to: string;
};

export type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="space-y-2 text-sm"></ul>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className="text-muted-foreground hover:text-foreground"
              to={link.to}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type SocialLink = {
  name: string;
  icon: string;
  to: string;
};

export type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({
  links,
  className = "flex justify-center gap-4",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.name}
          className="text-muted-foreground hover:text-foreground"
          to={link.to}
        >
          <div
            style={{ height: "32px", width: "32px" }}
            className="rounded-full bg-white p-1"
          >
            <img src={link.icon} alt={link.name} />
          </div>
          <span className="sr-only">{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
