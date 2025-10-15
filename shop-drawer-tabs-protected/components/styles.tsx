import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const productCardStyles = {
  width: cardWidth,
  backgroundColor: "white",
  borderRadius: 10,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 5,
} as const;

const productTitleStyles = {
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 15,
  color: "#002266",
} as const;

const productPriceStyles = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
} as const;

const productButtonStyles = {
  backgroundColor: "teal",
  padding: 12,
  borderRadius: 4,
} as const;

const productImageStyles = {
  width: 200,
  height: 200,
  marginVertical: 15,
  borderWidth: 2,
  borderColor: "#002266",
} as const;

export const productStyles = StyleSheet.create({
  card: productCardStyles,
  title: productTitleStyles,
  price: productPriceStyles,
  button: productButtonStyles,
  image: productImageStyles,
});
