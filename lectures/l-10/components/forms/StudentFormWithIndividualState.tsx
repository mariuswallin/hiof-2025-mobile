// components/forms/FormSeparate.tsx

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
import type { Student } from "../../types";

export default function StudentFormWithIndividualState() {
  // Separate state-variabler for hvert felt
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = () => {
    // Samle alle verdier i et studentobjekt
    const student: Student = {
      id,
      name,
      program,
      expireAt,
      role,
      isActive,
    };

    console.log("Student data:", student);
    // Her ville vi vanligvis sende data til et API
    // eller gjøre noe annet med dataene
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrer ny student</Text>

      <Text style={styles.label}>Student ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="Skriv inn student ID"
      />

      <Text style={styles.label}>Navn:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Skriv inn navn"
      />

      <Text style={styles.label}>Program:</Text>
      <TextInput
        style={styles.input}
        value={program}
        onChangeText={setProgram}
        placeholder="Skriv inn studieprogram"
      />

      <Text style={styles.label}>Utløpsdato:</Text>
      <TextInput
        style={styles.input}
        value={expireAt}
        onChangeText={setExpireAt}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Rolle:</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        placeholder="Skriv inn rolle"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Aktiv:</Text>
        <Switch
          value={isActive}
          style={styles.switch}
          onValueChange={setIsActive}
        />
      </View>

      <Button title="Registrer student" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
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
