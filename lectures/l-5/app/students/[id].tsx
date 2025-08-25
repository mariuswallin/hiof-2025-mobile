import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import StudentIDNoPress from "../../components/StudentIDNoPress";
// importerer en liste med studenter fra en konstant-fil
// normalt ville dette vært en API-kall eller databaseforespørsel
import { Students } from "../../constants/students";
import { Theme } from "../../constants/theme";

// Lager denne lokalt da den ikke brukes andre steder og er spesifikk for denne komponenten
const EmptyStudent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>Ingen student funnet.</Text>
      <Link href="/students" style={styles.link}>
        <Text style={styles.linkText}>Tilbake til studentlisten</Text>
      </Link>
    </View>
  );
};

export default function StudentDetailScreen() {
  // Bruk useLocalSearchParams for å hente ut ID-parameteren fra URL-en
  const { id } = useLocalSearchParams();

  // Finn studenten med den aktuelle ID-en
  const student = Students.find((s) => s.id === id);

  // Håndter tilfellet der studenten ikke blir funnet
  if (!student) {
    return <EmptyStudent />;
  }

  return (
    <View style={styles.container}>
      <StudentIDNoPress student={student} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#002266",
  },

  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
