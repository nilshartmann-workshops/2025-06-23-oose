export type TaskState = "new" | "in_progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  effort: number;
  state: TaskState;
  votes: number;
  dueDate: string;
};


export type Insight = {
  id: string;
  author: string;
  text: string;
  confidence?: number;
};

export type Resource = {
  id: string;
  title: string;
  description?: string;
  url: string;
}
