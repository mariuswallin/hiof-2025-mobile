// components/forms/Picker.tsx

import {
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { FieldErrors } from "./FieldError";
import Picker from "react-native-picker-select";
import { useState, type PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../constants/theme";
import type { AnyFieldMeta } from "@tanstack/react-form";

type FieldPickerProps = {
  onFieldChange: (value: string) => void;
  selectedValue: string;
  label: string;
  meta?: Partial<AnyFieldMeta>;
  options: { label: string; value: string }[];
  styles?: {
    container?: ViewStyle;
    label?: TextStyle;
    input?: TextStyle;
    error?: {
      input: TextStyle;
      text: TextStyle;
    };
  };
};

export const FieldPicker = (props: PropsWithChildren<FieldPickerProps>) => {
  // Brukes for å vise om picker er åpen eller lukket
  const [isOpen, setIsOpen] = useState(false);
  const {
    onFieldChange,
    selectedValue,
    label,
    meta = {},
    styles,
    options,
    children,
  } = props;

  // TODO: Denne kunne vi sentralisert da den er like for alle Input-feltene
  const formFieldStyles = {
    ...defaultStyles,
    errorInput: defaultStyles.errorInput ?? styles?.error?.input,
    errorText: defaultStyles.errorText ?? styles?.error?.text,
    ...(styles ?? {}),
  };

  return (
    <View style={formFieldStyles.container}>
      <Text style={formFieldStyles.label}>{label}</Text>
      <Picker
        value={selectedValue}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        onValueChange={(value) => {
          // Må sjekke for default value da
          // form.reset endrer denne som igjen trigger valideringen
          if (value === "" && !isOpen) {
            return;
          }
          console.log("Selected value:", value);
          onFieldChange(value);
        }}
        Icon={() => {
          return (
            <View>
              {isOpen ? (
                <Ionicons
                  style={formFieldStyles.icon}
                  name="chevron-up"
                  size={16}
                  color="gray"
                />
              ) : (
                <Ionicons
                  style={formFieldStyles.icon}
                  name="chevron-down"
                  size={16}
                  color="gray"
                />
              )}
            </View>
          );
        }}
        items={options} // Valgene som skal vises i picker
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: `Velg ${label.toLowerCase()}`, value: "" }} // Placeholder
        darkTheme={false}
        style={{
          inputIOS: {
            ...inputStyles.inputIOS,
            ...(!selectedValue && {
              color: "#002266",
            }),
          },
          inputAndroid: {
            ...inputStyles.inputAndroid,
            ...(!selectedValue && {
              color: "#002266",
            }),
          },
          modalViewBottom: {
            backgroundColor: Theme.primary,
          },
          ...(meta.errors &&
            meta.errors?.length > 0 && {
              inputIOS: {
                ...inputStyles.inputIOS,
                ...formFieldStyles.errorInput,
                color: "red",
              },
              inputAndroid: {
                ...inputStyles.inputAndroid,
                ...formFieldStyles.errorInput,
                color: "red",
              },
            }),
          // Brukes for å gjøre hele feltet klikkbart
          iconContainer: {
            top: 0,
            right: 0,
            position: "absolute",
            flex: 1,
            width: "100%",
            height: "100%",
          },
        }}
      />
      <FieldErrors
        meta={meta}
        styles={{
          error: formFieldStyles.errorText,
        }}
      />
      {/* Brukes for å koble denne til andre felter (slik som annet) */}
      {children}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#002266",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  picker: {
    padding: 12,
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

// Slik stylingen må være for å fungere med react-native-picker-select
const inputStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
});
