// components/ProfileSearch.tsx

import { getProfileByEmail } from "@/providers/appwrite/database";
import type { Profile } from "@/types";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";
import Search from "./Search";
import Card from "./BaseCard";
import Empty from "./Empty";
import { cn } from "@/utils/cn";
import { useProfile } from "@/context/ProfileContext";

type Status = "idle" | "loading" | "error";

export default function ProfileSearch({
  onProfilePress,
  children,
}: {
  onProfilePress?: (profile?: Profile) => void;
  profile?: Profile;
  children: React.ReactNode;
}) {
  const { profile, setProfile } = useProfile();

  const { query } = useLocalSearchParams<{ query?: string }>();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isError = status === "error" || error !== null;
  const isLoading = status === "loading";
  const isIdle = status === "idle";
  const isEmpty = profiles.length === 0;
  const notFoundSearch = isIdle && isEmpty && query;

  useEffect(() => {
    if (!query) {
      setProfiles([]);
      setStatus("idle");
      return;
    }

    const fetchProfiles = async () => {
      setStatus("loading");
      setError(null);

      try {
        const response = await getProfileByEmail(query);

        const success = response.success;
        setProfiles(success ? response.data : []);
        setStatus(success ? "idle" : "error");
        if (!success) {
          setError("Failed to fetch profiles");
        }
      } catch (error) {
        // Handle aborted requests and other errors
        setStatus("error");
        setProfiles([]);
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchProfiles();
  }, [query]);

  const handleProfileCardPress = (userId?: string) => {
    const selectedProfile = profiles.find(
      (profile) => profile.userId === userId
    );

    if (onProfilePress) onProfilePress(selectedProfile);
    setProfile(selectedProfile);
  };

  return (
    <>
      {isError && (
        <Text className="text-lg font-rubik-bold text-red-500">
          {error || "An error occurred"}
        </Text>
      )}
      <FlatList
        data={profiles}
        numColumns={1}
        renderItem={({ item }) => {
          if (profile) return null;
          return (
            <Card
              testID="profile-card"
              title={`Profil ${item.email}`}
              onPress={() => handleProfileCardPress(item.userId)}
              styles={{
                container: "px-4 py-0",
                content: "w-full p-4",
                title: "text-black font-bold text-base",
              }}
            >
              <Text className={cn("text-black mt-2")}>{item.userId}</Text>
            </Card>
          );
        }}
        keyExtractor={(item) => item.userId}
        contentContainerClassName="gap-3"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              testID="activity-indicator"
              size="large"
              className="text-primary-300 mt-5"
            />
          ) : (
            <Empty
              search={query}
              text={
                !query && !notFoundSearch
                  ? "Du må søke og velge en profil"
                  : undefined
              }
            />
          )
        }
        ListHeaderComponent={() =>
          profile ? (
            <View className="flex-1 mt-4 py-0 mb-0">
              <Card
                testID="selected-profile-card"
                title={`Profil ${profile.email}`}
                onPress={() => handleProfileCardPress(undefined)}
                styles={{
                  container: "px-4 py-0 mt-0 py-0",
                  content:
                    "bg-blue-600 border-blue-500 border-2 w-full p-4 text-white",
                  title: "text-white font-bold text-base",
                }}
              >
                <Text className={cn("text-white mt-2")}>{profile.userId}</Text>
              </Card>
              <View className="mt-2">{profile ? children : null}</View>
            </View>
          ) : (
            <View className="flex-1 px-5">
              <Search />
              {!isEmpty && (
                <Text className="text-lg font-rubik-bold text-black-500 mt-5">
                  Velg en profil for å se skjema
                </Text>
              )}
            </View>
          )
        }
      />
    </>
  );
}
