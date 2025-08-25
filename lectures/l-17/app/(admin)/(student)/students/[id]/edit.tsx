// app/(admin)/(student)/students/[id]/edit.tsx

import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import CustomView from "@/components/CustomView";

import { useStudentById, useUpdateStudent } from "@/hooks/useStudent";
import { StudentForm } from "@/components/forms/StudentForm";
import type { Student } from "@/types";
import Loading from "@/components/shared/Loading";
import ErrorComp from "@/components/shared/Error";

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Henter ut nødvendige tilstander og data
  const { data: student, isPending, error, isError } = useStudentById(id);
  const mutation = useUpdateStudent(id);

  const handleUpdateStudent = async (values: Student) => {
    try {
      // Bruker async metode for å kunne respondere med true/false
      // til skjemaet slik skjema forventer
      // basert på hvordan vi laget det i starten
      const result = await mutation.mutateAsync({ data: values });
      console.log(result);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      console.log("done");
    }
  };

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
      <StudentForm initialValues={student} onSubmit={handleUpdateStudent} />
    </ScrollView>
  );
}
