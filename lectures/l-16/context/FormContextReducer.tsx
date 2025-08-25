// ./context/FormContextReducer.tsx

import type { Student } from "@/types";
import { createContext, useReducer, useContext, type ReactNode } from "react";

type FormStatus = "initial" | "dirty";

// Definer tilstandstypen
type FormState = {
  status: FormStatus;
  data: Student | null; // Her kan vi definere en mer spesifikk type for skjemadataene
};

// Definer handlingstyper
// Vi bruker en konstant for å unngå feil ved å bruke strenger direkte
// Dette kan være nyttig for å unngå stavefeil og gjøre koden mer robust
// og lettere å vedlikeholde
const FORM_ACTION = {
  SET_DIRTY: "SET_DIRTY",
  UPDATE_FORM_DATA: "UPDATE_FORM_DATA",
  RESET_FORM: "RESET_FORM",
} as const;

type FormActionType = (typeof FORM_ACTION)[keyof typeof FORM_ACTION];

// Definer handlingstyper med payload
// Vi bruker en unionstype for å definere de forskjellige handlingene
// og deres tilhørende payload
type FormAction =
  | { type: typeof FORM_ACTION.SET_DIRTY }
  | { type: typeof FORM_ACTION.UPDATE_FORM_DATA; payload: Student }
  | { type: typeof FORM_ACTION.RESET_FORM };

// Initialverdier
const initialState: FormState = {
  status: "initial",
  data: null,
};

// Reducer-funksjon
function formReducer(state: FormState, action: FormAction): FormState {
  // Håndterer forskjellige handlinger basert på action.type
  // Vi bruker en switch-setning for å håndtere forskjellige handlinger
  // og oppdatere tilstanden deretter
  switch (action.type) {
    case FORM_ACTION.SET_DIRTY:
      return { ...state, status: "dirty" };
    case FORM_ACTION.UPDATE_FORM_DATA:
      return {
        ...state,
        data: { ...(state.data ?? {}), ...action.payload },
        status: "dirty",
      };
    case FORM_ACTION.RESET_FORM:
      return initialState; // Tilbakestill til initialverdier
    default:
      return state;
  }
}

// Definer context type som inkluderer reducer-funksjoner
type FormContextType = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

// Opprett context
const FormContext = createContext<FormContextType>({
  state: initialState,
  dispatch: () => null,
});

// Provider-komponent
export function FormContextReducerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
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
