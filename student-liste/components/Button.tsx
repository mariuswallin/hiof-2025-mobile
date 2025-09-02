import { Pressable, StyleSheet, Text, View } from "react-native";
import { studentStyles } from "./styles";

export default function Button({
  children,
  onPress,
}: {
  children?: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        studentStyles.button,
        pressed && studentStyles.buttonPressed,
      ]}
    >
      {/* Må ha bruke fragment ellers får vi render feil */}
      {({ pressed }) => (
        <>
          {children}
          {pressed && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Trykkes!
              </Text>
            </View>
          )}
          {!pressed && <Text>Trykk meg</Text>}
        </>
      )}
    </Pressable>
  );
}
