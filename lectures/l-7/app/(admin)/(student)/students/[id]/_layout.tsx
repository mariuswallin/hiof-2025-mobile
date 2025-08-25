// app/(admin)/(student)/students/[id]/_layout.tsx

import { Tabs, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../../../constants/theme";

export default function StudentDetailLayout() {
  // Henter id fra url
  const { id } = useLocalSearchParams();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        // Skjuler headeren i toppen
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="back"
        options={{
          title: "Back",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-back-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        // Bruker initialParams for å sende id til skjermen
        // Ellers "mister" vi denne når vi endrer fane
        initialParams={{ id }}
        options={{
          title: "View",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: "Edit",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
          // Alternativ måte til initialParams
          href: `/students/${id}/edit`,
        }}
      />
      <Tabs.Screen
        name="delete"
        initialParams={{ id }}
        options={{
          title: "Delete",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trash" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
