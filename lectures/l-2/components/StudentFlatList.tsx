import { FlatList } from "react-native";
import StudentID from "../components/StudentID";
import type { Student, Theme } from "../types";
import Card from "./BaseCard";

type StudentListProps = {
  students: Student[];
  theme: Theme;
};

export default function StudentFlatList(props: StudentListProps) {
  const { students, theme } = props;
  return (
    <FlatList
      // Datakilden som skal rendres
      data={students}
      // Funksjon som genererer unike nøkler for hvert element
      keyExtractor={(item) => item.id}
      // Definerer hvordan hvert element i listen skal rendres
      renderItem={({ item }) => (
        <Card key={item.id} theme={theme} title={item.name}>
          <StudentID student={item} theme={theme} />
        </Card>
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
