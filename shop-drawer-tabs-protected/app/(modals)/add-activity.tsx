import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Add() {
  const handleCloseModal = () => router.canGoBack() && router.back();

  return (
    <View style={styles.modalContainer}>
      <Pressable onPress={handleCloseModal} style={styles.backButton}>
        <Ionicons name="arrow-back" size={35} />
      </Pressable>
      <View style={styles.contentView}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Må bruke context her for å få til shared state med activites
          </Text>
          <Pressable onPress={handleCloseModal} style={styles.button}>
            <Text style={styles.buttonText}>Avbryt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const buttonStyle = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  ...buttonStyle,
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },
  contentView: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 2,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
    zIndex: 2,
  },
});
