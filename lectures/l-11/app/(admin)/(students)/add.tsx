// app/(admin)/(students)/add.tsx

import { usePermissions } from "@/hooks/usePermissions";
import { StudentForm } from "../../../components/forms/StudentForm";

import type { Student } from "../../../types";
import { Redirect } from "expo-router";

export default function Add() {
  // Bruker eget hook for å sjekke om brukeren har tilgang
  const { hasPermissions, isLoading } = usePermissions();

  // Hvis vi ikke har fått sjekket tillatelse, vises en tom skjerm
  if (isLoading) return <></>;

  // Hvis vi ikke har tillatelse, så navigerer vi til access-skjermen
  if (!hasPermissions) return <Redirect href={"(zShared)/access"} />;

  const createStudent = (student: Student): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Student data sent to API:", student);
        resolve(true);
      }, 2000);
    });
  };

  return <StudentForm onSubmit={createStudent} />;
}
