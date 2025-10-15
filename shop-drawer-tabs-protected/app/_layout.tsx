import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const isLoggedIn = true;
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="main" options={{ headerShown: false }} />
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Screen
              name="(modals)/add-activity"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}
