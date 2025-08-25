// app/(admin)/(students)/back.tsx

import { Redirect } from "expo-router";

export default function Back() {
  // Redirect tilbake til forsiden
  // Trenger denne da vi ikke har noen navigasjonsbar
  return <Redirect href="/" />;
}
