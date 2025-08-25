// utils/file.ts

// ! WARN: Denne kunne vi flyttet til utils for å unngå å ha den "låst" til providers
import { asyncWrapper } from "@/providers/appwrite/lib";
// Kunne brukt /next versjonen men får ikke testet den på en enkel måte
// med kamera eller filopplasting
import * as FileSystem from "expo-file-system";
import { z } from "zod";

const FileSchema = z.object({
	name: z.string(),
	type: z.string(),
	size: z.number(),
	uri: z.string(),
});

export type StorageFile = z.infer<typeof FileSchema>;

export const prepareFile = async (uri: string, name?: string) => {
	return asyncWrapper(async () => {
		const file = await FileSystem.getInfoAsync(uri, {
			size: true,
		});

		if (!file.exists) {
			throw new Error("Filen eksisterer ikke");
		}

		const type = file.uri.split(".").pop();

		const mimeTypeMapping: Record<string, string> = {
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
			png: "image/png",
		};

		return FileSchema.parse({
			...file,
			name: name || file.uri.split("/").pop() || `student-${Date.now()}`,
			type: type ? mimeTypeMapping[type] : undefined,
		});
	});
};
