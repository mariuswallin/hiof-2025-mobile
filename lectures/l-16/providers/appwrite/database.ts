// providers/appwrite/database.ts

import { databases } from ".";
import { ID, Query, AppwriteException } from "react-native-appwrite";
import { APPWRITE_KEYS } from "@/constants/keys";
import type { Failure, Result, Success } from "./types";
import {
	ProfileSchema,
	StudentSchema,
	type Profile,
	type Student,
	type StudentWithId,
} from "@/types";
import { ZodError } from "zod";
import { getStudentsWithCursorMock } from "@/constants/students";

// Konstanter for database og ulike collections
const { DATABASE_ID, STUDENT_COLLECTION_ID, PROFILE_COLLECTION_ID } =
	APPWRITE_KEYS;

/**
 * Generisk hjelpefunksjon for å håndtere feil
 */
const handleError = (error: unknown): Failure => {
	if (error instanceof AppwriteException) {
		console.warn("Appwrite Error:", error);
		const message = error.message || "En ukjent feil oppstod";
		switch (error.code) {
			case 400:
				return { success: false, error: "Ugyldige data" };
			case 401:
				return { success: false, error: "Ikke tilgang" };
			case 404:
				return { success: false, error: "Ikke funnet" };
			case 409:
				return { success: false, error: "E-postadressen er allerede i bruk" };
			case 500:
				return { success: false, error: "Serverfeil" };
			default:
				return { success: false, error: message };
		}
	}
	if (error instanceof ZodError) {
		console.warn("Validation Error:", error);
		return {
			success: false,
			error: error.message || "En ukjent feil oppstod",
		};
	}

	return {
		success: false,
		error: error instanceof Error ? error.message : "En ukjent feil oppstod",
	};
};

/**
 * Hjelpefunksjon for å håndtere vellykkede API-responser
 */
const handleResponse = <T>(response: T): Success<T> => {
	return { success: true, data: response };
};

/**
 * Wrapper for async operasjoner med feilhåndtering
 */
const asyncWrapper = async <T>(
	operation: () => Promise<T>,
): Promise<Result<T>> => {
	try {
		const response = await operation();
		return handleResponse(response);
	} catch (error: unknown) {
		return handleError(error);
	}
};

/**
 * Sjekke om en profil eksisterer
 */
export const profileExists = async (
	email: string,
): Promise<Result<boolean>> => {
	return asyncWrapper(async () => {
		const response = await databases.listDocuments(
			DATABASE_ID,
			PROFILE_COLLECTION_ID,
			[Query.equal("email", email)],
		);
		return response.total > 0;
	});
};

/**
 * Opprette en ny profil
 */
export const createProfile = async (profile: {
	email: string;
	userId: string;
}): Promise<Result<Profile | Failure>> => {
	return asyncWrapper(async () => {
		const parsedProfile = ProfileSchema.parse(profile);
		const profileExistsResult = await profileExists(parsedProfile.email);

		if (profileExistsResult.success && profileExistsResult.data) {
			throw new AppwriteException("Profile already exists", 409);
		}

		const response = await databases.createDocument(
			DATABASE_ID,
			PROFILE_COLLECTION_ID,
			ID.unique(),
			profile,
		);
		return ProfileSchema.parseAsync(response);
	});
};

/**
 * Søke etter en profil basert på e-post
 */
export const getProfileByEmail = async (
	email: string,
): Promise<Result<Profile[]>> => {
	return asyncWrapper(async () => {
		const students = await getStudents();
		const response = await databases.listDocuments(
			DATABASE_ID,
			PROFILE_COLLECTION_ID,
			[Query.startsWith("email", email), Query.limit(10)],
		);

		let allowedProfiles = response.documents;

		if (students.success && students.data.length > 0) {
			allowedProfiles = allowedProfiles.filter((profile) => {
				// Bruker every for å sjekke at ingen studenter har
				// knytning til en profil
				const profileNotUsed = students.data.every(
					(student) => student.userId !== profile.userId,
				);
				return profileNotUsed;
			});
		}

		return await Promise.all(
			allowedProfiles.map((profile) => ProfileSchema.parseAsync(profile)),
		);
	});
};

/**
 * Hent studenter med cursor paginering
 */
