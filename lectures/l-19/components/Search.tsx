import type React from "react";
import { useState, useCallback } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface SearchProps {
  /** Callback function called when search is submitted */
  onSearch?: (query: string) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Additional TextInput props */
  textInputProps?: Partial<TextInputProps>;
  /** Whether to auto-focus the input */
  autoFocus?: boolean;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Søk etter profil",
  debounceDelay = 500,
  textInputProps,
  autoFocus = true,
}) => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState<string | undefined>(params.query);

  // Debounced function to update URL parameters
  const debouncedUpdateParams = useDebouncedCallback((text: string) => {
    // Only update URL params if text is not empty and not just whitespace
    router.setParams({ query: text ? text.trim() : undefined });
  }, debounceDelay);

  // Handle search submission
  const handleSearch = useCallback(() => {
    const trimmedSearch = search?.trim();
    if (onSearch && trimmedSearch && trimmedSearch.length > 0) {
      onSearch(trimmedSearch);
    }
  }, [onSearch, search]);

  // Handle input text changes
  const handleInputChange = useCallback(
    (text: string) => {
      setSearch(text);
      debouncedUpdateParams(text);
    },
    [debouncedUpdateParams]
  );

  // Handle key press events
  const handleKeyPress = useCallback(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <View
      className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2"
      accessible={true}
      accessibilityRole="search"
      accessibilityLabel="Search input container"
    >
      <View className="flex-1 flex flex-row items-center justify-start">
        <Ionicons
          name="search"
          className="size-5"
          accessibilityLabel="Search icon"
        />
        <TextInput
          value={search}
          onChangeText={handleInputChange}
          onSubmitEditing={handleKeyPress}
          placeholder={placeholder}
          placeholderTextColor="#6B7280" // Adjust color as needed
          inputMode="search"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          autoFocus={autoFocus}
          returnKeyType="search"
          clearButtonMode="while-editing"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
          accessible={true}
          accessibilityLabel="Search input"
          accessibilityHint="Enter search terms and press search"
          testID="search-input"
          {...textInputProps}
        />
      </View>
    </View>
  );
};

export default Search;
