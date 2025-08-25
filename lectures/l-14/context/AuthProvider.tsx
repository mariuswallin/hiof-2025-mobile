// context/AuthProvider.tsx

import {
  type User,
  signUpAndLogin,
  loginAndGetUser,
  logout,
  getUserWithRole,
} from "@/providers/appwrite/auth";
import { ROLES } from "@/types";

import { createContext, use, useCallback, useEffect, useState } from "react";

// Definerer form og innhold på autentiseringskonteksten
type AuthContextType = {
  user: User | null; // Gjeldende bruker eller null hvis ikke logget inn
  isLoading: boolean; // Indikerer om autentisering pågår
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, admin: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean; // Bekvemmelighetsverdi for rollesjekk
  isLoggedIn: boolean; // Bekvemmelighetsverdi for innloggingsstatus
  isLoaded: boolean; // Indikerer om innledende brukerdata er lastet
};

// Oppretter konteksten med standardverdier
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAdmin: false,
  isLoggedIn: false,
  isLoaded: false,
});

// Hovedkomponent som gir autentiseringskontekst til barne-komponenter
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for å holde brukerdata og lastestatus
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hjelpefunksjon for å tilbakestille lastestatuser
  const resetLoading = useCallback(() => {
    setLoading(false);
    setIsLoaded(true);
  }, []);

  const setLoadings = useCallback(() => {
    setLoading(true);
    setIsLoaded(false);
  }, []);

  // Henter brukerdata ved oppstart
  useEffect(() => {
    const fetchUserdata = async () => {
      setLoading(true);
      const result = await getUserWithRole();
      setUser(result.success ? result.data : null);
      resetLoading();
    };
    fetchUserdata();
  }, [resetLoading]);

  // Innloggingsfunksjon - simulerer API-kall
  const loginUser = async (email: string, password: string) => {
    setLoadings();
    const result = await loginAndGetUser(email, password);
    setUser(result.success ? result.data : null);
    resetLoading();
  };

  // Utloggingsfunksjon - simulerer API-kall
  const logoutUser = async () => {
    setLoadings();
    await logout();
    setUser(null);
    resetLoading();
  };

  // Registreringsfunksjon - simulerer API-kall
  const registerUser = async (email: string, password: string) => {
    setLoadings();
    const result = await signUpAndLogin(email, password);
    setUser(result.success ? result.data : null);
    resetLoading();
  };

  // Returnerer kontekstprovideren med alle nødvendige verdier
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: loading,
        isAdmin: !!(user?.role === ROLES.ADMIN),
        isLoaded,
        isLoggedIn: !!(user !== null),
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for enkel tilgang til autentiseringskonteksten
export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
