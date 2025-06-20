import { useEffect } from "react";

const counter: Record<string, number> = {};

let lastTotal = 0;
let rendersTotal = 0;

export function logRender(name: string) {
  const currentCount = counter[name] || 0;
  const newCount = currentCount + 1;

  counter[name] = newCount;

  console.log(name, "rendered", newCount, "times");
}

export function useLogRenderDone() {
  rendersTotal++;
  const total = Object.values(counter).reduce((p, c) => p + c, 0);
  const diff = total - lastTotal;
  lastTotal = total;

  useEffect(() => {
    console.log(
      "DONE - 'Recorded' render cycles:",
      rendersTotal,
      "total renderings since last render cycle",
      diff,
    );
  });
}
