import {
  createFileRoute,
  useMatch,
  useRouteContext,
} from "@tanstack/react-router";

import { PageTitle } from "../../components/Heading.tsx";
import InsightForm from "../../components/InsightForm.tsx";

export const Route = createFileRoute("/_static/about")({
  component: RouteComponent,
  beforeLoad() {
    console.log("Before Load....");
    return {
      showDashboard: true,
      onAbout: true,
    };
  },
});

function RouteComponent() {
  const m = useMatch({ strict: false });
  console.log("ABOUT MATCH CTX", m.context, m.id);
  const ctx = useRouteContext({ strict: false });
  console.log("ABOUT CTX", ctx);

  return (
    <article className={"font-inter space-y-6 text-gray-600 *:leading-7"}>
      <PageTitle>About TaskFlow</PageTitle>
      <InsightForm taskId={"2"} />
      <p>
        Welcome to TaskFlow, the ultimate tool designed to streamline task
        management and enhance team collaboration. TaskFlow helps individuals
        and teams organize their tasks, track progress, and share actionable
        insights seamlessly. Whether you're managing a small project or
        overseeing a complex workflow, TaskFlow's intuitive interface and robust
        features are built to adapt to your needs.
      </p>

      <p>
        At TaskFlow, we believe that productivity starts with clarity. That's
        why our platform emphasizes simplicity, transparency, and real-time
        updates. From creating tasks to sharing insights, every interaction is
        designed to keep you focused on what truly matters—achieving your goals.
        With features like task prioritization, comments, and real-time voting,
        TaskFlow fosters a collaborative environment where everyone’s input
        counts.
      </p>

      <p>
        Our mission is to empower individuals and teams to work smarter, not
        harder. TaskFlow is more than just a task manager; it's a productivity
        companion that evolves with your workflow. Whether you're brainstorming
        ideas, tracking deadlines, or analyzing task performance, TaskFlow is
        here to help you every step of the way. Join us and experience the
        difference a streamlined task management system can make.
      </p>
    </article>
  );
}
