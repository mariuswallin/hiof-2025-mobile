import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
import { useForm } from "@tanstack/react-form";
import type { Student } from "../../types";

export default function StudentFormWithTanStack() {
  // Oppretter skjemainstans med TanStack Form
  const form = useForm<Student>({
    // Definerer feltene i skjemaet og default verdier
    defaultValues: {
      id: "",
      name: "",
      program: "",
      expireAt: "",
      role: "",
      isActive: false,
    },
    // Funksjon brukt ved innsending av skjemaet
    onSubmit: async ({ value }) => {
      console.log("Student data:", value);
      // Her ville vi vanligvis sende data til et API
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrer ny student</Text>

      {/* form.Field komponent for å håndtere hvert felt */}
      <form.Field
        name="id" // Navnet på feltet i skjemaet (fra defaultValues)
        // children prop er en funksjon som gir tilgang til feltets tilstand og håndteringsfunksjoner
        children={(field) => (
          <View>
            <Text style={styles.label}>Student ID:</Text>
            <TextInput
              style={styles.input}
              // Henter verdien fra feltets tilstand (i dette tilfellet student ID)
              value={field.state.value}
              // Håndterer endringer i tekstfeltet
              // field.handleChange er en funksjon som oppdaterer feltets tilstand
              // med den nye verdien. For id i dette tilfellet
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Skriv inn student ID"
            />
          </View>
        )}
      />
      <form.Field
        name="name"
        children={(field) => (
          <View>
            <Text style={styles.label}>Navn:</Text>
            <TextInput
              style={styles.input}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Skriv inn navn"
            />
          </View>
        )}
      />

      <form.Field
        name="program"
        children={(field) => (
          <View>
            <Text style={styles.label}>Program:</Text>
            <TextInput
              style={styles.input}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Skriv inn studieprogram"
            />
          </View>
        )}
      />

      <form.Field
        name="expireAt"
        children={(field) => (
          <View>
            <Text style={styles.label}>Utløpsdato:</Text>
            <TextInput
              style={styles.input}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="YYYY-MM-DD"
            />
          </View>
        )}
      />

      <form.Field
        name="role"
        children={(field) => (
          <View>
            <Text style={styles.label}>Rolle:</Text>
            <TextInput
              style={styles.input}
              value={field.state.value}
              onChangeText={(value) => field.handleChange(value)}
              placeholder="Skriv inn rolle"
            />
          </View>
        )}
      />

      <form.Field
        name="isActive"
        children={(field) => (
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Aktiv:</Text>
            <Switch
              value={field.state.value}
              style={styles.switch}
              onValueChange={(value) => field.handleChange(value)}
            />
          </View>
        )}
      />

      <Button title="Registrer student" onPress={() => form.handleSubmit()} />
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
