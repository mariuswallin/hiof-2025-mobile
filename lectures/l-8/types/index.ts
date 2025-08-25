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
		id: z.string().min(1, "Student ID er påkrevd"),
		name: z.string().min(1, "Navn er påkrevd"),
		program: z.string().min(1, "Program er påkrevd"),
		other: z.string().optional(),
		expireAt: z.string(),
		role: z.string().min(1, "Rolle er påkrevd"),
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

// Definerer typen Student basert på Zod-skjemaet
export type Student = z.infer<typeof StudentSchema>;
