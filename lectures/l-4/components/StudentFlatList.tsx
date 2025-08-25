import { FlatList, StyleSheet } from "react-native";
import StudentIDNoPress from "./StudentIDNoPress";
import type { Student, Theme } from "../types";
import Card from "./BaseCard";
import CustomPress from "./CustomPress";

type StudentListProps = {
  students: Student[];
  theme: Theme;
  onStudentPress?: (id: string) => void; // Ny prop for å håndtere trykk
};

export default function StudentFlatList(props: StudentListProps) {
  const { students, theme, onStudentPress } = props;
  return (
    <FlatList
      // Datakilden som skal rendres
      data={students}
      // Funksjon som genererer unike nøkler for hvert element
      keyExtractor={(item) => item.id}
      // Definerer hvordan hvert element i listen skal rendres
      renderItem={({ item }) => (
        <CustomPress
          onPress={() => onStudentPress?.(item.id)}
          style={styles.cardPress}
        >
          <Card key={item.id} theme={theme} title={item.name}>
            <StudentIDNoPress student={item} theme={theme} />
          </Card>
        </CustomPress>
      )}
      // Legger til mellomrom mellom listelementene (25 piksler)
      contentContainerStyle={{ gap: 25 }}
      // Skjuler den vertikal scrollbar for bedre visuelt utseende
      showsVerticalScrollIndicator={false}
      // Skjuler den horisontal scrollbar (selv om denne listen er vertikal)
      showsHorizontalScrollIndicator={false}
      // Sikrer at FlatList fyller tilgjengelig plass i foreldrekomponenten
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  cardPress: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
