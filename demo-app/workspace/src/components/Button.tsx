import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "font-barlow inline-flex transform items-center justify-center rounded px-4 py-2 font-normal text-white transition-all duration-500 ease-in-out hover:cursor-pointer",
        "bg-orange_2 hover:bg-orange_2-500 mt-2 mb-2 p-2",
        disabled &&
          "bg-orange_2-200 hover:bg-orange_2-200 cursor-default hover:cursor-default",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
