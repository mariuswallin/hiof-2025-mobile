// context/AuthProvider.tsx

import { ROLES, type User } from "@/types";

import { createContext, use, useCallback, useEffect, useState } from "react";
import uuid from "react-native-uuid";

// Hjelpefunksjon for å generere unike ID-er
const createId = () => {
  return uuid.v4();
};

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

// Simulert API-kall for å hente bruker
const getUser = async (fail = false, type: "USER" | "ADMIN" = "ADMIN") => {
  return new Promise<{ data: User | null }>((resolve) => {
    // Simulerer nettverksforsinkelse på 1 sekund
    setTimeout(() => {
      if (fail) {
        return resolve({
          data: null,
        });
      }
      resolve(
        type === "ADMIN"
          ? {
              data: {
                id: createId(),
                email: "admin@hiof.no",
                password: "admin",
                role: ROLES.ADMIN,
              },
            }
          : {
              data: {
                id: "123456",
                email: "user@hiof.no",
                password: "user",
                role: ROLES.USER,
              },
            }
      );
    }, 1000);
  });
};

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
    console.log("Fetching user data...");
    const fetchUserdata = async () => {
      setLoading(true);
      try {
        const { data } = await getUser(false, "ADMIN");
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        resetLoading();
      }
    };
    fetchUserdata();
  }, [resetLoading]);

  // Innloggingsfunksjon - simulerer API-kall
  const login = async (email: string, password: string) => {
    // Simulerer en API-kall
    setLoadings();
    console.log("Logging in with email:", email, "and password:", password);
    setTimeout(() => {
      setUser({ id: "123456", email, role: ROLES.USER });
      resetLoading();
    }, 1000);
  };

  // Utloggingsfunksjon - simulerer API-kall
  const logout = async () => {
    setLoadings();
    // Simulerer en API-kall
    setTimeout(() => {
      setUser(null);
      resetLoading();
    }, 1000);
  };

  // Registreringsfunksjon - simulerer API-kall
  const register = async (email: string, password: string, admin = false) => {
    // Simulerer en API-kall
    setLoadings();
    setTimeout(() => {
      setUser({
        id: createId(),
        email,
        role: admin ? ROLES.ADMIN : ROLES.USER,
      });
      resetLoading();
    }, 1000);
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
        login,
        logout,
        register,
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
