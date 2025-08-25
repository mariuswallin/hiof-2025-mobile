// app/(admin)/(student)/students/[id]/index.tsx

import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import CustomView from "../../../../../components/CustomView";
import StudentID from "../../../../../components/StudentID";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../../../constants/theme";
import { useStudentById } from "@/hooks/useStudent";
import Loading from "@/components/shared/Loading";
import ErrorComp from "@/components/shared/Error";

export default function View() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Henter ut nødvendige tilstander og data
  const { data: student, isError, isPending, error } = useStudentById(id);

  // Sjekker om vi henter student
  if (isPending) {
    return <Loading />;
  }

  // Sjekker om det er en feil
  if (isError) {
    return <ErrorComp message={error?.message} />;
  }

  // Sjekker om student finnes
  if (!student) {
    return (
      <CustomView safeArea className="flex-1">
        <Text>Fant ikke studenten med {id}</Text>
      </CustomView>
    );
  }

  return (
    <CustomView safeArea className="flex-1">
      <Stack.Screen
        options={{
          title: `${student.name}`,
          headerRight: () => (
            <Link href={`/(modals)/remove-student?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="trash"
                    size={25}
                    color={Theme.danger}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <StudentID student={student} />
    </CustomView>
  );
}
