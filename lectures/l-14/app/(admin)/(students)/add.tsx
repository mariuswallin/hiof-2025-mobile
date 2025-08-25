// app/(admin)/(students)/add.tsx

import { usePermissions } from "@/hooks/usePermissions";
import { StudentForm } from "../../../components/forms/StudentForm";
import { useIsFocused } from "@react-navigation/native";
import type { Student } from "../../../types";
import { Redirect } from "expo-router";
import Admin from "@/components/auth/Admin";
import Authenticated from "@/components/auth/Authenticated";

// import { hash } from "ohash"; // Ikke i bruk, men kan være nyttig for å tvinge rerender

export default function Add() {
  // Bruker eget hook for å sjekke om brukeren har tilgang
  const { hasPermissions, isLoading } = usePermissions();
  const isFocused = useIsFocused();

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

  // Hvis skjermen ikke er fokusert, så returnerer vi null
  // Dette sikrer at skjema nulles når vi navigerer bort fra skjermen
  // Ellers lever felt skjema staten videre som kan gi bugs
  if (!isFocused) {
    return null;
  }

  return (
    // <Authenticated>
    <StudentForm
      //key={hash(formData)} // Alternativ måte å tvinge rerender
      onSubmit={createStudent}
    />
    // </Authenticated>
  );
}
