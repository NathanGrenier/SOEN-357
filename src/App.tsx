import "./App.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex gap-8 items-center mb-4">
          <img src={viteLogo} className="h-28 w-28" alt="Vite logo" />
          <img
            src={reactLogo}
            className="animate-spin h-28 w-28"
            alt="React logo"
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
            <ModeToggle />
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
