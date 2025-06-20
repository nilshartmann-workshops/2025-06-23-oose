import z from "zod";

// export type TaskState = "new" | "in_progress" | "done";

// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   effort: number;
//   state: TaskState;
//   votes: number;
//   dueDate: string;
// };

const TaskStateSchema = z.enum(["new", "in_progress", "done"]);
export type TaskState = z.infer<typeof TaskStateSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  effort: z.number().min(0).max(10),
  state: TaskStateSchema,
  votes: z.number().min(0),
  dueDate: z.string().date(),
});

export type Task = z.infer<typeof TaskSchema>;

// export type Insight = {
//   id: string;
//   author: string;
//   text: string;
//   confidence?: number;
// };

export const InsightSchema = z.object({
  id: z.string(),
  author: z.string().min(1),
  text: z.string().min(1),
  confidence: z.number().min(0).max(5).optional(),
});

export type Insight = z.infer<typeof InsightSchema>;

// type Resource = {
//   id: string;
//   title: string;
//   description?: string | null;
//   url: string;
// };

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  url: z.string(),
});

export type Resource = z.infer<typeof ResourceSchema>;

// -------- DIESE FUNKTIONEN SIND NUR ZUM TESTEN DER ZOD-TYPEN
// -- wenn hier alles kompiliert, sind die Typen korrekt

function testResource(r: Resource) {
  let c: string = r.id;
  let title: string = r.id;
  let description: string | undefined | null = r.description;
  // @ts-expect-error
  let description_str: string = r.description;
  // @ts-expect-error
  let description_undefined: undefined = r.description;
  // @ts-expect-error
  let description_null: null = r.description;
  let url: string = r.url;
}

function testTaks(t: Task) {
  let id: string = t.id;
  let title: string = t.title;
  let state: "new" | "in_progress" | "done" = t.state;
  // @ts-expect-error
  let state_2: "finished" = t.state;
  let description: string = t.description;
  let dueDate: string = t.dueDate;
  let votes: number = t.votes;
  let effort: number = t.effort;
}

function testInsight(t: Insight) {
  let id: string = t.id;
  let title: string = t.text;
  let confidence: number | undefined = t.confidence;
  // @ts-expect-error
  let confidence_nr: number = t.confidence;
  // @ts-expect-error
  let confidence_undedfined: undefined = t.confidence;
}
