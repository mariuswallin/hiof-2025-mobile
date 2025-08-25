// app/(admin)/(students)/add.tsx

import CustomView from "../../../components/CustomView";
import { StudentForm } from "../../../components/forms/StudentForm";
import StudentFormWithIndividualState from "../../../components/forms/StudentFormWithIndividualState";
import StudentFormWithObjectState from "../../../components/forms/StudentFormWithObjectState";
import StudentFormWithTanStack from "../../../components/forms/StudentFormWithTanstack";
import StudentFormWithZod from "../../../components/forms/StudentFormWithTanstackZod";
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
    <CustomView safeArea style={{ flex: 1 }}>
      {/* <StudentFormWithIndividualState /> */}
      {/* <StudentFormWithObjectState /> */}
      {/* <StudentFormWithTanStack /> */}
      {/* <StudentFormWithZod /> */}
      <StudentForm onSubmit={createStudent} />
    </CustomView>
  );
}
