import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function FormLabel({ className, ...rest }: FormLabelProps) {
  return <label className={twMerge("font-sm", className)} {...rest} />;
}
