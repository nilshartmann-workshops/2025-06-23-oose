import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children?: ReactNode;
  className?: string;
};

export default function Card({ className, children }: CardProps) {
  return (
    <section
      className={twMerge(
        "flex flex-col space-y-4 rounded-lg border border-dotted border-gray-300 bg-white p-4 text-gray-500 shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
}
