import { useState, useEffect } from "react";

import { JobItemApiResponse, JobItemsApiResponse } from "./types";

import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchJobItem = async (id: number | null): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
  });

  if (isError) {
    toast.error(error.message);
  }

  return { jobItem: data?.jobItem, isLoading } as const;
}

const fetchJobsItems = async (searchText: string): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useJobsItems(searchText: string) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => (searchText ? fetchJobsItems(searchText) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
  });

  if (isError) {
    toast.error(error.message);
  }

  return { jobItems: data?.jobItems, isLoading } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1));
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const { jobItem, isLoading } = useJobItem(activeId);

  return { jobItem, isLoading } as const;
}
