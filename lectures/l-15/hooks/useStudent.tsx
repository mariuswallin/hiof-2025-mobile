// hooks/useStudent.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/providers/appwrite";
import { useEffect } from "react";
import { APPWRITE_KEYS } from "@/constants/keys";

import {
  getStudents,
  getStudent,
  getStudentsByUser,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/providers/appwrite/database";
import type { Student } from "@/types";
import { useAuth } from "@/context/AuthProvider";

const { DATABASE_ID, COLLECTION_ID } = APPWRITE_KEYS;

/**
 * Hook for å håndtere student-data med Tanstack Query
 */
export function useStudent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Query keys
  const studentKeys = {
    all: ["students"] as const,
    lists: () => [...studentKeys.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...studentKeys.lists(), { filters }] as const,
    details: () => [...studentKeys.all, "detail"] as const,
    detail: (id: string) => [...studentKeys.details(), id] as const,
    userStudents: (userId: string) =>
      [...studentKeys.lists(), { userId }] as const,
  };

  // Hent alle studenter
  const useStudents = () => {
    return useQuery({
      queryKey: studentKeys.lists(),
      queryFn: async () => {
        const result = await getStudents();
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      },
      enabled: !!user,
    });
  };

  // Hent én student basert på ID
  const useStudentById = (id: string) => {
    return useQuery({
      queryKey: studentKeys.detail(id),
      queryFn: async () => {
        const result = await getStudent(id);
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      },
      enabled: !!id && !!user,
    });
  };

  // Hent studenter for en bruker
  const useStudentsByUser = (userId?: string) => {
    const uid = userId || (user ? user.$id : undefined);

    return useQuery({
      queryKey: studentKeys.userStudents(uid || ""),
      queryFn: async () => {
        if (!uid) throw new Error("userId is required");

        const result = await getStudentsByUser(uid);
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      },
      enabled: !!uid && !!user,
    });
  };

  // Legg til en ny student
  const useCreateStudent = () => {
    return useMutation({
      mutationFn: async (student: Student) => {
        if (!user) throw new Error("User is required");

        const result = await createStudent(student, user);
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      },
      onSuccess: () => {
        // Invalider relevante queries for å hente data på nytt
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      },
    });
  };

  // Oppdater en student
  const useUpdateStudent = () => {
    return useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: Partial<Student>;
      }) => {
        const result = await updateStudent(id, data);
        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      },
      onSuccess: (data) => {
        // Oppdater cache for den spesifikke studenten
        queryClient.setQueryData(studentKeys.detail(data.$id), data);

        // Invalider lister som kan ha blitt endret
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      },
    });
  };

  // Slett en student
  const useDeleteStudent = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const result = await deleteStudent(id);
        if (!result.success) {
          throw new Error(result.error);
        }
        return id;
      },
      onSuccess: (id) => {
        // Fjern fra cache
        queryClient.removeQueries({ queryKey: studentKeys.detail(id) });

        // Invalider lister
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      },
    });
  };

  // Realtime updates
  useEffect(() => {
    if (!user) return;

    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
    const unsubscribe = client.subscribe(channel, (response) => {
      const { payload, events } = response;

      // Oppdater cache basert på hendelse
      if (events.some((event) => event.includes("create"))) {
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user && payload.userId === user.$id) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      }

      if (events.some((event) => event.includes("update"))) {
        queryClient.setQueryData(studentKeys.detail(payload.$id), payload);
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user && payload.userId === user.$id) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      }

      if (events.some((event) => event.includes("delete"))) {
        queryClient.removeQueries({
          queryKey: studentKeys.detail(payload.$id),
        });
        queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
        if (user && payload.userId === user.$id) {
          queryClient.invalidateQueries({
            queryKey: studentKeys.userStudents(user.$id),
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, queryClient]);

  return {
    useStudents,
    useStudentById,
    useStudentsByUser,
    useCreateStudent,
    useUpdateStudent,
    useDeleteStudent,
  };
}

// Eksporter enkeltfunksjoner for enklere importering
export const {
  useStudents,
  useStudentById,
  useStudentsByUser,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} = useStudent();
