// providers/appwrite/lib.ts

import { AppwriteException } from "react-native-appwrite";
import type { Failure, Result, Success } from "./types";
import { ZodError } from "zod";

/**
 * Generisk hjelpefunksjon for å håndtere feil
 */
export const handleError = (error: unknown): Failure => {
	if (error instanceof AppwriteException) {
		//console.warn("Appwrite Error:", error);
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
		//console.warn("Validation Error:", error);
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
export const handleResponse = <T>(response: T): Success<T> => {
	return { success: true, data: response };
};

/**
 * Wrapper for async operasjoner med feilhåndtering
 */
export const asyncWrapper = async <T>(
	operation: () => Promise<T>,
): Promise<Result<T>> => {
	try {
		const response = await operation();
		return handleResponse(response);
	} catch (error: unknown) {
		return handleError(error);
	}
};
