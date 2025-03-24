import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import siteLogo from "/logo.png";

export const Route = createFileRoute("/_app/")({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-[calc(100vh-5.6rem)] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="mb-4 flex items-center gap-8">
          <img
            src={siteLogo}
            className="h-28 w-28"
            alt="Platform logo designed by Freepik"
          />
        </div>
        <h1 className="font-bold">Vite + React!</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const currentTime = new Date().toLocaleTimeString();
                toast.success("Event has been created!", {
                  description: `Created at: ${currentTime}`,
                });
              }}
            >
              Toast!
            </Button>
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  );
}
