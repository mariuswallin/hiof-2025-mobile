import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "../constants/theme";
import type { PropsWithChildren } from "react";

type CustomViewProps = Partial<React.AbstractView> & {
  style?: object;
  safeArea?: boolean;
};

export default function CustomView({
  style,
  safeArea = false,
  ...props
}: PropsWithChildren<CustomViewProps>) {
  // Henter safe area insets
  // Dette er padding som legges til toppen og bunnen av komponenten
  // for å unngå at innholdet blir skjult bak status bar og home indicator
  const insets = useSafeAreaInsets();

  // Brukes i komponenter hvor vi ikke vil ha safe area
  if (!safeArea)
    return (
      <View style={[{ backgroundColor: Theme.background }, style]} {...props} />
    );

  return (
    <View
      style={[
        {
          backgroundColor: Theme.background, // Farge på bakgrunnen
          paddingTop: insets.top, // Gir padding til toppen basert på status bar
          paddingBottom: insets.bottom, // Gir padding til bunnen basert på home indicator
        },
        style,
      ]}
      {...props}
    />
  );
}
