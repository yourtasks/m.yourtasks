"use client";

import { fetcher } from "@/libs/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR(`/api/current`, fetcher);

  console.log(data);

  return { data, isLoading, error, mutate };
};

export default useCurrentUser;
