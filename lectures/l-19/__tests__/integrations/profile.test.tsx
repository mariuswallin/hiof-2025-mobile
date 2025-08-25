// __tests__/components/ProfileSearch.test.js

import "@/msw.polyfills";
import React from "react";
import {
  render,
  screen,
  waitFor,
  userEvent,
} from "@testing-library/react-native";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/native";
import { Text } from "react-native";

import ProfileSearch from "../../components/ProfileSearch";
import { ProfileProvider } from "@/context/ProfileContext";
import type { Profile, Student } from "@/types";

// === OPPSETT AV MOCK-SERVER ===
// MSW (Mock Service Worker) lar oss simulere API-kall i testene
const server = setupServer();

// === MOCK-FUNKSJONER ===
// Vi mocker expo-router funksjoner slik at vi kan kontrollere URL-parametere
const mockOnProfilePress = jest.fn();
const mockSetParams = jest.fn();
const mockUseLocalSearchParams = jest.fn();

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  router: {
    setParams: jest.fn((params) => mockSetParams(params)),
  },
  useLocalSearchParams: jest.fn(() => mockUseLocalSearchParams()),
}));

// === HJELPEFUNKSJONER ===

/**
 * Hjelpefunksjon for å sette opp API-mock som returnerer profiler
 */
function setupProfilesApiMock(
  profiles: Profile[] = [],
  students: Student[] = []
) {
  server.use(
    http.get("*/databases/*/collections/profiles/documents", ({ request }) => {
      return HttpResponse.json({
        total: profiles.length,
        documents: profiles,
      });
    }),
    http.get("*/databases/*/collections/students/documents", () => {
      return HttpResponse.json({
        total: students.length,
        documents: students,
      });
    })
  );
}

/**
 * Hjelpefunksjon for å sette opp API-mock som simulerer feil
 */
function setupApiErrorMock() {
  server.use(
    http.get("*/databases/*/collections/students/documents", () => {
      return HttpResponse.json({ total: 0, documents: [] });
    }),
    http.get("*/databases/*/collections/profiles/documents", () => {
      return HttpResponse.json(
        { message: "Database connection failed", code: "500" },
        { status: 500 }
      );
    })
  );
}

/**
 * Hjelpefunksjon for å rendre komponenten med standard oppsett
 */
function renderProfileSearch(
  children = <Text testID="child-content">Form Content</Text>
) {
  return render(
    <ProfileProvider>
      <ProfileSearch onProfilePress={mockOnProfilePress}>
        {children}
      </ProfileSearch>
    </ProfileProvider>
  );
}

// === TEST DATA ===
const testProfiles: Profile[] = [
  {
    userId: "user-123",
    email: "anna@example.com",
  },
  {
    userId: "user-456",
    email: "per@example.com",
  },
];

const testStudents = [
  {
    $id: "student-1",
    id: 1234657,
    name: "Eksisterende Student",
    userId: "user-456", // Denne profilen er allerede i bruk
    program: "informatikk",
    isActive: true,
    image: null,
    expireAt: "2024-12-31T23:59:59.000Z",
  },
];

// === HOVEDTESTER ===

