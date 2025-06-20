import { twMerge } from "tailwind-merge";

type ArrowButtonProps = {
  dir: "up" | "down";
  onClick(): void;
};

export default function ArrowButton({ dir, onClick }: ArrowButtonProps) {
  const arrowClassname = twMerge(
    dir === "down" ? "fa-angles-up" : "fa-angles-down",
    "fa-solid hover:text-red cursor-pointer",
  );

  return (
    <button onClick={() => onClick()}>
      <i className={arrowClassname}></i>
    </button>
  );
}
