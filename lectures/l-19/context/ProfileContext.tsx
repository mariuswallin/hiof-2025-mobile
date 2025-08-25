// context/ProfileContext.tsx

import type { Profile } from "@/types";
import { createContext, useState, useContext, type ReactNode } from "react";

// Definer typene for contexten
type ProfileContextType = {
  profile: Profile | undefined;
  setProfile: (profile: Profile | undefined) => void;
};

// Opprett context med standardverdier
const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
  setProfile: () => {},
});

// Props for providern
type ProfileProviderProps = {
  children: ReactNode;
};

// Provider-komponent
export function ProfileProvider({ children }: ProfileProviderProps) {
  // Tilstanden som skal deles
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

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
