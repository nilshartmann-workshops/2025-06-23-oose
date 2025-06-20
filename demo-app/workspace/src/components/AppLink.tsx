import { createLink, LinkComponent } from "@tanstack/react-router";
import { RefObject } from "react";

type AppLinkProps = {
  ref: RefObject<any>;
};
function AppLinkInternal(props: AppLinkProps) {
  return <a {...props} />;
}

const AppLinkComponent = createLink(AppLinkInternal);
export const AppLink: LinkComponent<typeof AppLinkInternal> = (props) => {
  return (
    <AppLinkComponent
      className={"hover:text-red hover:underline"}
      activeProps={{
        className: "text-red underline",
      }}
      {...props}
    />
  );
};
