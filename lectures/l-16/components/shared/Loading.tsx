// components/Loading.tsx

import { ActivityIndicator } from "react-native";
import CustomView from "../CustomView";
import { Theme } from "@/constants/theme";

export default function Loading() {
  return (
    <CustomView safeArea className="flex-1">
      <ActivityIndicator size="large" color={Theme.primary} />
    </CustomView>
  );
}
