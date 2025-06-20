import { twMerge } from "tailwind-merge";

type PinButtonProps = {
  pinned?: boolean;
  onClick(): void;
};

export default function PinButton({ pinned, onClick }: PinButtonProps) {
  const arrowClassname = twMerge(
    pinned ? "fa-solid fa-heart" : "fa-regular fa-heart",
    "hover:fa-solid hover:text-red cursor-pointer",
  );

  return (
    <button onClick={() => onClick()}>
      <i className={arrowClassname}></i>
    </button>
  );
}
