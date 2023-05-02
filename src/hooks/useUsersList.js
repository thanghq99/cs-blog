import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DEFAULT_PAGE_SIZE = 5;

function useUsersList(defaultPage, defaultPageSize) {
  const [page, setPage] = useState(defaultPage || 0);
  const [pageSize, setPageSize] = useState(
    defaultPageSize || DEFAULT_PAGE_SIZE
  );
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/users?page=${page}&pageSize=${pageSize}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}

export default useUsersList;
