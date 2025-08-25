// app/(admin)/(student)/students/[id]/edit.tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";
import CustomView from "@/components/CustomView";

import { useStudentById, useUpdateStudent } from "@/hooks/useStudent";
import { StudentForm } from "@/components/forms/StudentForm";
import type { Student } from "@/types";
import Loading from "@/components/shared/Loading";
import ErrorComp from "@/components/shared/Error";
import { useIsFocused } from "@react-navigation/core";

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  // Henter ut nødvendige tilstander og data
  const { data: student, isPending, error, isError } = useStudentById(id);
  const isFocused = useIsFocused();

  const mutation = useUpdateStudent(id);

  const handleUpdateStudent = async (values: Student) => {
    try {
      // Bruker async metode for å kunne respondere med true/false
      // til skjemaet slik skjema forventer
      // basert på hvordan vi laget det i starten
      const result = await mutation.mutateAsync({ data: values });
      router.push(`/students/${result.$id}`);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
    }
  };

  if (!isFocused) {
    return null;
  }

  // Sjekker om vi endrer eller henter student
  if (isPending || mutation.isPending) {
    return <Loading />;
  }

  if (isError || mutation.isError) {
    return <ErrorComp message={error?.message || mutation.error?.message} />;
  }

  if (!student) {
    return (
      <CustomView safeArea className="flex-1">
        <Text>Fant ikke studenten med {id}</Text>
      </CustomView>
    );
  }

  // Må ha ScrollView for å kunne scrolle
  // Sender med student som initialValues
  // slik at vi kan redigere den
  return (
    <ScrollView className="flex-1 h-full">
      <StudentForm
        initialValues={student}
        onSubmit={handleUpdateStudent}
        mode="edit"
      />
    </ScrollView>
  );
}
