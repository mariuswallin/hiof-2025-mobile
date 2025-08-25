// components/auth/Authenticated.tsx

import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function Authenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, isLoading, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router, isLoaded]);

  if (!isLoaded || isLoading || !isLoggedIn) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <>{children}</>;
}
