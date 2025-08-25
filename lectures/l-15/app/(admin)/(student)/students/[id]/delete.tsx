// app/(admin)/(student)/students/[id]/delete.tsx

import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomView from "@/components/CustomView";
import { Theme } from "@/constants/theme";

export default function DeleteStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  // Tilstand for å kontrollere om modalen vises
  const [modalVisible, setModalVisible] = useState(false);

  // Funksjon for å håndtere sletting av student
  const handleDelete = () => {
    // Her ville vi vanligvis kalle et API for å slette studenten
    console.log(`Sletter student med ID: ${id}`);

    // Lukk modalen
    setModalVisible(false);

    // Vis bekreftelse og naviger tilbake til studentlisten
    Alert.alert("Student slettet", "Studenten ble slettet", [
      {
        text: "OK",
        onPress: () => router.push("/students"),
      },
    ]);
  };

  return (
    <CustomView
      safeArea
      className="flex-1 flex-col items-center justify-center p-5"
    >
      <Text style={styles.title}>Slett student</Text>
      <Text style={styles.description}>
        Er du sikker på at du vil slette denne studenten?
      </Text>

      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Slett student</Text>
      </Pressable>

      {/* Modal for slettebekreftelse */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bekreft sletting</Text>
            <Text style={styles.modalText}>
              Er du sikker på at du vil slette denne studenten? Dette kan ikke
              angres.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Avbryt</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Bekreft sletting</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    minWidth: 150,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: Theme.danger,
  },
  cancelButton: {
    backgroundColor: Theme.secondary,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: Theme.danger,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
