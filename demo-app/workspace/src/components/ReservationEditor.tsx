import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonGroup, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

// react hook form
//   (alternative: TanStack Form)

const ReservationFormState = z.object({
  customerName: z.string().nonempty("Sie müssen Ihren Namen angeben!"),
  expectedGuests: z
    .number("Bitte geben Sie die Anzahl der Gäste als Zahl ein")
    .min(5, "Sie müssen mindestens fünf Gäste angeben"),
  specialRequests: z.string().nullish(),
});
type IReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReserverationEditor() {
  const form = useForm({
    resolver: zodResolver(ReservationFormState),
    mode: "onChange",
  });

  const handleSave = (data: IReservationFormState) => {
    console.log("DATA", data);
  };

  const handleError = (err: any) => {
    console.log("ERROR", err);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave, handleError)}>
      <FormControl fullWidth margin="normal">
        <TextField
          label={"Customer"}
          {...form.register("customerName")}
          error={form.formState.errors.customerName !== undefined}
          helperText={
            form.formState.errors.customerName?.message ||
            "Bitte geben Sie Ihren Namen an."
          }
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Special Requests"
          {...form.register("specialRequests")}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Expected Guests"
          type={"number"}
          {...form.register("expectedGuests", { valueAsNumber: true })}
          error={!!form.formState.errors.expectedGuests}
          helperText={form.formState.errors.expectedGuests?.message}
        />
      </FormControl>

      <ButtonGroup variant="outlined" size={"large"} sx={{ marginTop: "2rem" }}>
        <Button variant={"contained"} type="submit">
          Request reservation
        </Button>
        <Button variant={"outlined"} type="button" onClick={() => form.reset()}>
          Clear
        </Button>
      </ButtonGroup>
    </form>
  );
}
