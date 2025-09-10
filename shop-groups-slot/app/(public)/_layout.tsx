import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "teal",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        //headerShown: false,
      }}
    >
      <Stack.Screen
        name="products/index"
        options={{
          title: "Alle produkter",
        }}
      />
      <Stack.Screen
        name="products/[id]"
        options={({ route }) => ({
          // Bruker den dynamiske "id" i tittelen
          title: `Produkt ${route?.params?.id ?? ""}`,
          // Endrer navnet på tilbakeknappen
          headerBackTitle: "Alle produkter",
        })}
      />
    </Stack>
  );
}
