import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useNewsList(page, pageSize, publishable) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/news?page=${page}&pageSize=${pageSize}&publishable=${publishable}`,
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

export default useNewsList;
