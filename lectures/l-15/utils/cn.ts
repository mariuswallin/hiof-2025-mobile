// utils/cn.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tar inn en liste med className-strenger og slår dem sammen
export function cn(...inputs: ClassValue[]) {
	// Bruker twMerge for å håndtere Tailwind CSS-klasser og clsx for å håndtere betingede klasser
	// twMerge fjerner dupliserte klasser og håndterer Tailwind CSS-spesifikasjoner
	// clsx håndterer betingede klasser og slår dem sammen
	return twMerge(clsx(inputs));
}
