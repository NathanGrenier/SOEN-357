import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about")({
  component: About,
});

const FIGMA_IFRAME_URL =
  "https://embed.figma.com/board/Ui14aZqhiyaSFtsk1R4P7F/SoleSociety-SOEN-357-Project-Showcase?node-id=0-1&embed-host=share";

function About() {
  return (
    <div className="mx-auto my-20 max-w-4xl px-6">
      <section className="mb-12">
        <h1 className="border-border mb-6 border-b-2 pb-3 text-3xl font-bold">
          About This Research Project
        </h1>
        <p className="text-foreground mb-6 text-lg leading-relaxed">
          If you were visiting this website from our survey, then your feedback
          was really appreciated! Our designs were implemented with a simulated
          backend to allow end users to explore the full shopping experience,
          which let us conduct our study on cart abandonment behaviour in a
          realistic setting. Our goals were to determine whether customers would
          follow through with their purchase decisions, and to assess whether
          the product offerings / personal suggestions aligned with their
          individual preferences. For instance, whether someone with wide feet
          could find appropriately fitting shoes, or whether an athlete could
          easily identify footwear suited to their sport or performance needs.
        </p>

        <section>
          <section className="my-12">
            <h2 className="border-border mb-6 border-b-2 pb-3 text-xl font-bold">
              Figma UI/UX Design Showcase
            </h2>
            <p className="text-foreground mb-6 text-lg leading-relaxed">
              You&apos;re currently interacting with our high-fidelity mock-ups
              by visiting this website. As we followed design processes from
              this course, we invite you to check out early iterations of what
              we worked on that led to our final prototype:
            </p>
            <div className="relative mx-auto aspect-video w-full max-w-4xl">
              <iframe
                className="border-foreground-muted absolute inset-0 h-full w-full rounded-sm border shadow-2xl"
                src={FIGMA_IFRAME_URL}
                allowFullScreen
              ></iframe>
            </div>
          </section>

          <h3 className="border-border mb-6 border-b-2 pb-3 text-xl font-bold">
            Learning Outcomes
          </h3>

          <p className="text-foreground mb-8 text-lg leading-relaxed">
            This project deepened our understanding of how thoughtful UI/UX
            design directly influences user behavior and business outcomes in
            e-commerce shops. Through hands-on application of what we&apos;ve
            seen in our lectures and from our own peronsal research, we learned
            that:
          </p>

          <ul className="text-foreground mb-8 list-disc space-y-4 pl-6 text-lg leading-relaxed">
            <li>
              <strong>Small frictions create big drop-offs</strong>. Hidden
              costs and complex checkouts are not just annoyances, they&apos;re
              actually major causes of cart abandonment. We validated this
              through both industry data (attributed on this page&apos;s
              copyright section,) and user testing.
            </li>
            <li>
              <strong>Trust and transparency can drive conversions.</strong>{" "}
              Clear pricing, familiar patterns, and trust signals (like
              guarantees or fast payment options) significantly reduce drop-off
              rates during checkout. See this project&apos;s final report for
              more details.
            </li>
            <li>
              <strong>Iterative design matters</strong>. Evaluating interfaces
              isn&apos;t just a post-launch activity. It&apos;s a continuous
              process that should be embedded in every stage of a product&apos;s
              development. In our lectures there was mention of Bruce Tognazzini
              who mentions that skipping user testing only leads to wasted
              effort and subpar results.
            </li>
            <li>
              <strong>Mental models influence success</strong>. End users bring
              pre-formed expectations (i.e. mental models,) based on their past
              web experiences. As we saw during SOEN 357 lectures, interfaces
              that align with these expectations reduce cognitive load and help
              users feel more &quot;in control&quot;.
            </li>
            <li>
              <strong>UI consistency builds usability:</strong> Visual and
              interaction consistency, such as reusing layouts, following
              Gestalt design principles, and having the right typography, all
              help users with building confidence and learning interfaces
              faster.
            </li>

            <li>
              <strong>Conceptual models guide UX clarity</strong>. Designing
              with a clear conceptual model — that is, structuring the interface
              based on some real-life user task(s) — actually makes it easier
              for users to learn and complete goals.
            </li>
            <li>
              <strong>Evaluation should be multi-faceted</strong>. In our case,
              we employed a mixed-methods approach of survey questionnaires and
              A/B testing to evaluate both usability and emotional responses.
              Both methods offered unique insights into user behavior. Our
              original goal was to gather 20 - 30 responses. We&apos;re proud to
              say that we surpassed that goal! Thanks to everyone who
              participated.
            </li>
          </ul>

          <p className="text-foreground mb-8 text-lg leading-relaxed">
            User-centered (and human-centered) design mixed with real-world
            testing are the keys to creating amazing digital experiences. The
            academic frameworks from our group&apos;s research, mixed with
            practical prototyping, helped us to build a set of well-thought-out
            interfaces that were persuasive and trustworthy.
          </p>
        </section>

        <h2 className="border-border mb-6 border-b-2 pb-3 text-3xl font-bold">
          About This Website
        </h2>

        <h3 className="border-border mb-6 border-b-2 pb-3 text-xl font-bold">
          Frontend Functionality
        </h3>

        <p className="text-foreground mb-8 text-lg leading-relaxed">
          The frontend of this application was built using{" "}
          <strong>React 19</strong> and
          <strong> Tailwind CSS</strong>. We use components from the{" "}
          <code>shadcn/ui</code> system, which itself uses{" "}
          <strong>Radix UI primitives</strong> (namely dialogs, tooltips,
          sliders, and tabs) for a responsive and accessible user interface.
          Navigation is handled through <strong>@tanstack/react-router</strong>{" "}
          for type-safe client-side routing and nested layouts. Form
          interactions are managed with <strong>react-hook-form</strong> to
          reduce boilerplate code. Visualizations such as user data and cart
          abandonment trends are presented using <strong>Recharts</strong>.
          Animations and transitions are provided by{" "}
          <code>tailwindcss-animate</code>, and dark mode support is implemented
          using <code>next-themes</code>. See the copyright section for more
          details.
        </p>

        <h3 className="border-border mb-6 border-b-2 pb-3 text-xl font-bold">
          Backend Functionality
        </h3>

        <p className="text-foreground mb-8 text-lg leading-relaxed">
          This site implements backend functionality through{" "}
          <code>localStorage</code> sign-on sessions and the retrieval of JSON
          data from a mocked database. See the next section for the resources
          used to retrieve and store footwear data.
        </p>

        <h3 className="border-border mb-6 border-b-2 pb-3 text-xl font-bold">
          Copyright
        </h3>

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
              under the terms of the Baymard Institute Terms and Conditions for
              educational and non-commercial research purposes only.
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
              research, training, and consulting. Their insights inform many
              design principles of this website and are referenced under fair
              use for academic purposes.
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
              UX, which has influenced this website’s design. This material is
              referenced under educational fair use.
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
              Flaticon. It is used in compliance with the Flaticon Free License
              with attribution.
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

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              shadcn/ui - UI Components
            </h3>
            <p className="text-muted-foreground mb-4">
              This project leverages <strong>shadcn/ui</strong> and its peer
              dependencies for pre-styled, customizable React components. The
              library is open-source and used under the terms of the{" "}
              <strong>MIT License</strong>.
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

          <div className="bg-card border-border rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-foreground mb-3 text-xl font-bold">
              StockX - Sneaker Marketplace Data
            </h3>
            <p className="text-muted-foreground mb-4">
              Footwear data shown in this app is sourced from publicly available
              listings and metadata on <strong>StockX</strong>, made to simulate
              a backend inventory. It is used for academic and demonstrative
              purposes only, under fair use, with no commercial intent or brand
              misrepresentation.
            </p>

            <a
              href="https://stockx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium"
            >
              Browse StockX
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
