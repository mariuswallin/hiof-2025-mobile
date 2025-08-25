// app/(admin)/_layout.tsx

import { FormContextReducerProvider } from "@/context/FormContextReducer";
import { Slot } from "expo-router";

export default function AdminGroupLayout() {
  return (
    <FormContextReducerProvider>
      <Slot />
    </FormContextReducerProvider>
  );
}
