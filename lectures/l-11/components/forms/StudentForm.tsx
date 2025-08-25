// components/forms/StudentForm.tsx

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ActivityIndicator,
  ScrollView,
  type SwitchChangeEvent,
  TouchableOpacity,
} from "react-native";
import { useForm } from "@tanstack/react-form";
import * as FileSystem from "expo-file-system";

import { FieldInput } from "./FieldInput";
import { DatePickerField } from "./DateField";
import { FieldPicker } from "./FieldPicker";
import { StudentSchema, type Student } from "../../types";

import type { SafeParseReturnType } from "zod";
import { cn } from "@/utils/cn";
import { PictureField } from "./PictureField";
import PictureView from "../shared/PictureView";
import { Ionicons } from "@expo/vector-icons";

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

type StudentFormProps = {
  onSubmit: (student: Student) => Promise<boolean>;
  initialValues?: Partial<Student>;
};

// const uploadImageToStorage = async (uri) => {
//   // This is an example using Firebase Storage
//   // Replace with your actual storage solution

//   const response = await fetch(uri);
//   const blob = await response.blob();

//   // Generate a unique filename
//   const filename = uri.substring(uri.lastIndexOf("/") + 1);
//   const storageRef = firebase.storage().ref().child(`images/${filename}`);

//   // Upload the file
//   await storageRef.put(blob);

//   // Get and return the public URL
//   return await storageRef.getDownloadURL();
// };

// // Helper function to save record to your database
// const saveToDatabase = async (data) => {
//   // Replace with your actual database API call
//   // Example with Firestore:
//   await firebase.firestore().collection("photos").add(data);
// };

export function StudentForm({
  onSubmit,
  initialValues = {},
}: StudentFormProps) {
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      id: initialValues.id || 0,
      name: initialValues.name || "",
      image: initialValues.image || "",
      program: initialValues.program || "",
      expireAt: new Date(initialValues.expireAt ?? Date.now()).toISOString(),
      role: initialValues.role || "",
      isActive: initialValues.isActive || false,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Submitting form with values:", value);
        // const uploadedImageUrl = await uploadImageToStorage(imageUri);

        // // 2. Save the record to your database with the permanent URL
        // await saveToDatabase({
        //   imageUrl: uploadedImageUrl,
        //   // other data...
        // });
        const success = await onSubmit(value);

        setSubmissionResult({
          success,
          message: success
            ? "Student ble registrert!"
            : "Kunne ikke registrere student. Prøv igjen senere.",
        });

        if (success) {
          form.reset();
          setTimeout(() => {
            setSubmissionResult(null);
          }, 3000);
        }
      } catch (error) {
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
      <Text style={styles.title} className="mt-16">
        Registrer ny student
      </Text>

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
        type="numeric"
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
      <form.Field
        name="image"
        children={(field) => (
          <PictureField
            label="Legg til bilde"
            onFieldChange={field.handleChange}
            value={field.state.value}
            meta={field.state.meta}
          />
        )}
      />
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
                  "bg-blue-100 px-8 py-4 rounded-md text-center mb-14 mt-5",
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
    position: "relative",
    paddingBottom: 60,
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
  },
  spinner: {
    marginLeft: 10,
  },
});
