import { useSuspenseQuery } from "@tanstack/react-query";

import { H4 } from "./Heading.tsx";
import InsightCard from "./InsightCard.tsx";
import InsightForm from "./InsightForm.tsx";
import { insightsQueryOptions } from "./insights-query.ts";

type InsightListProps = {
  taskId: string;
};
export default function InsightList({ taskId }: InsightListProps) {
  // todo: Insights laden!

  const result = useSuspenseQuery(insightsQueryOptions(taskId));

  const insights = result.data;

  return (
    <div className={"bg-goldgray mt-8 space-y-8 rounded-2xl border-1 p-4"}>
      <H4>Insights</H4>
      <p>todo: insights hier anzeigen!</p>
      <div className={"grid grid-cols-2 gap-x-4"}>
        {insights.map((i) => (
          <InsightCard key={i.id} insight={i} />
        ))}
      </div>
      <InsightForm taskId={taskId} />
    </div>
  );
}
