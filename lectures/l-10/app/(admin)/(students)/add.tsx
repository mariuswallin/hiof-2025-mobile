// app/(admin)/(students)/add.tsx

import CustomView from "../../../components/CustomView";
import { StudentForm } from "../../../components/forms/StudentForm";

import type { Student } from "../../../types";

export default function Add() {
  const createStudent = (student: Student): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulerer en API-kall med setTimeout
      setTimeout(() => {
        console.log("Student data sent to API:", student);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <CustomView safeArea className="flex-1">
      <StudentForm onSubmit={createStudent} />
    </CustomView>
  );
}
