import { StyleSheet, View } from "react-native";
import ProductCard from "./components/ProductCard";
import { type Product } from "./types";
import ProductList from "./components/ProductList";

const product: Product = {
  id: "1",
  name: "My new product",
  price: 29.99,
  description: "This is a sample product description.",
};

const products: Product[] = [
  {
    id: "1",
    name: "My new product",
    price: 29.99,
    description: "This is a sample product description.",
  },
  {
    id: "2",
    name: "Another product",
    price: 49.99,
    description: "This is another sample product description.",
  },
  {
    id: "3",
    name: "Third product",
    price: 19.99,
    description: "This is the third sample product description.",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ProductCard product={product} /> */}
      <ProductList products={products} />
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
