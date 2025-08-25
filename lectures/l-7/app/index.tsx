import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Theme } from "../constants/theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Studentapp</Text>
      <Text style={styles.subtitle}>Velkommen til student-id appen!</Text>

      <View style={styles.linkContainer}>
        <Link href="/about" style={styles.link}>
          <Text style={styles.linkText}>Om appen</Text>
        </Link>
        {/* Legger til en ny link for admin */}
        <Link href="/students" style={styles.link}>
          <Text style={styles.linkText}>Studenter</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Theme.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#333",
  },
  linkContainer: {
    width: "80%",
    marginTop: 20,
  },
  link: {
    backgroundColor: Theme.primary,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
