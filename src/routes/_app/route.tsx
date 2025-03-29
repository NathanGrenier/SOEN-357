import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
