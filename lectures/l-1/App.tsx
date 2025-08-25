import { Button, StyleSheet, Text, View } from "react-native";
import StudentIDCardSimple from "./components/Simple";
import StudentIDCard from "./components/SimpleCard";
import StudentIDCardExpanded from "./components/SimpleExpanded";
import Debug from "./components/Debug";
import StudentIDCardImage from "./components/SimpleImage";

export default function App() {
  console.log("Logging from App.tsx");
  const runConsoleLog = () => {
    console.log("Logging from runConsoleLog");
  };
  return (
    <>
      {/* <StudentIDCardSimple /> */}
      {/* <StudentIDCard /> */}
      {/* <StudentIDCardExpanded /> */}

      {/* <StudentIDCardImage /> */}
      <Debug />
    </>
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
