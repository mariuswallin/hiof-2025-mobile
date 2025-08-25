import type React from "react";
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Platform,
} from "react-native";

type PressProps = PressableProps & {
  children: React.ReactNode;
  feedbackStyle?: boolean;
  useRipple?: boolean;
  hitSlop?:
    | number
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
};

export default function CustomPress({
  children,
  feedbackStyle = true,
  useRipple = true,
  hitSlop,
  style,
  android_ripple,
  ...rest
}: PressProps) {
  const rippleConfig =
    useRipple && Platform.OS === "android"
      ? android_ripple || { color: "#00000020", borderless: false }
      : undefined;

  return (
    <Pressable
      {...rest}
      hitSlop={hitSlop}
      android_ripple={rippleConfig}
      style={({ pressed }) => [
        styles.pressable,
        typeof style === "function" ? style({ pressed }) : style,
        feedbackStyle && pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {},
  pressed: {
    opacity: 0.8,
    backgroundColor: "#00000010",
  },
});
