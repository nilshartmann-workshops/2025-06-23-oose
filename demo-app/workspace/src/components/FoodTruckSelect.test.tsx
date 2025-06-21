import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";

import { foodTrucks } from "../data.ts";
import FoodTruckSelect from "./FoodTruckSelect.tsx";

test("FoodTruckSelect", async () => {
  const onChangeMock = vi.fn();

  const user = userEvent.setup();

  render(
    <FoodTruckSelect
      availableFoodTrucks={foodTrucks}
      selectedFoodTruckId={"1"}
      onSelectedFoodTruckIdChange={onChangeMock}
    />,
  );

  // Initial ausgewählter Truck
  expect(screen.getByText(/Burger Beast/)).toBeInTheDocument();

  // Den hier gibts, aber der darf nicht zu sehen sein
  expect(screen.queryByText(/Curry Cruiser/)).not.toBeInTheDocument();

  // Auf die Select Box klicken
  expect(screen.getByLabelText(/Food Truck/)).toBeInTheDocument();
  await user.click(screen.getByLabelText(/Food Truck/));
  // Jetzt muss auch "Curry Cruiser" sichtbar sein, weil die
  //  Select-Komponente ausgeklappt ist
  expect(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  await user.click(screen.getByText(/Curry Cruiser/));
  expect(onChangeMock).toHaveBeenCalledWith("2");

  // Achtung! Ausgewählter Truck ändert sich hier nicht, weil
  //    FoodTruckSelect eine KONTROLLIERTE Komponente ist
});

test("FoodtruckSelect mit Controller Komponente", async () => {
  function FoodTruckSelectController() {
    const [selectedFoodtruckId, setSelectedFoodtruckId] = useState("1");

    return (
      <FoodTruckSelect
        availableFoodTrucks={foodTrucks}
        selectedFoodTruckId={selectedFoodtruckId}
        onSelectedFoodTruckIdChange={setSelectedFoodtruckId}
        errorMessage={
          selectedFoodtruckId === "3" ? "Food Truck not available" : undefined
        }
      />
    );
  }

  const user = userEvent.setup();
  render(<FoodTruckSelectController />);

  screen.debug();

  // Initial ausgewählter Truck
  expect(screen.getByText(/Burger Beast/)).toBeInTheDocument();

  // Den hier gibts, aber der darf nicht zu sehen sein
  expect(screen.queryByText(/Curry Cruiser/)).not.toBeInTheDocument();

  // Auf die Select Box klicken
  await user.click(screen.getByLabelText(/Food Truck/));
  // Jetzt muss auch "Curry Cruiser" sichtbar sein, weil die
  //  Select-Komponente ausgeklappt ist
  expect(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  await user.click(screen.getByText(/Curry Cruiser/));
  expect(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  expect(screen.queryByText(/Burger Beast/)).not.toBeInTheDocument();

  // simuliert einen Fehler
  await user.click(screen.getByLabelText(/Food Truck/));
  await user.click(screen.getByText(/Pizza Palace/));
  expect(screen.getByText(/Food Truck not available/)).toBeInTheDocument();
});
