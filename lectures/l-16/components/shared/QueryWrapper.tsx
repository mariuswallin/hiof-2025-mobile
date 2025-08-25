import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";

import Loading from "./Loading";
import ErrorComp from "./Error";

type Props<
  TQueryData = unknown,
  TQueryError = unknown,
  TMutationData = unknown,
  TMutationError = unknown,
  TMutationVariables = unknown,
  TMutationContext = unknown
> = {
  query?: UseQueryResult<TQueryData, TQueryError>;
  mutation?: UseMutationResult<
    TMutationData,
    TMutationError,
    TMutationVariables,
    TMutationContext
  >;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
};

export function QueryWrapper<
  TQueryData = unknown,
  TQueryError = unknown,
  TMutationData = unknown,
  TMutationError = unknown,
  TMutationVariables = unknown,
  TMutationContext = unknown
>({
  query,
  mutation,
  children,
  loadingComponent,
  errorComponent,
}: Props<
  TQueryData,
  TQueryError,
  TMutationData,
  TMutationError,
  TMutationVariables,
  TMutationContext
>) {
  const isLoading = query?.isPending || mutation?.isPending;
  const error = query?.error || mutation?.error;

  if (isLoading) {
    return loadingComponent || <Loading />;
  }

  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "En ukjent feil oppstod";
    return (
      <>
        {errorComponent || <ErrorComp message={errorMessage} />}
        {children}
      </>
    );
  }

  return children;
}
