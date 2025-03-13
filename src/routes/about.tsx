import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="my-28 px-6">
      <div className="p-4 text-2xl font-bold">About This Research Project</div>
      <p className="p-4 text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
        quod.
      </p>

      <div className="mt-12 p-4 text-2xl font-bold">About This Website</div>
      <p className="p-4 text-lg">
        The creation of this app would not be possible without the following
        third-party materials:
      </p>

      <div className="p-4">
        <div className="text-xl font-semibold">
          Baymard Institute - Free UX Research
        </div>
        <p>
          Baymard Institute has an online platform with access to
          industry-specific UX insights and design examples. It is used under
          the terms of the Baymard Institute Terms and Conditions.
        </p>
        <a href="https://baymard.com/" className="text-blue-500 underline">
          Visit Baymard Institute
        </a>
      </div>

      <div className="p-4">
        <div className="text-xl font-semibold">
          NNGroup - User Experience Research
        </div>
        <p>
          Nielsen Norman Group (NNGroup) provides evidence-based UX research,
          training, and consulting. Their insights contribute to the design
          principles of this website.
        </p>
        <a href="https://www.nngroup.com/" className="text-blue-500 underline">
          Visit NNGroup
        </a>
      </div>

      <div className="p-4">
        <div className="text-xl font-semibold">
          Cognitive Fluency - CRO Insights
        </div>
        <p>
          The CROBox blog explores cognitive fluency and decision-making in UX,
          which has influenced aspects of this website’s design.
        </p>
        <a
          href="https://blog.crobox.com/article/cognitive-fluency"
          className="text-blue-500 underline"
        >
          Read about Cognitive Fluency
        </a>
      </div>

      <div className="p-4">
        <div className="text-xl font-semibold">Favicon - Flaticon</div>
        <p>
          The favicon used in this website was created by Freepik from Flaticon.
        </p>
        <a
          href="https://www.flaticon.com/free-icons/walk"
          className="text-blue-500 underline"
          title="walk icons"
        >
          Favicon by Freepik - Flaticon
        </a>
      </div>

      <div className="p-4">
        <div className="text-xl font-semibold">shadcn/ui - UI Components</div>
        <p>
          This project leverages <strong>shadcn/ui</strong> and its peer
          dependencies for pre-styled, customizable React components that adhere
          to the WAI-ARIA design pattern.
        </p>
        <a href="https://ui.shadcn.com/" className="text-blue-500 underline">
          Explore shadcn/ui
        </a>
      </div>
    </div>
  );
}
