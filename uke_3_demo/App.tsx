import { type Product } from "./types";
import ProductList from "./components/ProductList";
import { SafeAreaView } from "react-native-safe-area-context";

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
  {
    name: "Produkt 4",
    price: 400,
    description: "Dette er produkt 4",
    id: "4",
  },
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, width: "100%", paddingTop: 10 }}>
      <ProductList products={products} />
    </SafeAreaView>
  );
}
