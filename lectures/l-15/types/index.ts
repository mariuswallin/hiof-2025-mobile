// types/index.ts

import { z } from "zod";

export type Theme = {
	primary: string;
	secondary: string;
	text: string;
	background: string;
};

export const StudentSchema = z
	.object({
		// coerce brukes for å konvertere til number
		// og for å håndtere strenger som inneholder tall
		id: z.coerce
			.number()
			.int("ID må være et heltall")
			.min(1000000, "ID må være minst 1000000")
			.max(9999999, "ID må være maks 9999999"),
		name: z.string().min(1, "Navn er påkrevd"),
		program: z.string().min(1, "Program er påkrevd"),
		image: z.string().optional(),
		other: z.string().optional(),
		expireAt: z.string(),
		userId: z.string().optional(),
		isActive: z.boolean(),
	})
	.refine(
		(data) => {
			const other = data.other ?? "";
			const result = data.program === "annet" && other.length === 0;
			return !result;
		},
		{
			message: "Vennligst spesifiser annet program",
			path: ["other"],
		},
	);

// Definerer tilgjengelige roller i systemet som konstanter
export const ROLES = {
	ADMIN: "ADMIN",
	USER: "USER",
} as const;

// Typedefinisjon for roller basert på ROLES-objektet
export type Role = (typeof ROLES)[keyof typeof ROLES];

export const StudentGroupSchema = z.object({
	name: z.string().min(6, { message: "Navn er påkrevd" }),
	slug: z.string().min(6, { message: "Slug er påkrevd" }),
	description: z.string().min(10, { message: "Beskrivelse er påkrevd" }),
	students: z.array(StudentSchema),
});

export const ProfileSchema = z.object({
	email: z.string().email("Ugyldig e-postadresse"),
	userId: z.string().min(1, "Bruker-ID er påkrevd"),
});

export type Profile = z.infer<typeof ProfileSchema>;
// Definerer typen Student basert på Zod-skjemaet
export type Student = z.infer<typeof StudentSchema>;
