// constants/students.ts

import type { Student } from "../types";

export const Students: Student[] = [
	{
		id: 123456,
		name: "Lars Larsen",
		program: "informatikk",
		expireAt: "2025-12-31",
		userId: "123456",
		isActive: true,
	},
	{
		id: 654321,
		name: "Sara Hansen",
		program: "informatikk",
		expireAt: "2025-12-31",
		userId: "654321",
		isActive: false,
	},
	{
		id: 789012,
		name: "Ali Khan",
		program: "informatikk",
		expireAt: "2025-12-31",
		userId: "789012",
		isActive: true,
	},
];

// Mock data - genererer 50 studenter
const tempStudents: Student[] = Array.from({ length: 50 }, (_, index) => {
	const id = 1000000 + index;
	const programs = [
		"Informatikk",
		"Dataingeniør",
		"Kybernetikk",
		"Digital markedsføring",
		"Kunstig intelligens",
	];
	const program = programs[Math.floor(Math.random() * programs.length)];

	return {
		id,
		name: `Student ${id}`,
		program,
		expireAt: new Date(Date.now() + 31536000000).toISOString(), // Ett år frem i tid
		userId: `user_${Math.floor(1000 + Math.random() * 9000)}`,
		isActive: Math.random() > 0.1, // 90% sjanse for at studenten er aktiv
	};
});

/**
 * Mock funksjon for cursor paginering
 *
 * @param pageParam Cursor for paginering (ID til siste student)
 * @returns Response med studenter og neste cursor
 */
export const getStudentsWithCursorMock = async (
	pageParam: string | null,
): Promise<{
	success: boolean;
	data: { students: Student[]; nextCursor: number | null };
	error?: string;
}> => {
	// Simuler nettverksforsinkelse (500ms)
	await new Promise((resolve) => setTimeout(resolve, 500));

	try {
		// Finn startindeks basert på cursor
		let startIndex = 0;
		if (pageParam !== null) {
			const cursorIndex = tempStudents.findIndex(
				(student) => student.id === Number(pageParam),
			);
			startIndex = cursorIndex !== -1 ? cursorIndex + 1 : 0;
		}

		// Hent neste sett med studenter (10 per side)
		const limit = 10;
		const endIndex = Math.min(startIndex + limit, tempStudents.length);
		const students = tempStudents.slice(startIndex, endIndex);

		// Bestem neste cursor
		const hasMoreData = endIndex < tempStudents.length;
		const nextCursor = hasMoreData ? students[students.length - 1].id : null;

		return {
			success: true,
			data: {
				students,
				nextCursor,
			},
		};
	} catch (error) {
		return {
			success: false,
			data: { students: [], nextCursor: null },
			error: error instanceof Error ? error.message : "Ukjent feil",
		};
	}
};
