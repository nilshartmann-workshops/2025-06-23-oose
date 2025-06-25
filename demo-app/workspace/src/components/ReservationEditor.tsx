import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";

import { calculatePrice, foodTrucks } from "../data.ts";
import { TimeRange } from "../types.ts";
import FoodTruckSelect from "./FoodTruckSelect.tsx";

// Pattern "Render" Property
// function DndComponent(props) {
//   // wo ist die Maus ausrechnen?
//   return <div className={"Canvas"}>
//     {props.render(x, y)}
//   </div>
// }
//
// function MeineKomponente() {
//   <DndComponent
//     render={ (x,y) => <Block /> }
//   ></DndComponent>
// }

// react hook form
//   (alternative: TanStack Form)

const ReservationFormState = z.object({
  customerName: z.string().nonempty("Sie müssen Ihren Namen angeben!"),
  foodTruckId: z.string().nonempty("Bitte wählen Sie den Foodtruck aus"),
  expectedGuests: z
    .number("Bitte geben Sie die Anzahl der Gäste als Zahl ein")
    .min(5, "Sie müssen mindestens fünf Gäste angeben"),
  specialRequests: z.string().nullish(),
  timeRange: TimeRange.refine(
    (val) => {
      return dayjs(val.start).isBefore(val.end);
    },
    {
      message: "end-date must be after before-date",
      path: ["end"],
    },
  ),
});
type IReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReserverationEditor() {
  const form = useForm({
    resolver: zodResolver(ReservationFormState),
    mode: "onChange",
    defaultValues: {
      expectedGuests: 20,
      foodTruckId: "",
    },
  });

  const handleSave = (data: IReservationFormState) => {
    console.log("DATA", data);

    // ...
  };

  const handleError = (err: any) => {
    console.log("ERROR", err);
  };

  const [expectedGuests, timeRange] = form.watch([
    "expectedGuests",
    "timeRange",
  ]);

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

      <Controller
        control={form.control}
        name={"foodTruckId"}
        render={(field) => (
          <FoodTruckSelect
            availableFoodTrucks={foodTrucks}
            errorMessage={field.fieldState.error?.message}
            selectedFoodTruckId={field.field.value}
            onSelectedFoodTruckIdChange={(newFoodTruckId) => {
              field.field.onChange(newFoodTruckId);
            }}
          />
        )}
      />

      <Stack direction="row" spacing={2} mt={4} mb={4}>
        <FormControl fullWidth margin="normal">
          <Controller
            control={form.control}
            render={({ field }) => {
              return (
                <DateTimePicker
                  slotProps={{
                    textField: {
                      error: !!form.formState.errors.timeRange?.start,
                      helperText:
                        form.formState.errors.timeRange?.start?.message,
                    },
                  }}
                  label="Start"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(v) => {
                    field.onChange(v?.toISOString());
                  }}
                />
              );
            }}
            name={"timeRange.start"}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            control={form.control}
            render={({ field }) => {
              return (
                <DateTimePicker
                  slotProps={{
                    textField: {
                      error: !!form.formState.errors.timeRange?.end,
                      helperText: form.formState.errors.timeRange?.end?.message,
                    },
                  }}
                  label="End"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(v) => {
                    field.onChange(v?.toISOString());
                  }}
                />
              );
            }}
            name={"timeRange.end"}
          />
        </FormControl>
      </Stack>

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

      <Typography color="success.main" variant="body1">
        Price (approx.) {calculatePrice(timeRange, expectedGuests)}
      </Typography>

      <ButtonGroup>
        <Button
          onClick={() => {
            form.setValue("expectedGuests", 100);
          }}
        >
          100
        </Button>
        <Button
          onClick={() => {
            form.setValue("expectedGuests", 200);
          }}
        >
          200
        </Button>
      </ButtonGroup>

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
