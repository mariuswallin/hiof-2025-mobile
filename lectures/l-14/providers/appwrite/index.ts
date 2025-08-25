// providers/appwrite/index.ts

import { APPWRITE_KEYS } from "@/constants/keys";
import { Client, Account } from "react-native-appwrite";

// Sette opp Appwrite-klienten
// og kontoen for autentisering
export const client = new Client();

client
	.setEndpoint(APPWRITE_KEYS.API_URL) // API Endpoint
	.setProject(APPWRITE_KEYS.PROJECT_ID)
	.setPlatform(APPWRITE_KEYS.PLATFORM_ID);

// Sette opp Appwrite-konto api
export const account = new Account(client);
