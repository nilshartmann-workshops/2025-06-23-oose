import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";

import { taskApiKy } from "../task-api-ky.ts";
import { InsightSchema } from "../types.ts";
import Button from "./Button.tsx";
import Form from "./Form.tsx";
import FormControl from "./FormControl.tsx";
import FormFieldError from "./FormFieldError.tsx";
import FormLabel from "./FormLabel.tsx";
import TextInput from "./TextInput.tsx";

const NewInsightSchema = InsightSchema.omit({ id: true });

type NewInsight = z.infer<typeof NewInsightSchema>;

type InsightFormProps = {
  taskId: string;
};
export default function InsightForm({ taskId }: InsightFormProps) {
  const queryClient = useQueryClient();
  const addInsightMutation = useMutation({
    async mutationFn(newInsight: NewInsight) {
      try {
        return await taskApiKy.post(`api/tasks/${taskId}/insights`, {
          json: newInsight,
        });
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 400) {
          const errorResponse = (await error.response.json()) as any;
          if (errorResponse.error) {
            throw new Error(errorResponse.error);
          }
        }
        throw error;
      }
    },
    onSuccess() {
      return queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "insights"],
      });
    },
    // Nach abgeschlossener Mutation:
    //   -> Erfolg: Meldung anzeigen + Form leeren
    //   -> Fehler: Fehlermeldung anzeigen
    // Beide Anzeigen sollen nach der ersten Änderung wieder
    //  verschwinden
    //  -> Wir können das hier machen
    //     oder mit mutateAsync
    //  -> wann machen wir was?

    // onSettled(data, error) {
    //   if (data) {
    //     // Erfolgsfall
    //     form.reset();
    //   }
    //   const subscription = form.watch(() => {
    //     // In beiden Fällen nach erster Änderung Form zurücksetzen
    //     addInsightMutation.reset();
    //     subscription.unsubscribe();
    //   });
    // },
  });

  const form = useForm<NewInsight>({
    resolver: zodResolver(NewInsightSchema),
    mode: "onBlur",
  });

  const errorCount = Object.keys(form.formState.errors).length;

  async function onSubmit(data: NewInsight) {
    try {
      await addInsightMutation.mutateAsync(data);
      form.reset();
    } finally {
      const subscription = form.watch(() => {
        // In beiden Fällen nach erster Änderung Form zurücksetzen
        addInsightMutation.reset();
        subscription.unsubscribe();
      });
    }
  }

  function onInvalidSubmit(err: FieldErrors) {
    console.log("err submit", err);
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}>
      <div>ErrorCount {errorCount}</div>
      <FormControl>
        <FormLabel htmlFor={"author"}>Author</FormLabel>
        <TextInput id="author" type={"author"} {...form.register("author")} />
        <FormFieldError>{form.formState.errors.author?.message}</FormFieldError>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor={"text"}>Text</FormLabel>
        <TextInput id="text" type={"text"} {...form.register("text")} />
        <FormFieldError>{form.formState.errors.text?.message} </FormFieldError>
      </FormControl>
      <FormControl>
        <FormLabel id={"confidence"}>Confidence</FormLabel>
        <TextInput
          aria-labelledby={"confidence"}
          type={"number"}
          {...form.register("confidence", { valueAsNumber: true })}
        />
        <FormFieldError>
          {form.formState.errors.confidence?.message}
        </FormFieldError>
      </FormControl>

      <Button type={"submit"}>Save</Button>
      {addInsightMutation.isError && (
        <FormFieldError>{String(addInsightMutation.error)}</FormFieldError>
      )}
      {addInsightMutation.isSuccess && <p>Alles roger!</p>}
    </Form>
  );
}
