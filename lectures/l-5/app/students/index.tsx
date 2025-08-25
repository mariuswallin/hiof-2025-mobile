import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import StudentListItem from "../../components/StudentListItem";
// importerer en liste med studenter fra en konstant-fil
// normalt ville dette vært en API-kall eller databaseforespørsel
import { Students as StudentData } from "../../constants/students";

export default function Students() {
  // Hent router-objektet for programmatisk navigasjon
  const router = useRouter();

  // Funksjon for å navigere til studentdetaljer ved bruk av useRouter
  const navigateToStudent = (id: string) => {
    // Navigerer til den dynamiske ruten med id som parameter
    router.push(`/students/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Studentliste</Text>

      {/* METODE 1: Listevisning med StudentListItem og programmatisk navigasjon */}
      {/* <Text style={styles.sectionTitle}>Navigasjon med useRouter:</Text>
      <FlatList
        data={students.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Ved klikk bruker vi useRouter for å navigere programmatisk
          <CustomPress onPress={() => navigateToStudent(item.id)}>
            <StudentListItem student={item}  />
          </CustomPress>
        )}
        style={styles.list}
      /> */}

      {/* METODE 2: Listevisning med Link-komponenten for deklarativ navigasjon */}
      <Text style={styles.sectionTitle}>Navigasjon med Link-komponenten:</Text>
      <View style={styles.list}>
        {StudentData.map((student) => (
          <Link
            key={student.id}
            // Her bruker vi href direkte med den aktuelle ID-en
            href={`/students/${student.id}`}
          >
            <StudentListItem student={student} />
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#002266",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 10,
    color: "#002266",
  },
  list: {
    width: "100%",
    marginBottom: 15,
  },
  link: {
    backgroundColor: "#002266",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
