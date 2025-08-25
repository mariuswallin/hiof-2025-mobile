// components/forms/DateField.tsx

import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format, addYears } from "date-fns";
import { nb } from "date-fns/locale";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { FieldErrors } from "./FieldError";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../constants/theme";

export const DatePickerField = ({
  name,
  label,
  form,
  initialDate,
  validator,
  styles,
}: {
  name: string;
  label: string;
  // Bruker typen vi får fra useForm. Bruker any her, men bør optimalt sett være mer spesifikk
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any>;
  // Validator-funksjon for å validere feltet
  validator?: (value: unknown) => boolean;
  initialDate?: Date;
  styles?: {
    container?: ViewStyle;
    label?: TextStyle;
    date?: {
      container?: ViewStyle;
      button?: ViewStyle;
      text?: TextStyle;
    };
    error?: {
      input: TextStyle;
      text: TextStyle;
    };
  };
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = new Date();
  const date = new Date(form?.getFieldValue(name) ?? initialDate ?? today);

  const formFieldStyles = {
    ...defaultStyles,
    errorInput: defaultStyles.errorInput ?? styles?.error?.input,
    errorText: defaultStyles.errorText ?? styles?.error?.text,
    dateButton: defaultStyles.dateButton ?? styles?.date?.button,
    dateButtonText: defaultStyles.dateButtonText ?? styles?.date?.text,
    dateIconContainer:
      defaultStyles.dateIconContainer ?? styles?.date?.container,
    ...(styles ?? {}),
  };

  const maxDate = addYears(today, 5); // Maksimalt 5 år fram i tid

  // Formater dato som tekst for visning
  const formattedDate = date
    ? format(date, "dd. MMMM yyyy", { locale: nb })
    : "Velg dato";

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (!currentDate) {
      return;
    }
    // Hvis brukeren trykker på "Avbryt" i DateTimePicker
    // eller utenfor for å lukke den
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    // Oppdatere datoen i skjemaet
    form.setFieldValue(name, format(currentDate, "yyyy-MM-dd"));
  };

  return (
    <form.Field
      name={name}
      {...(validator
        ? { validators: { onChange: ({ value }) => !validator(value) } }
        : {})}
      children={(field) => {
        return (
          <View style={formFieldStyles?.container}>
            <Text style={formFieldStyles.label}>{label}:</Text>
            {/* Bruker TouchableOpacity som har innebygget animasjon */}
            <TouchableOpacity
              style={[
                formFieldStyles.dateButton,
                !field.state.meta.isValid &&
                  field.state.meta.isTouched &&
                  formFieldStyles?.errorInput,
              ]}
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              <View style={formFieldStyles.dateIconContainer}>
                <Ionicons name="calendar" size={20} color={Theme.primary} />
              </View>
              <Text style={formFieldStyles.dateButtonText}>
                {formattedDate}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                display="default"
                onChange={onChange}
                minimumDate={today}
                maximumDate={maxDate}
                mode="date"
              />
            )}
            <FieldErrors
              meta={field.state.meta}
              styles={{
                error: formFieldStyles.errorText,
              }}
            />
          </View>
        );
      }}
    />
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginBottom: 0,
    marginVertical: 0,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#002266",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    color: "#002266",
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
