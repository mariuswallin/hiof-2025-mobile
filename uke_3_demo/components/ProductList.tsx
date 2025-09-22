import { ScrollView, TextInput } from "react-native";

import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { useState } from "react";

export default function ProductList({
  products,
  onProductFiltering,
}: {
  products: Product[];
  onProductFiltering: (query: string) => void;
}) {
  const [filter, setFilter] = useState("");

  const handleProductFilter = (query: string) => {
    console.log("Filtering products with query:", query);
    setFilter(query);
    onProductFiltering(query);
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 25 }}
      style={{ flex: 1, width: "100%" }}
    >
      <TextInput
        placeholder="Filter products..."
        value={filter}
        onChangeText={handleProductFilter}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}
