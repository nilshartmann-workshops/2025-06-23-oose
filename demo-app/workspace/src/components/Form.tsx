import { FormHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export default function Form({ className, ...rest }: FormProps) {
  return (
    <form {...rest} className={twMerge("grid-col grid space-y-4", className)} />
  );
}
