// app/(admin)/(student)/students/_layout.tsx

import { Stack, Slot } from "expo-router";

export default function StudentsLayout() {
  // Trenger ikke kontroll på Stack, men må ha en layout ellers vil vi få
  // en navigasjonsbar i topp av skjermen
  return <Slot />;
  // Gir oss en stack for disse skjermene
  // Men vil da vises i toppen da vi ikke har noen konfigurasjon
  return <Stack />;
  // Alternativ om vi vil ha en Stack og konfigurasjon
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
