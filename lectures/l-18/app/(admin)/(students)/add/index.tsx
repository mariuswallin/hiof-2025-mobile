// app/(admin)/(students)/add.tsx

import { usePermissions } from "@/hooks/usePermissions";
import { StudentForm } from "@/components/forms/StudentForm";
import { useIsFocused } from "@react-navigation/native";
import type { Student } from "@/types";
import { Redirect, useRouter } from "expo-router";

import ProfileSearch from "@/components/ProfileSearch";

import { useCreateStudent } from "@/hooks/useStudent";
import { QueryWrapper } from "@/components/shared/QueryWrapper";

export default function Add() {
  const router = useRouter();
  const { hasPermissions, isLoading: isLoadingPermissions } = usePermissions();

  const mutation = useCreateStudent();
  const isFocused = useIsFocused();

  if (isLoadingPermissions) return <></>;

  if (!hasPermissions) return <Redirect href={"(zShared)/access"} />;

  if (!isFocused) {
    return null;
  }

  console.log("Rerendering Add with profile:");

  const createStudent = async (student: Student) => {
    const mutationResult = await mutation.mutateAsync(student);
    // Naviger til den nye studentens side
    router.push(`/students/${mutationResult.$id}`);
  };

  return (
    <QueryWrapper mutation={mutation}>
      <ProfileSearch>
        <StudentForm onSubmit={createStudent} />
      </ProfileSearch>
    </QueryWrapper>
  );
}
