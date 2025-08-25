import { FlatList, StyleSheet } from "react-native";
import StudentID from "./StudentID";
import type { Student, Theme } from "../types";
import Card from "./BaseCard";
import CustomPress from "./CustomPress";

type StudentListProps = {
  students: Student[];
  onStudentPress?: (id: string) => void;
};

export default function StudentFlatList(props: StudentListProps) {
  const { students, onStudentPress } = props;
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CustomPress
          onPress={() => onStudentPress?.(item.id)}
          style={styles.cardPress}
        >
          <Card key={item.id} title={item.name}>
            <StudentID student={item} />
          </Card>
        </CustomPress>
      )}
      contentContainerStyle={{ gap: 25 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
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
