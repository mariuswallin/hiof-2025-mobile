import type { Student } from "../types";

export const Students: Student[] = [
	{
		id: "123456",
		name: "Lars Larsen",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Student",
		isActive: true,
	},
	{
		id: "654321",
		name: "Sara Hansen",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Student",
		isActive: false,
	},
	{
		id: "789012",
		name: "Ali Khan",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Admin",
		isActive: true,
	},
];
