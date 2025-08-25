// app/(profile)/_layout.tsx

import { Theme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function ProfileLayout() {
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
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "Min Profil",
          presentation: "formSheet", // Bruker formSheet for å vise skjerm
          animation: "slide_from_bottom", // Animasjonen vi velger
          sheetGrabberVisible: true, // Viser en liten linje for å dra skjermen opp
        }}
      />
      <Stack.Screen
        name="user-profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
