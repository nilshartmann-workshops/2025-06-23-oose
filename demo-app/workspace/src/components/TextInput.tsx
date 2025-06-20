import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function TextInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge("rounded border border-gray-300 p-2")}
      {...rest}
    />
  );
}
