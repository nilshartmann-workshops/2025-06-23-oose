import { Box, Button, ButtonGroup, ButtonProps } from "@mui/material";
import { getRouteApi, Link } from "@tanstack/react-router";

import type { OrderBy } from "../types.ts";
import { RouterLink } from "./RouterLink.tsx";

const Route = getRouteApi("/");

export default function OrderButtonBar() {
  const currentOrderBy = Route.useSearch({
    select: (params) => params.orderBy,
  });
  // const [searchParams] = useSearchParams({ orderBy: "start" });
  // const currentOrderBy = searchParams.get("orderBy");

  const buttonProps = (
    orderBy: OrderBy,
    label: string,
  ): ButtonProps<typeof RouterLink> => {
    return {
      component: RouterLink,
      to: "/",
      search: (currentSearch) => ({ ...currentSearch, orderBy }),
      children: label,
      variant: orderBy === currentOrderBy ? "contained" : "outlined",
    };
  };

  return (
    <ButtonGroup variant="outlined">
      <Box display={"flex"} alignItems={"center"} marginX={"10px"}>
        Order by
      </Box>
      <Button component={Link} {...buttonProps("start", "Date")} />
      <Button component={Link} {...buttonProps("foodTruck", "Food Truck")} />
      <Button component={Link} {...buttonProps("customerName", "Customer")} />
      <Button component={Link} {...buttonProps("status", "Status")} />
    </ButtonGroup>
  );
}
