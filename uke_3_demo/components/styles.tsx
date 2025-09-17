import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const productCardStyles = {
  flex: 1,
  //width: cardWidth,
  width: "100%",
  backgroundColor: "white",
  borderRadius: 10,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  paddingHorizontal: 15,
  shadowRadius: 5,
  elevation: 5,
} as const;

const productPriceStyles = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
} as const;

export const productStyles = StyleSheet.create({
  card: productCardStyles,
  price: productPriceStyles,
});
