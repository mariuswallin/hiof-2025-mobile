// app/(zShared)/_layout.tsx

import { Theme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function SharedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Definerer en skjerm for access */}
      {/* Bruker fullScreenModal som visning slik at */}
      {/* den dekker hele skjermen */}
      <Stack.Screen
        name="access"
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
