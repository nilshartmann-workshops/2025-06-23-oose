import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { foodTrucks } from "../data.ts";
import FoodTruckSelect from "./FoodTruckSelect.tsx";

test("FoodtruckSelect soll funktionieren!!!", async () => {
  const onSelectHandlerMock = vi.fn();
  const user = userEvent.setup();

  render(
    <FoodTruckSelect
      availableFoodTrucks={foodTrucks}
      selectedFoodTruckId={"1"}
      onSelectedFoodTruckIdChange={onSelectHandlerMock}
    />,
  );

  // screen.getByText(/burger beast/i);
  expect(screen.getByText(/burger beast/i)).toBeInTheDocument();
  expect(screen.queryByText(/pizza palace/i)).not.toBeInTheDocument();

  await user.click(screen.getByLabelText(/food truck/i));
  // expect(screen.getAllByText(/burger beast/i)).toBeInTheDocument();
  expect(screen.getByText(/pizza palace/i)).toBeInTheDocument();

  await user.click(screen.getByText(/pizza palace/i));

  expect(onSelectHandlerMock).toHaveBeenCalledWith("3");
});
