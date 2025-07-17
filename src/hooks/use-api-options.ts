import { useEffect, useState } from "react";
import apiClient from "@/api/client";

//Estrutura padrão das opções da combobox
export interface Option {
  value: string;
  label: string;
}

//estrutura esperada da api
interface ApiItem {
  id: string;
  name: string;
}

//parâmetros do hook com o endpoint personalizado e a função para personalizar o mapeamento dos dados
interface UseApiOptionsParams {
  endpoint: string;
  transform?: (item: ApiItem) => Option;
}

//declaração do hook, define um transformador dos dados caso não seja especificado outro
export const useApiOptions = ({
  endpoint,
  transform = (item) => ({ value: item.id, label: item.name }),
}: UseApiOptionsParams) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiClient.get(endpoint);

        const extractList = (data: any): ApiItem[] => {
          if (Array.isArray(data)) return data;
          if (Array.isArray(data?.list)) return data.list;
          return [];
        };

        const items = extractList(response.data.data);
        setOptions(items.map(transform));
        setStatus("success");
      } catch (err) {
        setError(`Falha ao carregar: ${endpoint}`);
        setStatus("error");
        console.error(`Erro no endpoint ${endpoint}:`, err);
      }
    };

    fetchOptions();
  }, [endpoint, transform]);

  return {
    options,
    isLoading: status === "loading",
    isError: status === "error",
    error,
  };
};
