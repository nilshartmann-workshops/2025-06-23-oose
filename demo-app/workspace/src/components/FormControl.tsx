import { ReactNode } from "react";

type FormControlProps = {
  children: ReactNode;
};

export default function FormControl({ children }: FormControlProps) {
  return <div className={"flex flex-col space-y-1"}>{children}</div>;
}
