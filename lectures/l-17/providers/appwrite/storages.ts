// providers/appwrite/storages.ts

import { AppwriteException, ID } from "react-native-appwrite";
import { storages } from ".";
import type { Result } from "./types";
import { asyncWrapper } from "./lib";

import { prepareFile, type StorageFile } from "@/utils/file";

const BUCKET_ID = "images";

export const uploadImage = async (
	file: StorageFile,
): Promise<Result<string>> => {
	return asyncWrapper(async () => {
		const maxSize = 2 * 1024 * 1024;
		const allowedTypes = ["image/jpeg", "image/png"];

		if (file.size > maxSize) {
			throw new AppwriteException(
				`Filen er for stor. Max størrelse: ${maxSize / 1024 / 1024}MB`,
			);
		}
		if (!allowedTypes.includes(file.type)) {
			throw new AppwriteException(
				`Filtype ikke tillatt. Tillatte typer: ${allowedTypes.join(", ")}`,
			);
		}

		const response = await storages.createFile(BUCKET_ID, ID.unique(), file);

		const fileViewResult = await getImageHref(response.$id);

		if (!fileViewResult.success) return fileViewResult.error;

		return fileViewResult.data;
	});
};

export const getImageHref = async (fileId: string): Promise<Result<string>> => {
	return asyncWrapper(async () => {
		const response = await storages.getFileView(BUCKET_ID, fileId);
		return response.href;
	});
};

export const handleFileUpload = async (uri?: string | null) => {
	return asyncWrapper(async () => {
		if (!uri) {
			throw new AppwriteException("Ingen fil valgt");
		}
		const preparedFile = await prepareFile(uri);

		if (!preparedFile.success) return preparedFile;

		const { data: file } = preparedFile;

		const uploadResult = await uploadImage(file);

		if (!uploadResult.success) {
			return uploadResult;
		}

		return uploadResult.data;
	});
};
