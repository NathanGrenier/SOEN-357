import { Link } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

interface AuthRequiredButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAuthenticated: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  asChild?: boolean;
}

export function AuthRequiredButton({
  isAuthenticated,
  variant = "default",
  onClick,
  disabled,
  children,
  asChild = false,
  ...props
}: AuthRequiredButtonProps) {
  const isDisabled = !isAuthenticated || disabled;

  const Comp = asChild ? Slot : Button;

  const button = (
    <Comp
      variant={!asChild ? variant : undefined}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </Comp>
  );

  if (isAuthenticated) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{button}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[200px] p-2 text-center text-sm shadow-md">
          <p className="font-medium">Login required</p>
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            Please
            <Link
              to="/login"
              className="flex items-center justify-center gap-0.5 hover:underline"
            >
              login
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
