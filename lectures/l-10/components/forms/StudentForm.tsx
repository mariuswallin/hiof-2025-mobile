// components/forms/StudentForm.tsx

import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Switch,
  ActivityIndicator,
  ScrollView,
  type SwitchChangeEvent,
  TouchableOpacity,
} from "react-native";
import { useForm } from "@tanstack/react-form";

import { FieldInput } from "./FieldInput";
import { DatePickerField } from "./DateField";
import { FieldPicker } from "./FieldPicker";
import { StudentSchema, type Student } from "../../types";

import type { SafeParseReturnType } from "zod";
import { Theme } from "../../constants/theme";
import { cn } from "@/utils/cn";

const PROGRAMS = [
  { label: "Informatikk", value: "informatikk" },
  { label: "Informasjonssystemer", value: "informasjonssystemer" },
  { label: "Digitale medier og design", value: "digitale-medier-og-design" },
  { label: "Annet", value: "annet" },
];

const parseZodResult = (result: SafeParseReturnType<string, unknown>) => {
  if (result.success) {
    return;
  }
  return JSON.parse(result.error.toString());
};

// Props-typen for skjemakomponenten
type StudentFormProps = {
  // onSubmit returnerer en Promise<boolean> som indikerer om innsendingen var vellykket
  onSubmit: (student: Student) => Promise<boolean>;
  // Valgfri initialValues prop for å fylle ut skjemaet med eksisterende data
  initialValues?: Partial<Student>;
};

export function StudentForm({
  onSubmit,
  initialValues = {},
}: StudentFormProps) {
  // State for å håndtere innsendingsstatus
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      id: initialValues.id || "",
      name: initialValues.name || "",
      program: initialValues.program || "",
      expireAt: new Date(initialValues.expireAt ?? Date.now()).toISOString(),
      role: initialValues.role || "",
      isActive: initialValues.isActive || false,
    },
    onSubmit: async ({ value }) => {
      try {
        // Kaller onSubmit fra props og venter på resultatet
        console.log("Submitting form with values:", value);
        const success = await onSubmit(value);

        // Håndterer resultatet
        setSubmissionResult({
          success,
          message: success
            ? "Student ble registrert!"
            : "Kunne ikke registrere student. Prøv igjen senere.",
        });

        // Hvis vellykket, reset skjemaet (valgfritt)
        if (success) {
          form.reset();
          setTimeout(() => {
            setSubmissionResult(null);
          }, 3000);
        }
      } catch (error) {
        // Håndterer eventuelle feil
        setSubmissionResult({
          success: false,
          message: "En feil oppstod under registrering. Prøv igjen senere.",
        });
      }
    },
    validators: {
      onSubmit: StudentSchema,
    },
  });

  const shape = StudentSchema._def.schema.shape;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrer ny student</Text>

      {/* Viser resultat av innsending */}
      {submissionResult && (
        <View
          style={[
            styles.resultContainer,
            {
              backgroundColor: submissionResult.success ? "#e6f7e6" : "#f7e6e6",
            },
          ]}
        >
          <Text style={styles.resultText}>{submissionResult.message}</Text>
        </View>
      )}

      <FieldInput
        form={form}
        name="id"
        label="Student ID"
        placeholder="Skriv inn student ID"
        validator={(value) => parseZodResult(shape.id.safeParse(value))}
      />
      <FieldInput
        form={form}
        name="name"
        label="Navn"
        placeholder="Skriv inn navn"
        validator={(value) => parseZodResult(shape.name.safeParse(value))}
      />
      <form.Field
        name="program"
        listeners={{
          onChange: ({ value }) => {
            console.log(
              `Program changed to: ${value}, resetting other-field errors`
            );
            // Resetter feil for "other" feltet hvis programmet ikke er "annet"
            // Edge case når vi har trykket submit og annet er valgt og vi
            // endrer til noe annet
            if (value && value !== "annet") {
              form.setFieldMeta("other", {
                isTouched: false,
                isValid: true,
                errors: [],
                errorMap: {},
              });
            }
          },
        }}
        validators={{
          onChange: shape.program,
        }}
        children={(field) => (
          <FieldPicker
            label="Studieprogram"
            onFieldChange={field.handleChange}
            meta={field.state.meta}
            selectedValue={field.state.value}
            options={PROGRAMS}
          >
            {/* Viser "annet" feltet hvis programmet er "annet" */}
            {/* Form.subscribe trigger rerender når verdien vi lytter på endres */}
            <form.Subscribe
              selector={(state) => state.values.program}
              children={(program) =>
                program === "annet" ? (
                  <FieldInput
                    form={form}
                    name="other"
                    label="Annet program"
                    placeholder="Skriv inn annet program"
                  />
                ) : null
              }
            />
          </FieldPicker>
        )}
      />
      <DatePickerField form={form} name="expireAt" label="Utløpsdato" />
      <FieldInput
        form={form}
        name="role"
        label="Rolle"
        placeholder="Skriv inn rolle"
        validator={(value) => parseZodResult(shape.role.safeParse(value))}
      />
      <form.Field
        name="isActive"
        children={(field) => (
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Aktiv:</Text>
            <Switch
              value={field.state.value}
              style={styles.switch}
              onChange={(event: SwitchChangeEvent) => {
                field.handleChange(event.nativeEvent.value);
              }}
            />
          </View>
        )}
      />
      {/* Submit-knapp med lastingsindikator */}
      {/* Bruker selector fra form state */}
      {/* Som gjør at vi henter ut spesifikke verdier */}
      {/* .Subscribe gjør at vi basert på endringer i selected state, re-renderer */}
      {/* denne delen */}
      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([formIsSubmitting]) => (
          <View style={styles.submitContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => form.handleSubmit()}
              disabled={formIsSubmitting}
            >
              <Text
                className={cn(
                  "bg-blue-100 px-8 py-4 rounded-md text-center",
                  formIsSubmitting
                    ? "text-blue-500"
                    : "text-blue-800 font-semibold"
                )}
              >
                {formIsSubmitting ? (
                  <ActivityIndicator style={styles.spinner} />
                ) : null}
                Registrer student
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: "red",
  },
  switchContainer: {
    marginBottom: 20,

    flexDirection: "column",
    alignItems: "flex-start",
  },
  switch: {},
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  resultContainer: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultText: {
    textAlign: "center",
  },
  submitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  spinner: {
    marginLeft: 10,
  },
});
