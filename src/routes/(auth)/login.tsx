import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { redirectIfNotAuthenticated } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
  beforeLoad: () => redirectIfNotAuthenticated(),
});

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative">
      <BackButtonTopLeft />
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="outline" className="w-full">
              Continue as Guest
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BackButtonTopLeft() {
  return (
    <div className="absolute top-6 left-6">
      <Link to="/">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground p-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
