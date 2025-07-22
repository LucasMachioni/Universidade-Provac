// src/hooks/use-api-options.ts
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
}: UseApiOptionsParams<T>) => {
  const [options, setOptions] = useState<Option[]>([]);
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
      // extrai lista genérica
      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.list)
        ? data.list
        : [];
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

  return { options, isLoading, isError, error, refetch: fetchOptions };
};
