import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className={"flex-grow"}>
      <div className={"container mx-auto"}>
        <section className={"mt-4 flex-col space-y-8"}>{children}</section>
      </div>
    </main>
  );
}
