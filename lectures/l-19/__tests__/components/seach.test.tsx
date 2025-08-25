import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "@testing-library/react-native";

import Search from "@/components/Search";

// === MOCK-FUNKSJONER ===
// Vi mocker expo-router funksjoner slik at vi kan kontrollere URL-parametere
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
 * Hjelpefunksjon for å rendre Search-komponenten med standard oppsett
 */
function renderSearch(props = {}) {
  return render(<Search {...props} />);
}

/**
 * Hjelpefunksjon for å hente søkefeltet
 */
function getSearchInput() {
  return screen.getByPlaceholderText("Søk etter profil");
}

/**
 * Hjelpefunksjon for å simulere typing i søkefeltet
 */
async function typeInSearchInput(text: string) {
  const input = getSearchInput();
  await userEvent.type(input, text);
  return input;
}

/**
 * Hjelpefunksjon for å simulere submit av søkefeltet
 */
function submitSearch() {
  const input = getSearchInput();
  fireEvent(input, "submitEditing");
  return input;
}

// === HOVEDTESTER ===

describe("Search Component", () => {
  // === SETUP AND TEARDOWN ===

  beforeEach(() => {
    // Sett opp fake timers for å teste debouncing
    jest.useFakeTimers();
    jest.clearAllMocks();

    // Standard mock-oppsett: ingen URL-parameter
    mockUseLocalSearchParams.mockReturnValue({ query: undefined });
  });

  afterEach(() => {
    // Rydd opp etter hver test
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // === RENDERING TESTS ===

  describe("Component Rendering", () => {
    test("should render search input with correct placeholder", async () => {
      // ARRANGE & ACT: Render komponenten
      renderSearch();

      // ASSERT: Verifiser at søkefeltet vises med riktig placeholder
      const input = await screen.findByPlaceholderText("Søk etter profil");
      expect(input).toBeTruthy();
    });

    test("should render search icon container", async () => {
      // ARRANGE & ACT: Render komponenten
      renderSearch();

      // ASSERT: Verifiser at søkeikon-container eksisterer
      const input = await screen.findByPlaceholderText("Søk etter profil");
      expect(input.parent).toBeTruthy();
    });
  });

  // === INITIAL STATE TESTS ===

  describe("Initial State", () => {
    test("should initialize with empty input when no URL params exist", () => {
      // ARRANGE: Ingen URL-parametere
      mockUseLocalSearchParams.mockReturnValue({ query: undefined });

      // ACT: Render komponenten
      renderSearch();

      // ASSERT: Verifiser at input er tom
      const input = getSearchInput();
      expect(input.props.value).toBeUndefined();
    });

    test("should initialize with URL parameter value when present", () => {
      // ARRANGE: Sett URL-parameter
      mockUseLocalSearchParams.mockReturnValue({ query: "initial search" });

      // ACT: Render komponenten
      renderSearch();

      // ASSERT: Verifiser at input har URL-parameter verdi
      const input = getSearchInput();
      expect(input.props.value).toBe("initial search");
    });
  });

  // === TEXT INPUT BEHAVIOR TESTS ===

  describe("Text Input Behavior", () => {
    test("should update input value when user types", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv i søkefeltet
      const input = await typeInSearchInput("test query");

      // ASSERT: Verifiser at input-verdi oppdateres
      expect(input.props.value).toBe("test query");
    });

    test("should call debounced setParams when text changes", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv tekst og vent på debounce
      await typeInSearchInput("test");
      jest.advanceTimersByTime(500); // Simuler at debounce-tiden passerer

      // ASSERT: Verifiser at URL-parametere oppdateres
      expect(mockSetParams).toHaveBeenCalledWith({ query: "test" });
    });

    test("should not call setParams for empty text", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv tekst, vent på debounce, deretter slett alt
      await typeInSearchInput("test");
      jest.advanceTimersByTime(500);
      await userEvent.clear(getSearchInput());

      // ASSERT: Verifiser at kun ikke-tom tekst sender parametere
      expect(mockSetParams).toHaveBeenCalledWith({ query: "test" });
      expect(mockSetParams).not.toHaveBeenCalledWith({ query: "" });
    });

    test("should handle multiple rapid text changes with debouncing", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv flere tegn raskt etter hverandre
      const input = getSearchInput();
      await userEvent.type(input, "a");
      await userEvent.type(input, "b");
      await userEvent.type(input, "c");
      jest.advanceTimersByTime(500); // Kun den siste verdien skal sendes

      // ASSERT: Verifiser at kun siste verdi sendes etter debounce
      expect(mockSetParams).toHaveBeenCalledWith({ query: "abc" });
      expect(mockSetParams).toHaveBeenCalledTimes(1);
    });
  });

  // === SEARCH SUBMISSION TESTS ===

  describe("Search Submission", () => {
    test("should call onSearch callback with current input value on submit", async () => {
      // ARRANGE: Render med onSearch callback
      const mockOnSearch = jest.fn();
      renderSearch({ onSearch: mockOnSearch });

      // ACT: Skriv tekst og submit
      await typeInSearchInput("test query");
      submitSearch();

      // ASSERT: Verifiser at callback kalles med riktig verdi
      expect(mockOnSearch).toHaveBeenCalledWith("test query");
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    test("should not call onSearch when input is empty", async () => {
      // ARRANGE: Render med onSearch callback
      const mockOnSearch = jest.fn();
      renderSearch({ onSearch: mockOnSearch });

      // ACT: Submit uten å skrive noe
      submitSearch();

      // ASSERT: Verifiser at callback ikke kalles for tom input
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test("should not call onSearch when input contains only whitespace", async () => {
      // ARRANGE: Render med onSearch callback
      // Bruker en mock-funksjon for onSearch for å verifisere kall
      const mockOnSearch = jest.fn();
      renderSearch({ onSearch: mockOnSearch });

      // ACT: Skriv kun mellomrom og submit
      await typeInSearchInput("   ");
      submitSearch();

      // ASSERT: Verifiser at callback ikke kalles for kun whitespace
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test("should work gracefully without onSearch prop", async () => {
      // ARRANGE & ACT: Render uten onSearch og submit
      // Dette skal ikke kaste feil
      expect(() => {
        renderSearch();
        submitSearch();
      }).not.toThrow();
    });
  });

  // === URL PARAMETER HANDLING TESTS ===

  describe("URL Parameter Handling", () => {
    test("should update URL params through debounced callback", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv søketerm og vent på debounce
      await typeInSearchInput("search term");
      jest.advanceTimersByTime(500);

      // ASSERT: Verifiser at URL-parametere oppdateres
      expect(mockSetParams).toHaveBeenCalledWith({ query: "search term" });
    });

    test("should debounce multiple rapid changes correctly", async () => {
      // ARRANGE: Render komponenten
      renderSearch();
      const input = getSearchInput();

      // ACT: Gjør flere raske endringer
      await userEvent.type(input, "a");
      jest.advanceTimersByTime(100); // Ikke nok tid for debounce

      await userEvent.type(input, "b");
      jest.advanceTimersByTime(100); // Fortsatt ikke nok tid

      await userEvent.type(input, "c");
      jest.advanceTimersByTime(500); // Nå skal debounce trigges

      // ASSERT: Kun siste verdi skal sendes
      expect(mockSetParams).toHaveBeenCalledWith({ query: "abc" });
      expect(mockSetParams).toHaveBeenCalledTimes(1);
    });
  });

  // === TESTING THE FLOW ===

  describe("Testing the complete flow", () => {
    test("should handle complete user flow: initialize from URL, type, and submit", async () => {
      // ARRANGE: Sett initial URL-parameter og onSearch callback
      mockUseLocalSearchParams.mockReturnValue({ query: "initial" });
      const mockOnSearch = jest.fn();
      renderSearch({ onSearch: mockOnSearch });

      // ACT & ASSERT: Verifiser initial verdi
      const input = getSearchInput();
      expect(input.props.value).toBe("initial");

      // ACT: Slett og skriv ny tekst
      await userEvent.clear(input);
      await typeInSearchInput("new search");
      jest.advanceTimersByTime(500);

      // ASSERT: Verifiser at URL-parametere oppdateres
      expect(mockSetParams).toHaveBeenCalledWith({ query: "new search" });

      // ACT: Submit søket
      submitSearch();

      // ASSERT: Verifiser at onSearch kalles
      expect(mockOnSearch).toHaveBeenCalledWith("new search");
    });

    test("should handle edge case with special characters", async () => {
      // ARRANGE: Render komponenten
      renderSearch();

      // ACT: Skriv tekst med spesialtegn
      await typeInSearchInput("test@example.com");
      jest.advanceTimersByTime(500);

      // ASSERT: Verifiser at spesialtegn håndteres korrekt
      expect(mockSetParams).toHaveBeenCalledWith({ query: "test@example.com" });
    });
  });
});
