import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useUsersList(page, pageSize) {
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
  };
}

export default useUsersList;
