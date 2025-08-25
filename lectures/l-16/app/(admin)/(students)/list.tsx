// app/(admin)/(students)/list.tsx

import React, { useMemo } from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";

import CustomView from "../../../components/CustomView";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getStudentsWithCursor } from "@/providers/appwrite/database";

import StudentFlatList from "@/components/StudentFlatList";

export default function Students() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["students", "list"],
    queryFn: (context) => {
      return getStudentsWithCursor(context.pageParam, false).then((res) => {
        if (res.success) {
          return res.data;
        }
        throw new Error(res.error);
      });
    },
    initialPageParam: "",
    getNextPageParam: ({ nextCursor }) => nextCursor,
  });

  // Vis feilmelding hvis noe gikk galt
  if (isError) {
    const errorMessage =
      error?.message ||
      "Det oppstod en feil under henting av studenter. Vennligst prøv igjen senere.";

    return (
      <CustomView safeArea className="flex-1 items-center justify-center">
        <Text className="text-red-500 text-lg">{errorMessage}</Text>
      </CustomView>
    );
  }

  // Må hente ut alle studenter fra alle sidene
  const students = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => page.students);
  }, [data?.pages]);

  return (
    <CustomView safeArea className="flex-1 align-center bg-gray-200 p-5">
      <Stack.Screen options={{ title: "List" }} />
      <StudentFlatList
        preview
        students={students}
        onRefresh={refetch}
        refreshing={isRefetching}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetching={isPending || isFetchingNextPage}
      />
    </CustomView>
  );
}
