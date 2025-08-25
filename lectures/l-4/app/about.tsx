import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Om appen</Text>
      <Text style={styles.paragraph}>
        Dette er en studentapp laget med React Native og Expo Router. Appen
        demonstrerer en rekke konsepter innen React Native.
      </Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Tilbake til forsiden</Text>
      </Link>
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
    marginBottom: 20,
    color: "#002266",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 22,
    width: "90%",
  },
  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
