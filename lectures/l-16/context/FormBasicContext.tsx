// context/FormBasicContext.tsx

import { createContext, useState, useContext, type ReactNode } from "react";

// Definer typene for contexten
type FormContextType = {
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
};

// Opprett context med standardverdier
const FormContext = createContext<FormContextType>({
  isDirty: false,
  setIsDirty: () => {},
});

// Props for providern
type FormProviderProps = {
  children: ReactNode;
};

// Provider-komponent
export function FormProvider({ children }: FormProviderProps) {
  // Tilstanden som skal deles
  const [isDirty, setIsDirty] = useState(false);

  return (
    <FormContext.Provider value={{ isDirty, setIsDirty }}>
      {children}
    </FormContext.Provider>
  );
}

// Hook for å bruke context
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  // Returner contexten
  return useContext(FormContext);
}
