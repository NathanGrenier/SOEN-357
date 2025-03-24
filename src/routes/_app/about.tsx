import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about")({
  component: About,
});

function About() {
  return (
    <div className="mx-auto my-20 max-w-4xl px-6">
      <section className="mb-12">
        <h1 className="border-border mb-6 border-b-2 pb-3 text-3xl font-bold">
          About This Research Project
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
          quod.
        </p>
      </section>

      <section>
        <h2 className="border-border mb-6 border-b-2 pb-3 text-3xl font-bold">
          About This Website
        </h2>
        <p className="text-foreground mb-8 text-lg leading-relaxed">
          The creation of this app would not be possible without the following
          third-party materials:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Resource Cards */}
          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Baymard Institute - Free UX Research
            </h3>
            <p className="text-muted-foreground mb-4">
              Baymard Institute has an online platform with access to
              industry-specific UX insights and design examples. It is used
              under the terms of the Baymard Institute Terms and Conditions.
            </p>
            <a
              href="https://baymard.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
            >
              Visit Baymard Institute
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              NNGroup - User Experience Research
            </h3>
            <p className="text-muted-foreground mb-4">
              Nielsen Norman Group (NNGroup) provides evidence-based UX
              research, training, and consulting. Their insights contribute to
              the design principles of this website.
            </p>
            <a
              href="https://www.nngroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
            >
              Visit NNGroup
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Cognitive Fluency - CRO Insights
            </h3>
            <p className="text-muted-foreground mb-4">
              The CROBox blog explores cognitive fluency and decision-making in
              UX, which has influenced aspects of this website&apos;s design.
            </p>
            <a
              href="https://blog.crobox.com/article/cognitive-fluency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
            >
              Read about Cognitive Fluency
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              Favicon - Flaticon
            </h3>
            <p className="text-muted-foreground mb-4">
              The favicon used in this website was created by Freepik from
              Flaticon.
            </p>
            <a
              href="https://www.flaticon.com/free-icons/walk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
              title="walk icons"
            >
              Favicon by Freepik - Flaticon
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg md:col-span-2">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              shadcn/ui - UI Components
            </h3>
            <p className="text-muted-foreground mb-4">
              This project leverages <strong>shadcn/ui</strong> and its peer
              dependencies for pre-styled, customizable React components that
              adhere to the WAI-ARIA design pattern.
            </p>
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
            >
              Explore shadcn/ui
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
