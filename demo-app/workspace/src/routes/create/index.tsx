import { createFileRoute } from "@tanstack/react-router";

import ReservationEditor from "../../components/ReservationEditor.tsx";

export const Route = createFileRoute("/create/")({
  component: ReservationEditor,
});
