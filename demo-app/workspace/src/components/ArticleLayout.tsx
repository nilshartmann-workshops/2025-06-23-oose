import { ReactNode } from "react";

type ArticleLayoutProps = {
  children?: ReactNode;
};

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <article className={"font-inter space-y-6 text-gray-600 *:leading-7"}>
      {children}
    </article>
  );
}
