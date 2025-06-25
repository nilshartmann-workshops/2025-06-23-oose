import { useState } from "react";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { foodTrucks } from "../data.ts";
import FoodTruckSelect from "./FoodTruckSelect.tsx";

// https://vitest.dev/guide/browser/

test("FoodTruckSelect", async () => {
  const onChangeMock = vi.fn();

  const screen = render(
    <FoodTruckSelect
      availableFoodTrucks={foodTrucks}
      selectedFoodTruckId={"1"}
      onSelectedFoodTruckIdChange={onChangeMock}
    />,
  );

  // Initial ausgewählter Truck
  await expect.element(screen.getByText(/Burger Beast/)).toBeInTheDocument();

  // Den hier gibts, aber der darf nicht zu sehen sein
  await expect
    .element(screen.getByText(/Curry Cruiser/))
    .not.toBeInTheDocument();

  // Auf die Select Box klicken
  await expect.element(screen.getByLabelText(/Food Truck/)).toBeInTheDocument();
  await screen.getByLabelText(/Food Truck/).click();
  // Jetzt muss auch "Curry Cruiser" sichtbar sein, weil die
  //  Select-Komponente ausgeklappt ist
  expect(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  await screen.getByText(/Curry Cruiser/).click();
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

  const screen = render(<FoodTruckSelectController />);

  screen.debug();

  // Initial ausgewählter Truck
  await expect.element(screen.getByText(/Burger Beast/)).toBeInTheDocument();

  // Den hier gibts, aber der darf nicht zu sehen sein
  await expect
    .element(screen.getByText(/Curry Cruiser/))
    .not.toBeInTheDocument();

  // Auf die Select Box klicken
  await screen.getByLabelText(/Food Truck/).click();
  // Jetzt muss auch "Curry Cruiser" sichtbar sein, weil die
  //  Select-Komponente ausgeklappt ist
  await expect.element(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  await screen.getByText(/Curry Cruiser/).click();
  await expect.element(screen.getByText(/Curry Cruiser/)).toBeInTheDocument();
  await expect
    .element(screen.getByText(/Burger Beast/))
    .not.toBeInTheDocument();

  // simuliert einen Fehler
  await screen.getByLabelText(/Food Truck/).click();
  await screen.getByText(/Pizza Palace/).click();
  await expect
    .element(screen.getByText(/Food Truck not available/))
    .toBeInTheDocument();
});
