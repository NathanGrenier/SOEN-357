import siteLogo from "/logo.png";
import { cn } from "@/lib/utils/utils";

interface SiteLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SiteLogo({ className, size = "md" }: SiteLogoProps = {}) {
  const sizeMap = {
    xs: "h-8 w-auto",
    sm: "h-10 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-20 w-auto",
  };

  return (
    <div className={cn("relative", sizeMap[size], className)}>
      <img
        src={siteLogo}
        alt="Site Logo"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
