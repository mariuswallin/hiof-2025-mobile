// app/(admin)/(students)/add.tsx

import { usePermissions } from "@/hooks/usePermissions";
import { StudentForm } from "../../../components/forms/StudentForm";
import { useIsFocused } from "@react-navigation/native";
import type { Profile, Student } from "../../../types";
import { Redirect, useRouter } from "expo-router";

import ProfileSearch from "@/components/ProfileSearch";

import { useState } from "react";
import { useCreateStudent } from "@/hooks/useStudent";
import { QueryWrapper } from "@/components/shared/QueryWrapper";

export default function Add() {
  const router = useRouter();
  const { hasPermissions, isLoading: isLoadingPermissions } = usePermissions();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const mutation = useCreateStudent();
  const isFocused = useIsFocused();

  if (isLoadingPermissions) return <></>;

  if (!hasPermissions) return <Redirect href={"(zShared)/access"} />;

  if (!isFocused) {
    return null;
  }

  const createStudent = async (student: Student) => {
    const mutationResult = await mutation.mutateAsync(student);
    setProfile(undefined);
    // Naviger til den nye studentens side
    router.push(`/students/${mutationResult.$id}`);
  };

  return (
    <QueryWrapper mutation={mutation}>
      <ProfileSearch
        onProfilePress={(profile) => setProfile(profile)}
        profile={profile}
      >
        {profile ? (
          <StudentForm
            onSubmit={createStudent}
            initialValues={{
              userId: profile.userId,
            }}
          />
        ) : null}
      </ProfileSearch>
    </QueryWrapper>
  );
}
