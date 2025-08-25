// app/register.tsx

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthProvider";
import { Theme } from "@/constants/theme";
import { Checkbox } from "@futurejj/react-native-checkbox";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Vennligst fyll ut alle feltene");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passordene matcher ikke");
      return;
    }
    try {
      setError("");
      await register(email, password, isAdmin);
      if (isAdmin) {
        router.replace("/list");
        return;
      }

      router.replace("/");
    } catch (err) {
      setError("Registrering feilet. Prøv igjen senere.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrer ny konto</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Passord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Bekreft passord"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isAdmin ? "checked" : "unchecked"}
          onPress={() => setIsAdmin(!isAdmin)}
          color={Theme.primary}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Registrer som administrator</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrer</Text>
        )}
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>Har du allerede en konto? </Text>
        <Link href="/login" style={styles.link}>
          Logg inn her
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Theme.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: Theme.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  link: {
    color: Theme.primary,
    fontWeight: "bold",
  },
});
