import { FlatList, Text, View } from "react-native";
import Button from "./Button";
import { StudentCard } from "./StudentCard";
import StudentItem, { type Student } from "./StudentItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StudentList({ students }: { students: Student[] }) {
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
      <FlatList
        data={students}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <StudentCard>
            <Button onPress={() => console.log(item)}>
              <Text>Studentdata</Text>
              <StudentItem student={item} />
            </Button>
          </StudentCard>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10 }}>
            <Text>----</Text>
          </View>
        )}
      />
    </View>
  );
}
