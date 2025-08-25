// app/_layout.tsx

import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import Logo from "../components/Logo";
import { Theme } from "../constants/theme";
import "./global.css";

export default function RootLayout() {
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
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Logo />,
          title: "Studentapp",
          headerRight: () => (
            <Pressable
              onPress={() => alert("Dette er en handling!")}
              style={{
                backgroundColor: Theme.secondary,
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Handling</Text>
            </Pressable>
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "Om appen",
        }}
      />
      <Stack.Screen
        name="(admin)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/remove-student"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
