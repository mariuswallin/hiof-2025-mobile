// components/CustomView.tsx

import { View } from "react-native";
import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type CustomViewProps = Partial<React.AbstractView> & {
  className?: string;
  safeArea?: boolean;
};

export default function CustomView({
  className = "",
  safeArea = false,
  ...props
}: PropsWithChildren<CustomViewProps>) {
  // Basisklasse for bakgrunnsfarge
  const baseClass = "bg-gray-100";

  // Hvis safeArea er true, legger vi til padding for safe area
  const safeAreaClass = safeArea ? "p-safe" : "";

  return (
    <View className={cn(baseClass, safeAreaClass, className)} {...props} />
  );
}
