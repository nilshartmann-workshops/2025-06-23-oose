import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material"; // <-- Achtung auf "/v4" achten!
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const ReservationFormState = z.object({
  customerName: z.string().nonempty({ error: "Please enter a customer name" }),
  expectedGuests: z
    .number()
    .min(5, { error: "You have to invite at least 5 guests" }),
  specialRequests: z.string().nullish(),
});
type ReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReservationEditor() {
  const form = useForm({
    resolver: zodResolver(ReservationFormState),
    defaultValues: {},
  });

  const handleSave = (data: ReservationFormState) => {
    console.log("DATA", data);
  };

  const handleError = (err: any) => {
    console.log("ERROR", err);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave, handleError)}>
      <Typography variant={"h3"}>Reserve your food trucks</Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Customer"
          {...form.register("customerName")}
          error={!!form.formState.errors["customerName"]}
          helperText={
            form.formState.errors["customerName"]?.message ??
            "Please fill in the customer's first and lastname"
          }
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Special Requests"
          {...form.register("specialRequests")}
          error={!!form.formState.errors["specialRequests"]?.message}
          helperText={form.formState.errors["specialRequests"]?.message}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Expected Guests"
          type={"number"}
          {...form.register("expectedGuests", { valueAsNumber: true })}
          error={!!form.formState.errors["expectedGuests"]}
          helperText={form.formState.errors["expectedGuests"]?.message}
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
