// app/_layout.tsx

import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Logo from "../components/Logo";
import { Theme } from "../constants/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import { useEffect } from "react";
import AuthProvider, { useAuth } from "@/context/AuthProvider";
import { QueryClientProvider } from "@/context/QueryProvider";

SplashScreen.preventAutoHideAsync();

export function RootLayout() {
  const { isLoaded, isLoggedIn, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const authRoutes = ["(modals)", "(admin)", "(zShared)"].includes(
      segments[0]
    );

    if (isLoggedIn && !authRoutes && isAdmin) {
      // redirects admin to list page if not already there
      router.replace("/(admin)/(students)/list");
    }
  }, [isLoaded, isLoggedIn, router, segments, isAdmin]);

  if (!isLoaded || !loaded || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={Theme.primary} size={"large"} />
      </View>
    );
  }

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
      <Stack.Screen name="+not-found" />
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
        name="login"
        options={{
          title: "Logg inn",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Registrer deg",
        }}
      />
      {/* Kun mulig hvis bruker er innlogget*/}
      <Stack.Protected guard={isLoggedIn && !isAdmin}>
        <Stack.Screen
          name="(profile)"
          options={{
            headerTitle: "Profil",
            headerBackTitle: "Tilbake",
          }}
        />
      </Stack.Protected>
      {/* Kun mulig hvis admin */}
      <Stack.Protected guard={isAdmin}>
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
        <Stack.Screen
          name="(zShared)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutWithProviders() {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}
