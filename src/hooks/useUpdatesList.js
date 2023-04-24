import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useUpdatesList(page, pageSize) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/updates?page=${page}&pageSize=${pageSize}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export default useUpdatesList;
