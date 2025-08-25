import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

import { Image } from "react-native";
import LogoImage from "../assets/logo.png";

function Logo() {
  return <Image style={{ width: 50, height: 50 }} source={LogoImage} />;
}

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#002266",
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
          // Setter en tilpasset tittelkomponent for å vise logoen
          headerTitle: () => <Logo />,
          title: "Studentapp",
          // Legger til en knapp i headeren.
          // Gjelder kun for denne skjermen.
          headerRight: () => (
            <Pressable
              onPress={() => alert("Dette er en handling!")}
              style={{
                backgroundColor: "#002266",
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Handling</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "Om appen",
        }}
      />
      <Stack.Screen
        name="students/index"
        options={{
          title: "Alle studenter",
        }}
      />
      <Stack.Screen
        name="students/[id]"
        options={({ route }) => ({
          // Bruker den dynamiske "id" i tittelen
          title: `Student ${route?.params?.id ?? ""}`,
          // Endrer navnet på tilbakeknappen
          headerBackTitle: "Tilbake",
        })}
      />
    </Stack>
  );
}
