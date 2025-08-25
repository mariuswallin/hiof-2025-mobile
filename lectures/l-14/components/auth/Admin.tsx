// components/auth/Admin.tsx

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function Admin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoaded, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.replace("/login");
    }
  }, [isLoaded, router, isAdmin]);

  if (isLoading || !isLoaded || !isAdmin) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <>{children}</>;
}
