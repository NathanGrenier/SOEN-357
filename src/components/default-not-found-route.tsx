import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export function DefaultNotFoundRoute() {
  return (
    <div
      className={`default-not-found-container flex flex-grow items-center justify-center`}
    >
      <div className="flex max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="space-y-2">
          <AlertCircle className="text-muted-foreground mx-auto mb-2 size-16 stroke-red-600" />
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
