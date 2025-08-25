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
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
          presentation: "formSheet",
          animation: "slide_from_bottom",
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="user-profile"
        options={{
          headerBackVisible: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "Brukerprofil",
          headerTitleAlign: "center",
          headerBackTitle: "Tilbake",
        }}
      />
    </Stack>
  );
}
