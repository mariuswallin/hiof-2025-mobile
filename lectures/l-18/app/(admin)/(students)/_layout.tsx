// app/(admin)/(students)/_layout.tsx

import { router, Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../constants/theme";
import { FloatingButton } from "../../../components/FloatingButton";

import { useFormContext } from "@/context/FormContextReducer";
import { Alert } from "react-native";

export default function StudentsGroupLayout() {
  // Bruker usePathname for å få tilgang til den nåværende stien
  const pathname = usePathname();
  // Fjerner den første skråstreken fra stien
  // Dette gir oss en renere sti som vi kan bruke til å sammenligne med tidligere stier
  const previousPath = pathname.replace(/\//, "");

  // Bruker useFormContext for å få tilgang til formtilstanden og dispatch-funksjonen
  const { state, dispatch } = useFormContext();
  const isDirty = state.status === "dirty";

  // Funksjon for å sjekke om vi skal forhindre standard oppførsel
  const shouldPreventDefault = (targetPath?: string) => {
    if (!targetPath) return false;
    return isDirty && targetPath !== previousPath && previousPath === "add";
  };

  // Funksjon for å vise en advarsel
  // Denne funksjonen viser en advarsel når brukeren prøver å navigere bort fra skjermen
  const triggerAlert = (targetPath: string) => {
    Alert.alert(
      "Unsaved changes",
      "You have unsaved changes. Are you sure you want to leave?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => {
            // Nullstill skjemaet
            dispatch({ type: "RESET_FORM" });
            // Naviger til den nye stien
            // Vi bruker router.navigate for å navigere til den nye stien
            router.navigate(targetPath);
          },
        },
      ],
      { cancelable: false } // Forhindrer lukking ved å trykke utenfor den
    );
  };

  return (
    <Tabs
      screenListeners={{
        // Trigges når vi navigerer bort fra en skjerm (back)
        beforeRemove: (e) => {
          const targetPath = e.target?.split("-")[0];
          if (shouldPreventDefault(targetPath)) {
            // Avbryt navigasjonen
            e.preventDefault();
            triggerAlert(targetPath as string);
          }
        },
        // Trigges ved tabbytte
        tabPress: (e) => {
          const targetPath = e.target?.split("-")[0];
          if (shouldPreventDefault(targetPath)) {
            // Avbryt navigasjonen
            e.preventDefault();
            triggerAlert(targetPath as string);
          }
        },
      }}
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Students",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          headerTitle: "Legg til student",
          headerShown: true,
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? Theme.primary : Theme.background;
            const buttonColor = focused ? Theme.background : Theme.primary;
            return (
              <FloatingButton color={buttonColor} size={60}>
                <Ionicons name="add-circle" size={60} color={iconColor} />
              </FloatingButton>
            );
          },
        }}
      />
    </Tabs>
  );
}
