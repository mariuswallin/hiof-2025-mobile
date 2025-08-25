import { View, type ViewStyle } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "../constants/theme";
import type { PropsWithChildren } from "react";

type CustomViewProps = Partial<React.AbstractView> & {
  style?: ViewStyle;
  safeArea?: boolean;
};

export default function CustomView({
  style,
  safeArea = false,
  ...props
}: PropsWithChildren<CustomViewProps>) {
  const insets = useSafeAreaInsets();

  if (!safeArea)
    return (
      <View style={[{ backgroundColor: Theme.background }, style]} {...props} />
    );

  return (
    <View
      style={[
        {
          backgroundColor: Theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
}
