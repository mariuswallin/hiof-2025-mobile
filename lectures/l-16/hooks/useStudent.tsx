// hooks/useStudent.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStudents,
  getStudent,
  getStudentIdByUser,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/providers/appwrite/database";
import type { Student } from "@/types";
import { useAuth } from "@/context/AuthProvider";

// Query keys
const studentKeys = {
  all: ["students"] as const,
  lists: () => [...studentKeys.all, "list"] as const,
  details: () => [...studentKeys.all, "detail"] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
};

// Eksportere funksjoner for å bruke i komponenter
export function useStudents() {
  const { user } = useAuth();

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
}

export function useStudentById(id: string) {
  const { user } = useAuth();

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
}

export function useStudentByUser() {
  const { user } = useAuth();
  if (!user?.$id) {
    throw new Error("userId is required");
  }

  return useQuery({
    queryKey: studentKeys.detail(user.$id),
    queryFn: async () => {
      const result = await getStudentIdByUser(user.$id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!user.$id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: Student) => {
      const result = await createStudent(student);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}

export function useUpdateStudent(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: Partial<Student> }) => {
      const result = await updateStudent(id, data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(studentKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}

export function useDeleteStudent(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await deleteStudent(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return id;
    },
    onSuccess: () => {
      // Invalidere queries for å oppdatere data
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}
