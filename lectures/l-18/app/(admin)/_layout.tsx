// app/(admin)/_layout.tsx

import { FormContextReducerProvider } from "@/context/FormContextReducer";
import { ProfileProvider } from "@/context/ProfileContext";
import { Slot } from "expo-router";

export default function AdminGroupLayout() {
  console.log("Rerendering AdminGroupLayout");
  return (
    <ProfileProvider>
      <FormContextReducerProvider>
        <Slot />
      </FormContextReducerProvider>
    </ProfileProvider>
  );
}
