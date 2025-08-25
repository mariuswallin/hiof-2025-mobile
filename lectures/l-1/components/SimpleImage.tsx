import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const uri = "https://placehold.co/100";
// Image format må spesifiseres i komponenten =
const uriWithFormat = `${uri}/jpg`;
export default function StudentIDCardImage() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>STUDENT ID</Text>
        <Image
          source={{
            uri: uriWithFormat,
            // headers: {
            //   "Content-Type": "image/jpeg",
            // },
          }}
          style={styles.image}
          onError={(error) => console.log("Image loading error:", error)}
        />
        <Text style={styles.name}>Ola Nordmann</Text>
        <Text style={styles.info}>Studentnr: 123456</Text>
        <Text style={styles.info}>Program: Informatikk</Text>
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
  },
  card: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    color: "#002266",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "#002266",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
});
