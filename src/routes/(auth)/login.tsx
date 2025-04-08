import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { redirectIfAuthenticated } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
  beforeLoad: () => redirectIfAuthenticated(),
});

export default function Login() {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
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
          size="lg"
          className="text-muted-foreground hover:text-foreground gap-2 p-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
