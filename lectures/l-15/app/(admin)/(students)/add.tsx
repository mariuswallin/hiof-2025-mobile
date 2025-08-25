// app/(admin)/(students)/add.tsx

import { usePermissions } from "@/hooks/usePermissions";
import { StudentForm } from "../../../components/forms/StudentForm";
import { useIsFocused } from "@react-navigation/native";
import type { Profile, Student } from "../../../types";
import { Redirect } from "expo-router";

import ProfileSearch from "@/components/ProfileSearch";

import { useState } from "react";

export default function Add() {
  const { hasPermissions, isLoading } = usePermissions();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const isFocused = useIsFocused();

  if (isLoading) return <></>;

  if (!hasPermissions) return <Redirect href={"(zShared)/access"} />;

  const createStudent = (student: Student): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Student data sent to API:", student);
        setProfile(undefined);
        resolve(true);
      }, 2000);
    });
  };

  if (!isFocused) {
    return null;
  }

  return (
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
  );
}
