import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, it, test } from "vitest";

import InsightForm from "./components/InsightForm.tsx";
import { createQueryClient } from "./create-query-client.tsx";
import TaskLoader from "./TaskLoader.tsx";

const handlers = [
  http.get("http://localhost:3002/api/tasks", () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Fix Header Bug",
        description:
          "The website header is not rendering correctly on mobile devices, causing significant usability issues for users accessing the site on smaller screens. This bug seems to be related to the responsive design implementation and CSS rules. Investigating and resolving this issue will ensure the header adapts properly to all screen sizes. Additionally, testing on different browsers is required to confirm the fix works universally.",
        effort: 5,
        state: "in_progress",
        votes: 12,
        dueDate: "2024-12-01",
      },
    ]);
  }),
  http.post("http://localhost:3002/api/tasks/3/insights", async (x) => {
    const j = await x.request.json();
    console.log("BODY", j);

    return HttpResponse.json({});
  }),
];

const server = setupServer(...handlers);
// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

it("should load tasks", async () => {
  render(
    <QueryClientProvider client={createQueryClient()}>
      <TaskLoader />
    </QueryClientProvider>,
  );

  await screen.findByRole("heading");
});

test("insight form", async () => {
  render(
    <QueryClientProvider client={createQueryClient()}>
      <InsightForm taskId={"3"} />
    </QueryClientProvider>,
  );

  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/Author/i), "Klaus Dieter");
  await user.type(screen.getByLabelText(/Text/i), "Noice bug report");
  await user.type(screen.getByLabelText(/confidence/i), "2");

  await user.click(screen.getByRole("button", { name: /save/i }));

  await screen.findByText(/Alles roger!/i);

  expect(screen.getByRole("textbox", { name: /Author/i })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: /Text/i })).toHaveValue("");
  expect(screen.getByRole("spinbutton", { name: /confidence/i })).toHaveValue(
    null,
  );

  await user.type(screen.getByLabelText(/Author/i), "Trump");

  expect(screen.queryByText(/Alles roger!/i)).not.toBeInTheDocument();

  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    http.post("http://localhost:3002/api/tasks/3/insights", async (req) => {
      const body = await req.request.json();
      console.log("second res", body);
      return HttpResponse.json({ error: "Not for you!" }, { status: 400 });
    }),
  );

  await user.type(screen.getByLabelText(/Author/i), "Trump");
  await user.type(screen.getByLabelText(/Text/i), "fasdhfjaksdfadsf");
  expect(screen.getByLabelText(/confidence/i)).toHaveValue(null);
  // await user.type(screen.getByLabelText(/confidence/i), "");
  await user.clear(screen.getByLabelText(/confidence/i));
  await user.type(screen.getByLabelText(/confidence/i), "2");
  expect(screen.getByLabelText(/confidence/i)).toHaveValue(2);
  screen.logTestingPlaygroundURL();

  await waitFor(async () => {
    user.click(screen.getByRole("button", { name: /save/i }));
    screen.findByText(/Not for you/i);
  });
});
