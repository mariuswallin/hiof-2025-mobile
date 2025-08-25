// providers/appwrite/auth.ts

import { ROLES, type Role } from "@/types";
import { account } from ".";
import { ID, type AppwriteException, type Models } from "react-native-appwrite";

// Utvidet brukertype som inkluderer rolleinformasjon
export type User = Models.User<Models.Preferences> & {
	role: Role;
};
export type Session = Models.Session;

//  Konverterer Appwrite feilkoder til brukervennlige feilmeldinger
//  Standardiserer feilresponser for enklere håndtering i UI

const handleError = (error: AppwriteException): Failure => {
	console.warn("ErrorHandler:", error);
	switch (error.code) {
		case 401:
			return { success: false, error: "Invalid credentials" };
		case 404:
			return { success: false, error: "User not found" };
		case 409:
			return { success: false, error: "Email already in use" };
		default:
			return { success: false, error: "An unknown error occurred" };
	}
};

// Hjelpefunksjon for å hente brukerrolle fra preferanser
// Sjekker om en gyldig rolle eksisterer i brukerpreferanser
// Returnerer standardrollen USER hvis ingen gyldig rolle finnes
const extractRole = (prefs: Models.Preferences): Role => {
	if (prefs?.role && Object.keys(ROLES).includes(prefs.role)) {
		return prefs.role as Role;
	}
	return ROLES.USER;
};

// Hjelpefunksjon for å håndtere vellykkede API-responser
// Pakker inn vellykket API-respons i et standardisert Success-objekt
const handleResponse = <T>(response: T): Success<T> => {
	console.log("ResponseHandler:", response);
	return { success: true, data: response };
};

// Typedefinisjon for vellykket respons
// Bruker generisk type for å støtte ulike datatyper
type Success<T> = {
	success: true;
	data: T;
};

// Typedefinisjon for mislykket respons
type Failure = {
	success: false;
	error: string;
};

// Union type for å representere enten vellykket eller mislykket operasjon
// Dette er et eksempel på "diskriminert union" mønster i TypeScript
// som lar oss sjekke success-feltet for å avgjøre hvilken type vi har
export type Result<T> = Success<T> | Failure;

// Logg inn bruker med e-post og passord
// Bruker Promise-kjeding (.then/.catch) for å håndtere resultat og feil
export const login = (email: string, password: string) =>
	account
		.createEmailPasswordSession(email, password)
		.then(handleResponse)
		.catch(handleError);

// Registrer ny bruker
export const register = (email: string, password: string) =>
	account
		.create(ID.unique(), email, password)
		.then(handleResponse)
		.catch(handleError);

// Logg ut bruker (avslutter gjeldende sesjon)
export const logout = () =>
	account.deleteSession("current").then(handleResponse).catch(handleError);

// Hent brukerinformasjon for pålogget bruker
export const getUser = () =>
	account.get().then(handleResponse).catch(handleError);

// Hent kun brukerrolle for pålogget bruker
export const getUserRole = (): Promise<Result<Role>> =>
	account.getPrefs().then(extractRole).then(handleResponse).catch(handleError);

// Hent brukerinformasjon med rolle for pålogget bruker
// Bruker Promise.all for å kjøre to API-kall parallelt (mer effektivt)
// og deretter kombinere resultatene
export const getUserWithRole = async () => {
	const result = await Promise.all([getUser(), getUserRole()]);
	const [user, role] = result;
	if (user.success) {
		return {
			success: true,
			data: {
				...user.data,
				role: role.success ? role.data : ROLES.USER,
			},
		} as Success<User>;
	}

	return user;
};

// Kombiner innlogging og henting av brukerinformasjon
// Eksempel på sammensatt operasjon med sekvensiell flyt
export const loginAndGetUser = async (email: string, password: string) => {
	const loginResult = await login(email, password);
	if (!loginResult.success) {
		return loginResult;
	}
	return getUserWithRole();
};

// Registrer ny bruker og logg inn i samme operasjon
// For å sette opp en ny bruker og umiddelbart logge inn
export const signUpAndLogin = async (email: string, password: string) => {
	const registerResult = await register(email, password);
	if (!registerResult.success) {
		return registerResult;
	}

	return loginAndGetUser(email, password);
};
