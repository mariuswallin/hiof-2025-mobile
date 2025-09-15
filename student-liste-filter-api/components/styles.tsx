import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const studentCardStyles = {
  width: cardWidth,
  borderRadius: 10,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 5,
} as const;

const studentTitleStyles = {
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 15,
  color: "#002266",
} as const;

const studentButtonStyles = {
  borderWidth: 1,
  borderColor: "red",
  padding: 12,
  position: "relative",
} as const;

export const studentStyles = StyleSheet.create({
  card: studentCardStyles,
  title: studentTitleStyles,
  button: studentButtonStyles,
  buttonPressed: {
    backgroundColor: "#002266",
  },
});
