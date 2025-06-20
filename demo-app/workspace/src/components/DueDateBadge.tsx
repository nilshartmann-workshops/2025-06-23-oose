type DueDateBadge = {
  dueDate: string;
};

export default function DueDateBadge({ dueDate }: DueDateBadge) {
  return (
    <div
      className={
        "flex inline-flex items-center space-x-2 rounded-md border-2 border-purple-200 bg-purple-100 p-2 text-purple-600"
      }
    >
      <i className="fa-regular fa-calendar"></i>
      <span>{dueDate}</span>
    </div>
  );
}
