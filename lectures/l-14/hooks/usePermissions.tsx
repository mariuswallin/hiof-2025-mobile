// hooks/usePermissions.tsx

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function usePermissions() {
  const [hasPermissions, setHasPermissions] = useState(false);
  // Setter loading til true for å vise en spinner
  // eller lignende mens vi sjekker tillatelsene
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // En asynkron funksjon for å sjekke om tillatelse er satt
    // og lagret i AsyncStorage
    async function checkIfPermissionIsSet() {
      try {
        // Sjekker om vi har lagret tillatelse i AsyncStorage
        // basert på nøkkelen "permissionsGranted"
        const permissionsGranted = await AsyncStorage.getItem(
          "permissionsGranted"
        );
        if (permissionsGranted === null) {
          setHasPermissions(false);
          return;
        }
        setHasPermissions(true);
      } catch (error) {
        console.error("Failed to check if permissions is granted", error);
      } finally {
        // Setter loading til false når vi er ferdige med å sjekke
        // tillatelsene, uansett om det var vellykket eller ikke
        setIsLoading(false);
      }
    }

    checkIfPermissionIsSet();
  }, []);

  return { hasPermissions, isLoading };
}
