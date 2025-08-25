import { Button, StyleSheet, Text, View } from "react-native";

export default function Debug() {
  console.log("Logging from App.tsx");
  const runConsoleLog = () => {
    console.log("Logging from runConsoleLog");
  };
  return (
    <View style={styles.container}>
      <Text>Velkommen til React Native. Hei alle sammen!</Text>
      <Button onPress={runConsoleLog} title="Klikk meg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
