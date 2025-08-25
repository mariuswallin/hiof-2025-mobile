// app/(admin)/(student)/students/[id]/index.tsx

import { Link, Stack, useLocalSearchParams, router } from "expo-router";
import { Pressable, Text } from "react-native";
import CustomView from "../../../../../components/CustomView";
import StudentID from "../../../../../components/StudentID";
import { Students } from "../../../../../constants/students";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../../../constants/theme";

export default function View() {
  const { id } = useLocalSearchParams();

  const student = Students.find((student) => `${student.id}` === id);
  if (!student) {
    return (
      <CustomView safeArea className="flex-1">
        <Text>Student not found</Text>
      </CustomView>
    );
  }

  return (
    <CustomView safeArea className="flex-1">
      {/* Legger til en navigasjonsbar for å navigere til modalen */}
      <Stack.Screen
        options={{
          title: `${student.name}`,
          headerRight: () => (
            // Bruker en link for å navigere til modalen
            // asChild sender linkens props til Pressable
            // slik at den oppfører seg som en vanlig knapp
            // men likevel navigerer til modalen
            // id sendes med som query parameter
            // slik at modalen kan bruke den til å hente studenten
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
