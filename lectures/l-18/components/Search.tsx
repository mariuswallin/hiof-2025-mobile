// components/Search.tsx

import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Tar i mot en funksjon som tar inn søketekst, hvis behov
const Search = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState<string | undefined>(params.query);

  // Debounce for å unngå for mange forespørseler til serveren
  // når brukeren skriver inn søketekst
  // Kan unngå dette ved å kun trigge søk når brukeren trykker enter
  const debouncedSearch = useDebouncedCallback((text: string) => {
    // Setter søketekst i URL-parametere
    // eks "site-url?query=..."
    router.setParams({ query: text });
  }, 500);

  // Kan brukes slik at utsiden kan håndtere
  // resultatet av søket
  const handleSearch = () => {
    if (onSearch && search) {
      onSearch(search);
    }
  };

  const handleInputChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Ionicons name="search" className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleInputChange} // Oppdater søketekst
          onSubmitEditing={handleSearch} // Trigger søk når brukeren trykker enter
          inputMode="search" // Bruker søk-modus for tastaturet
          autoCapitalize="none" // Ingen automatisk store bokstaver
          autoCorrect={false} // Ingen automatisk korrektur
          autoComplete="off" // Ingen automatisk utfylling
          autoFocus={true} // Ingen automatisk fokus
          returnKeyType="search" // Endre tastaturet til søk
          placeholder="Søk etter profil"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>
    </View>
  );
};

export default Search;
