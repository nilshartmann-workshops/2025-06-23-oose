import { Link, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";

export const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
);
RouterLink.displayName = "RouterLink";
