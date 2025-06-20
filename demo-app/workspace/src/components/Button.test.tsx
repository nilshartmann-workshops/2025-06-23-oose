import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import Button from "./Button.tsx";

it("should work on click", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>Hello</Button>);

  const b = await screen.findByRole("button", { name: /hello/i });
  expect(screen.getByText("Hello")).toBeInTheDocument();
  await user.click(b);

  expect(handleClick).toHaveBeenCalled();
});