describe("ProfileSearch Component", () => {
  // === SETUP AND TEARDOWN ===

  beforeAll(() => {
    // Start mock-serveren før alle tester
    server.listen({ onUnhandledRequest: "error" });
  });

  afterAll(() => {
    // Stopp mock-serveren etter alle tester
    server.close();
  });

  beforeEach(() => {
    // Nullstill alle mocks før hver test
    jest.clearAllMocks();
    jest.restoreAllMocks();

    // Standard mock-oppsett: ingen søkeparameter
    mockUseLocalSearchParams.mockReturnValue({ query: "" });
  });

  afterEach(() => {
    // Reset API-handlers etter hver test
    server.resetHandlers();
  });

  // === INITIAL RENDERING TESTS ===

  describe("Initial State", () => {
    test("should display search field and empty state when no search is performed", async () => {
      // ARRANGE: Sett opp komponent uten søkeparameter
      mockUseLocalSearchParams.mockReturnValue({ query: undefined });

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser at riktige elementer vises
      expect(await screen.findByTestId("search-input")).toBeOnTheScreen();
      expect(await screen.findByTestId("empty-state")).toBeOnTheScreen();
      expect(
        await screen.findByText("Du må søke og velge en profil")
      ).toBeOnTheScreen();
      expect(screen.queryByTestId("child-content")).not.toBeOnTheScreen();
    });

    test("should show loading indicator while search is in progress", async () => {
      // ARRANGE: Mock API som tar litt tid å svare
      mockUseLocalSearchParams.mockReturnValue({
        query: "loading@example.com",
      });

      server.use(
        http.get("*/databases/*/collections/profiles/documents", async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ total: 0, documents: [] });
        }),
        http.get("*/databases/*/collections/students/documents", () => {
          return HttpResponse.json({ total: 0, documents: [] });
        })
      );

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser at laste-indikator vises først
      expect(screen.getByTestId("activity-indicator")).toBeOnTheScreen();

      // Vent til lasting er ferdig
      await waitFor(() => {
        expect(
          screen.queryByTestId("activity-indicator")
        ).not.toBeOnTheScreen();
      });
    });
  });

  // === PROFILE SEARCH TESTS ===

  describe("Profile Search and Display", () => {
    test("should fetch and display available profiles based on search", async () => {
      // ARRANGE: Sett opp søkeparameter og mock API-svar
      mockUseLocalSearchParams.mockReturnValue({ query: "anna@example.com" });
      setupProfilesApiMock([testProfiles[0]], testStudents);

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser at profil vises
      expect(
        await screen.findByText("Profil anna@example.com")
      ).toBeOnTheScreen();
    });

    test("should filter out profiles that are already in use", async () => {
      // ARRANGE: Begge profiler returneres fra API, men én er i bruk
      mockUseLocalSearchParams.mockReturnValue({ query: "test" });
      setupProfilesApiMock(testProfiles, testStudents);

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Kun ledig profil skal vises
      expect(
        await screen.findByText("Profil anna@example.com")
      ).toBeOnTheScreen();
      expect(
        screen.queryByText("Profil per@example.com")
      ).not.toBeOnTheScreen();
    });

    test("should show message when no profiles are found", async () => {
      // ARRANGE: Tom respons fra API
      mockUseLocalSearchParams.mockReturnValue({
        query: "finnesikke@example.com",
      });
      setupProfilesApiMock([], []);

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser "ingen resultater" melding
      expect(
        await screen.findByText(
          'Ingen resultater funnet for "finnesikke@example.com".'
        )
      ).toBeOnTheScreen();
    });
  });

  // === PROFILE SELECTION TESTS ===

  describe("Profile Selection and Interaction", () => {
    test("should handle profile selection and show child content", async () => {
      // ARRANGE: Sett opp én tilgjengelig profil
      mockUseLocalSearchParams.mockReturnValue({ query: "anna@example.com" });
      setupProfilesApiMock([testProfiles[0]], []);
      const user = userEvent.setup();

      // ACT: Render og klikk på profil
      renderProfileSearch();

      const profileCard = await screen.findByTestId("profile-card");
      await user.press(profileCard);

      // ASSERT: Verifiser at callback kalles og barninnhold vises
      expect(mockOnProfilePress).toHaveBeenCalledWith(testProfiles[0]);
      expect(await screen.findByTestId("child-content")).toBeOnTheScreen();
    });

    test("should handle profile deselection", async () => {
      // ARRANGE: Sett opp profil og velg den først
      mockUseLocalSearchParams.mockReturnValue({ query: "anna@example.com" });
      setupProfilesApiMock([testProfiles[0]], []);
      const user = userEvent.setup();

      renderProfileSearch();

      // Velg profil først
      const profileCard = await screen.findByTestId("profile-card");
      await user.press(profileCard);

      // ACT: Klikk på valgt profil for å fjerne valg
      const selectedCard = await screen.findByTestId("selected-profile-card");
      await user.press(selectedCard);

      // ASSERT: Verifiser at profil fjernes
      expect(mockOnProfilePress).toHaveBeenLastCalledWith(undefined);
    });
  });

  // === ERROR HANDLING TESTS ===

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      // ARRANGE: Sett opp API som returnerer feil
      mockUseLocalSearchParams.mockReturnValue({ query: "error@example.com" });
      setupApiErrorMock();

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser at feilmelding vises
      expect(
        await screen.findByText("Failed to fetch profiles")
      ).toBeOnTheScreen();
    });
  });

  // === STATE MANAGEMENT TESTS ===

  describe("Handling different states", () => {
    test("should show correct message when profiles are available but none selected", async () => {
      // ARRANGE: Profiler tilgjengelig, men ingen valgt
      mockUseLocalSearchParams.mockReturnValue({
        query: "available@example.com",
      });
      setupProfilesApiMock([testProfiles[0]], []);

      // ACT: Render komponenten
      renderProfileSearch();

      // ASSERT: Verifiser meldinger
      expect(
        await screen.findByText("Profil anna@example.com")
      ).toBeOnTheScreen();
      expect(
        screen.getByText("Velg en profil for å se skjema")
      ).toBeOnTheScreen();
    });

    test("should reset profiles when search is cleared", async () => {
      // ARRANGE: Start med søk, deretter fjern det
      setupProfilesApiMock(testProfiles, testStudents);

      // ACT: Render med søk først
      const { rerender } = renderProfileSearch();

      // Ingen søk i starten
      expect(await screen.findByTestId("empty-state")).toBeOnTheScreen();

      // Legg til søk
      mockUseLocalSearchParams.mockReturnValue({ query: "testing" });
      rerender(
        <ProfileProvider>
          <ProfileSearch onProfilePress={mockOnProfilePress}>
            <Text testID="child-content">Form Content</Text>
          </ProfileSearch>
        </ProfileProvider>
      );

      expect(
        await screen.findByText("Profil anna@example.com")
      ).toBeOnTheScreen();

      // Fjern søk
      mockUseLocalSearchParams.mockReturnValue({ query: "" });
      rerender(
        <ProfileProvider>
          <ProfileSearch onProfilePress={mockOnProfilePress}>
            <Text testID="child-content">Form Content</Text>
          </ProfileSearch>
        </ProfileProvider>
      );

      // ASSERT: Verifiser at profiler er fjernet
      expect(
        screen.queryByText("Profil anna@example.com")
      ).not.toBeOnTheScreen();
      expect(
        screen.getByText("Du må søke og velge en profil")
      ).toBeOnTheScreen();
    });
  });
});
