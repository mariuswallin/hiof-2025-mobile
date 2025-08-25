// app/(admin)/(student)/students/[id]/back.tsx

import { Redirect } from "expo-router";

export default function Back() {
  // Redirect tilbake til studentent listen
  // Trenger denne da vi ikke har noen navigasjonsbar
  return <Redirect href="/students" />;
}
