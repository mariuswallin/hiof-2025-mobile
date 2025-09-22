import { type Product } from "./types";
import ProductList from "./components/ProductList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleProductFiltering = (query?: string) => {
    const isEmptyQuery = !query || query.trim() === "";
    if (isEmptyQuery) {
      setFilteredProducts(products);
      return;
    }
    console.log("Filtering products with query:", query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    // const filtered = products.filter(({name}) =>
    //   name.toLowerCase().includes(query.toLowerCase())
    // );
    // setFilteredProducts((prevData) =>
    //   prevData.filter((product) =>
    //     product.name.toLowerCase().includes(query.toLowerCase())
    //   )
    // );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ProductList
          products={filteredProducts}
          onProductFiltering={handleProductFiltering}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
