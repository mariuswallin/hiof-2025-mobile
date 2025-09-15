import { FlatList, TextInput, View } from "react-native";
import Button from "./Button";
import { StudentCard } from "./StudentCard";
import StudentItem, { type Student } from "./StudentItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export default function StudentList({
  students,
  filterStudents,
}: {
  students: Student[];
  filterStudents: (query: string) => void;
}) {
  const [filter, setFilter] = useState("");

  const handleStudentFilter = (query: string) => {
    setFilter(query);
    filterStudents(query);
  };

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left,
      }}
    >
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: "90%",
        }}
        onChangeText={handleStudentFilter}
        value={filter}
        placeholder="Søk etter student"
        keyboardType="default"
      />
      <FlatList
        data={students}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <StudentCard>
            <Button onPress={() => console.log(item)}>
              <StudentItem student={item} />
            </Button>
          </StudentCard>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
