import { useEffect, useState, useCallback } from "react";
import apiClient from "@/api/client";

export interface Option {
  value: string;
  label: string;
}

export interface UseApiOptionsParams<T = any> {
  endpoint: string;
  transform?: (item: T) => Option;
  params?: Record<string, any>;
  skip?: boolean;
}

const defaultTransform = (item: any): Option => ({
  value: String(item.id),
  label: item.name || item.title || "Sem nome",
});

export const useApiOptions = <T = any>({
  endpoint,
  transform,
  params = {},
  skip = false,
}: UseApiOptionsParams<T>): {
  options: Option[];
  data: T[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [options, setOptions] = useState<Option[]>([]);
  const [data, setData] = useState<T[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    skip ? "success" : "loading"
  );
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === "loading";
  const isError = status === "error";

  const fetchOptions = useCallback(async () => {
    if (skip) return;
    setStatus("loading");
    setError(null);
    try {
      const res = await apiClient.get(endpoint, { params });
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.list)
        ? res.data.list
        : [];
      setData(list);
      setOptions(list.map(transform || defaultTransform));
      setStatus("success");
    } catch (err: any) {
      console.error(`Erro em ${endpoint}:`, err);
      setError(err.message || "Erro inesperado");
      setStatus("error");
    }
  }, [endpoint, transform, skip, JSON.stringify(params)]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return { options, data, isLoading, isError, error, refetch: fetchOptions };
};
