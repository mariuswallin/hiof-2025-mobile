// Typedefinisjon for vellykket respons
// Bruker generisk type for å støtte ulike datatyper
export type Success<T> = {
	success: true;
	data: T;
};

// Typedefinisjon for mislykket respons
export type Failure = {
	success: false;
	error: string;
};

// Union type for å representere enten vellykket eller mislykket operasjon
// Dette er et eksempel på "diskriminert union" mønster i TypeScript
// som lar oss sjekke success-feltet for å avgjøre hvilken type vi har
export type Result<T> = Success<T> | Failure;
