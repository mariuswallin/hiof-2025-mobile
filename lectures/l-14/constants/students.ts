// constants/students.ts

import type { Student } from "../types";

export const Students: Student[] = [
	{
		id: 123456,
		name: "Lars Larsen",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Student",
		userId: "123456",
		isActive: true,
	},
	{
		id: 654321,
		name: "Sara Hansen",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Student",
		userId: "654321",
		isActive: false,
	},
	{
		id: 789012,
		name: "Ali Khan",
		program: "informatikk",
		expireAt: "2025-12-31",
		role: "Admin",
		userId: "789012",
		isActive: true,
	},
];