export const getStudentsWithCursor = async (
	pageParam: string,
	testing = false,
): Promise<
	Result<{ students: StudentWithId[]; nextCursor: string | null }>
> => {
	if (testing) {
		return getStudentsWithCursorMock(pageParam);
	}
	return asyncWrapper(async () => {
		const query = pageParam
			? [Query.limit(10), Query.cursorAfter(pageParam)]
			: [Query.limit(10)];

		const response = await databases.listDocuments(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			query,
		);

		const errors: string[] = [];

		// Må validere dataen samt hente ut ID-en til studentene
		// for å bruke den som cursor
		const students = response.documents
			.map((student) => {
				const parsedStudent = StudentSchema.safeParse(student);
				if (!parsedStudent.success) {
					errors.push(parsedStudent.error.message);
					return null;
				}
				return { ...parsedStudent.data, $id: student.$id };
			})
			.filter(Boolean) as StudentWithId[];

		// Hvis det er noen valideringsfeil, logg dem og kast en AppwriteException
		if (errors.length > 0) {
			console.warn("Validation errors:", errors);
			throw new AppwriteException(
				"Validation errors occurred while processing students",
				400,
			);
		}

		// Hent ID til den siste studenten for å bruke som cursor
		const nextCursor =
			students.length > 0 ? students[students.length - 1].$id : null;

		return {
			students,
			nextCursor,
		};
	});
};

/**
 * Hent alle studenter
 */
export const getStudents = async (filter?: { isActive: boolean }): Promise<
	Result<Student[]>
> => {
	return asyncWrapper(async () => {
		const response = await databases.listDocuments(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			[
				Query.limit(100),
				Query.orderDesc("$createdAt"),
				Query.equal("isActive", filter?.isActive ?? true),
			],
		);

		return await Promise.all(
			response.documents.map((student) => StudentSchema.parseAsync(student)),
		);
	});
};

/**
 * Hent én student basert på ID
 */
export const getStudent = async (id: string): Promise<Result<Student>> => {
	return asyncWrapper(async () => {
		const response = await databases.getDocument(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			id,
		);
		return await StudentSchema.parseAsync(response);
	});
};

/**
 * Hent studenter for en bestemt bruker
 */
export const getStudentIdByUser = async (
	userId: string,
): Promise<Result<Student>> => {
	return asyncWrapper(async () => {
		const response = await databases.listDocuments(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			[Query.equal("userId", userId)],
		);

		const students = await Promise.all(
			response.documents.map((student) => StudentSchema.parseAsync(student)),
		);

		// Hvis det ikke finnes noen studenter, kast en AppwriteException
		// Ellers feiler UI
		if (students.length === 0) {
			throw new AppwriteException("Student not found", 404);
		}

		return students[0];
	});
};

/**
 * Opprett en ny student
 */
export const createStudent = async (
	student: Student,
): Promise<Result<StudentWithId>> => {
	const parsedStudent = StudentSchema.parse(student);
	const userId = parsedStudent.userId;

	if (!userId) {
		throw new AppwriteException("User ID is required", 400);
	}

	return asyncWrapper(async () => {
		const response = await databases.createDocument(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			ID.unique(),
			parsedStudent,
		);

		const parsedResponseStudent = await StudentSchema.safeParseAsync(response);
		if (!parsedResponseStudent.success) {
			throw new AppwriteException("Failed to parse student", 400);
		}

		// Sender med ID-en til studenten for å kunne redirecte
		// til student siden etter opprettelse
		return {
			...parsedResponseStudent.data,
			$id: response.$id,
		} as StudentWithId;
	});
};

/**
 * Oppdater en eksisterende student
 */
export const updateStudent = async (
	id: string,
	student: Partial<Student>,
): Promise<Result<Student>> => {
	return asyncWrapper(async () => {
		const response = await databases.updateDocument(
			DATABASE_ID,
			STUDENT_COLLECTION_ID,
			id,
			student,
		);

		return StudentSchema.parse(response);
	});
};

/**
 * Slett en student
 */
export const deleteStudent = async (id: string): Promise<Result<boolean>> => {
	return asyncWrapper(async () => {
		await databases.deleteDocument(DATABASE_ID, STUDENT_COLLECTION_ID, id);
		return true;
	});
};
