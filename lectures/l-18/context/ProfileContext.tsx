// context/ProfileContext.tsx

import type { Profile } from "@/types";
import { createContext, useState, useContext, type ReactNode } from "react";

// Definer typene for contexten
type ProfileContextType = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

// Opprett context med standardverdier
const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  setProfile: () => {},
});

// Props for providern
type ProfileProviderProps = {
  children: ReactNode;
};

// Provider-komponent
export function ProfileProvider({ children }: ProfileProviderProps) {
  // Tilstanden som skal deles
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Hook for å bruke context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  // Returner contexten
  return useContext(ProfileContext);
}
