import { useState } from "react";
import {
  Pressable,
  Switch,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import type { Product } from "../types";

export default function ProductForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    status: "active",
  });

  const updateFormData = (
    field: keyof Product,
    value: string | number | "active" | "inactive"
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  if (submitting) {
    return (
      <View style={styles.container}>
        <Text>Submitting...</Text>
      </View>
    );
  }

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text>Submitted!</Text>
        <Text>Show form</Text>
        <Pressable
          onPress={() => {
            setSubmitted(false);
            setFormData({
              id: "",
              name: "",
              description: "",
              price: 0,
              status: "active",
            });
          }}
          style={styles.submit}
        >
          <Text style={styles.submitText}>Reset</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Product Form</Text>
      <View>
        <Text style={styles.label}>name</Text>
        <TextInput
          placeholder="Product Name"
          value={formData.name}
          onChangeText={(text) => updateFormData("name", text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => updateFormData("description", text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Price"
          inputMode="numeric"
          style={styles.input}
          value={formData.price.toString()}
          onChangeText={(text) =>
            updateFormData("price", parseFloat(text) || 0)
          }
        />
      </View>
      <View>
        <Text style={styles.label}>Status</Text>
        <Switch
          value={formData.status === "active"}
          onValueChange={(value) =>
            updateFormData("status", value ? "active" : "inactive")
          }
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
    gap: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#002266",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    color: "#002266",
  },
  submit: {
    marginTop: 20,
    backgroundColor: "teal",
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
