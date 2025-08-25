import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import type { Student } from "../types";
import { Theme } from "../constants/theme";

export default function StudentListItem({ student }: { student: Student }) {
  const { name, id, program, isActive, image } = student;
  const { primary, secondary } = Theme;

  return (
    <View style={styles.content}>
      <Image
        source={{ uri: image || "https://placehold.co/100/jpg" }}
        style={[styles.image, { borderColor: secondary }]}
      />

      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: primary }]}>{name}</Text>

        <Text style={styles.info}>ID: {id}</Text>
        <Text style={styles.info}>Program: {program}</Text>

        {!isActive && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Inaktiv</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
