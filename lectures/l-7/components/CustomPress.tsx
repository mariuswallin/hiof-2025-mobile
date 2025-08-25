import type React from "react";
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  Platform,
} from "react-native";

// Props-typen til vår komponent som utvider Pressable sine props
type PressProps = PressableProps & {
  children: React.ReactNode;
  // Om komponenten skal vise visuell feedback ved trykk
  feedbackStyle?: boolean;
  // Om vi skal bruke Android ripple-effekt
  useRipple?: boolean;
  // Om vi skal utvide trykkbart område
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
  // Setter opp standard ripple-effekt for Android hvis useRipple er true
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
        // Basis-stil
        styles.pressable,
        // Bruker-definert stil (kan være en funksjon eller et objekt)
        typeof style === "function" ? style({ pressed }) : style,
        // Legger til feedback-stil hvis aktivert og trykket
        feedbackStyle && pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    // Ingen standard-stil, lar bruker definere grunnstilen
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: "#00000010",
  },
});
