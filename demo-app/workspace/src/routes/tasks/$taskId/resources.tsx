import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, use } from "react";

import Card from "../../../components/Card.tsx";
import { H4 } from "../../../components/Heading.tsx";
import { resourceQueryOptions } from "../../../components/resources-query.ts";
import { Resource } from "../../../types.ts";

export const Route = createFileRoute("/tasks/$taskId/resources")({
  component: RouteComponent,
});

function RouteComponent() {
  const taskId = Route.useParams().taskId;
  const result = useQuery(resourceQueryOptions(taskId));

  const promise = result.promise;

  return (
    <Suspense fallback={"Loading Resources..."}>
      <Link from={"/tasks/$taskId/resources"} to={".."}>
        Close
      </Link>
      <ResourceList resourcesPromise={promise} />
    </Suspense>
  );
}

type ResourceListProps = {
  resourcesPromise: Promise<Resource[]>;
};
function ResourceList({ resourcesPromise }: ResourceListProps) {
  const resource = use(resourcesPromise);
  return (
    <div className={"flex flex-col space-y-4"}>
      <H4 className={"text-red"}>Resource for task</H4>

      {resource.map((r) => (
        <Card key={r.id}>
          <H4>{r.title}</H4>
          <p>{r.url}</p>
        </Card>
      ))}
    </div>
  );
}
