import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Om appen</Text>
      <Text style={styles.paragraph}>
        Dette er en studentapp laget med React Native og Expo Router. Appen
        demonstrerer en rekke konsepter innen React Native.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Theme.primary,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    width: "90%",
  },
  link: {
    backgroundColor: Theme.primary,
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
