import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export function DefaultNotFoundRoute() {
  return (
    <div
      className={`flex-grow flex items-center justify-center default-not-found-container`}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md px-4">
        <div className="space-y-2">
          <AlertCircle className="size-16 text-muted-foreground mx-auto mb-2 stroke-red-600" />
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
        </div>

        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>

        <Link to="/">
          <Button className="mt-2 gap-2">
            <Home className="size-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
