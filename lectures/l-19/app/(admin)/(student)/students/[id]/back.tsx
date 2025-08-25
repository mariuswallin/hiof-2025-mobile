// app/(admin)/(student)/students/[id]/back.tsx

import { Redirect } from "expo-router";

export default function Back() {
  return <Redirect href="/list" />;
}
