// components/forms/FieldError.tsx

import { Text, type TextStyle } from "react-native";

import type { AnyFieldMeta } from "@tanstack/react-form";

type FieldErrorsProps = {
  meta: Partial<AnyFieldMeta>;
  styles: {
    error: TextStyle;
  };
};

// Lager en komponent for å vise feil for et felt
// Denne komponenten tar inn meta-informasjon om feltet og stiler
// og viser feilene hvis feltet er berørt

export const FieldErrors = ({ meta, styles }: FieldErrorsProps) => {
  const formFieldStyles = {
    ...defaultStyles,
    ...(styles ?? {}),
  };

  // Bruker en unik liste for å unngå duplikater i feilene
  // og viser dem i en liste
  const uniqueErrors = Array.from(new Set(meta.errors)).map((err) => ({
    error: err.message,
  }));

  if (!meta.isTouched) {
    return null;
  }

  return uniqueErrors.map(({ error }, index) => (
    <Text key={index} style={formFieldStyles.error}>
      {error}
    </Text>
  ));
};

const defaultStyles = {
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
};
