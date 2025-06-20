import { Insight } from "../types.ts";

type InsightCardProps = {
  insight: Insight;
};
export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <div
      className={
        "mb-8 rounded-2xl border border-dotted border-gray-300 bg-white ps-4 pe-4 pt-4 pb-4"
      }
    >
      <p className={"leading-8"}>{insight.text}</p>
      <div
        className={
          "mt-2 inline-flex items-center space-x-1 rounded-md border-2 border-emerald-200 bg-emerald-100 px-1 py-0.5 text-sm text-emerald-600"
        }
      >
        <i className="fa-solid fa-seedling"></i>
        <span>confidence</span>
        <span>{insight.confidence || "❓"}</span>
      </div>
    </div>
  );
}
