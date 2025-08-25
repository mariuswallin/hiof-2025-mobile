// components/StudentFlatList.tsx

import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import StudentID from "./StudentID";
import type { StudentWithId } from "../types";
import Card from "./BaseCard";
import CustomPress from "./CustomPress";
import { Link } from "expo-router";
import StudentListItem from "./StudentListItem";

type StudentListProps = {
  students: StudentWithId[];
  preview: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetching?: boolean;
  onRefresh?: () => void; // Funksjon for å oppdatere listen
  refreshing?: boolean;
};

export default function StudentFlatList(props: StudentListProps) {
  const {
    students,
    preview = false,
    onRefresh,
    refreshing,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = props;

  const renderHeader = useCallback(
    () => (
      <View>
        <Text className="font-bold text-xl text-blue-700">Studentliste</Text>
      </View>
    ),
    []
  );

  // Renderer en footer som viser laster-indikator når flere elementer hentes
  const renderFooter = useCallback(
    () =>
      isFetching ? (
        <View className="py-4 items-center">
          <ActivityIndicator size="small" />
          <Text>Laster studenter...</Text>
        </View>
      ) : students.length && !hasNextPage ? (
        <View className="py-4 items-center">
          <Text>Ingen flere studenter å laste</Text>
        </View>
      ) : null,
    [isFetching, hasNextPage, students.length]
  );

  // Renderer en komponent når listen er tom
  const renderEmptyComponent = useCallback(
    () => (
      <View>
        <Text>Ingen studenter funnet</Text>
      </View>
    ),
    []
  );

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => `${item.$id}`}
      renderItem={({ item }) =>
        preview ? (
          <Link href={`/students/${item.$id}`}>
            <StudentListItem student={item} />
          </Link>
        ) : (
          <CustomPress className="border-rounded-lg overflow-hidden">
            <Card>
              <StudentID student={item} />
            </Card>
          </CustomPress>
        )
      }
      contentContainerStyle={{
        gap: 25,
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
      // Aktiverer "trekk ned for å oppdatere" funksjonalitet
      refreshing={refreshing}
      onRefresh={onRefresh ? onRefresh : undefined}
      // Aktiverer "last inn mer" når brukeren når bunnen av listen
      onEndReached={() => {
        if (!isFetching && hasNextPage && fetchNextPage) {
          fetchNextPage();
        }
      }}
      // Hvor nær bunnen brukeren må være før onEndReached utløses (0-1)
      onEndReachedThreshold={0.3}
      // Viser dette øverst i listen
      ListHeaderComponent={renderHeader}
      // Viser dette nederst i listen
      ListFooterComponent={renderFooter}
      // Viser dette når listen er tom
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}
