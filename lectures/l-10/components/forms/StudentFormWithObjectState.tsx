import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
// Importer Student-typen fra types-filen
import type { Student } from "../../types";

export default function StudentFormWithObjectState() {
  // Initial state objekt med alle feltene
  const [student, setStudent] = useState<Student>({
    id: "",
    name: "",
    program: "",
    expireAt: "",
    role: "",
    isActive: false,
  });

  // Generisk handler for å oppdatere feltene
  // Bruker keyof for å sikre at vi kun oppdaterer gyldige felt
  // fra Student-typen
  const handleChange = (name: keyof Student, value: string | boolean) => {
    setStudent((prevStudent) => ({
      ...prevStudent, // Sprer tidligere verdier
      [name]: value, // Oppdaterer kun spesifikt felt
    }));
  };

  const handleSubmit = () => {
    console.log("Student data:", student);
    // Her ville vi vanligvis sende data til et API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrer ny student</Text>

      <Text style={styles.label}>Student ID:</Text>
      <TextInput
        style={styles.input}
        value={student.id}
        onChangeText={(value) => handleChange("id", value)}
        placeholder="Skriv inn student ID"
      />

      <Text style={styles.label}>Navn:</Text>
      <TextInput
        style={styles.input}
        value={student.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Skriv inn navn"
      />

      <Text style={styles.label}>Program:</Text>
      <TextInput
        style={styles.input}
        value={student.program}
        onChangeText={(value) => handleChange("program", value)}
        placeholder="Skriv inn studieprogram"
      />

      <Text style={styles.label}>Utløpsdato:</Text>
      <TextInput
        style={styles.input}
        value={student.expireAt}
        onChangeText={(value) => handleChange("expireAt", value)}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Rolle:</Text>
      <TextInput
        style={styles.input}
        value={student.role}
        onChangeText={(value) => handleChange("role", value)}
        placeholder="Skriv inn rolle"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Aktiv:</Text>
        <Switch
          value={student.isActive}
          style={styles.switch}
          onValueChange={(value) => handleChange("isActive", value)}
        />
      </View>

      <Button title="Registrer student" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Samme som tidligere
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  switchContainer: {
    marginBottom: 20,
  },
  switch: {},
});
