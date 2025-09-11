import { StyleSheet, View } from "react-native";
import ProductCard from "./components/ProductCard";
import { type Product } from "./types";

const product: Product = {
  id: "1",
  name: "My new product",
  price: 29.99,
  description: "This is a sample product description.",
};

export default function App() {
  return (
    <View style={styles.container}>
      <ProductCard product={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
