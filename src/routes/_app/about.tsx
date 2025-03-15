import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about")({
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto my-28 px-6">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6 pb-3 border-b-2 border-border">
          About This Research Project
        </h1>
        <p className="text-lg text-foreground leading-relaxed">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
          quod.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 border-border">
          About This Website
        </h2>
        <p className="text-lg text-foreground leading-relaxed mb-8">
          The creation of this app would not be possible without the following
          third-party materials:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Resource Cards */}
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Baymard Institute - Free UX Research
            </h3>
            <p className="mb-4 text-muted-foreground">
              Baymard Institute has an online platform with access to
              industry-specific UX insights and design examples. It is used
              under the terms of the Baymard Institute Terms and Conditions.
            </p>
            <a
              href="https://baymard.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Visit Baymard Institute
              <svg
                className="w-4 h-4 ml-1"
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

          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              NNGroup - User Experience Research
            </h3>
            <p className="mb-4 text-muted-foreground">
              Nielsen Norman Group (NNGroup) provides evidence-based UX
              research, training, and consulting. Their insights contribute to
              the design principles of this website.
            </p>
            <a
              href="https://www.nngroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Visit NNGroup
              <svg
                className="w-4 h-4 ml-1"
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

          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Cognitive Fluency - CRO Insights
            </h3>
            <p className="mb-4 text-muted-foreground">
              The CROBox blog explores cognitive fluency and decision-making in
              UX, which has influenced aspects of this website&apos;s design.
            </p>
            <a
              href="https://blog.crobox.com/article/cognitive-fluency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Read about Cognitive Fluency
              <svg
                className="w-4 h-4 ml-1"
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

          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Favicon - Flaticon
            </h3>
            <p className="mb-4 text-muted-foreground">
              The favicon used in this website was created by Freepik from
              Flaticon.
            </p>
            <a
              href="https://www.flaticon.com/free-icons/walk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              title="walk icons"
            >
              Favicon by Freepik - Flaticon
              <svg
                className="w-4 h-4 ml-1"
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

          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border md:col-span-2">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              shadcn/ui - UI Components
            </h3>
            <p className="mb-4 text-muted-foreground">
              This project leverages <strong>shadcn/ui</strong> and its peer
              dependencies for pre-styled, customizable React components that
              adhere to the WAI-ARIA design pattern.
            </p>
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Explore shadcn/ui
              <svg
                className="w-4 h-4 ml-1"
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
