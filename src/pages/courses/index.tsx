import apiClient from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { CustomFileInput } from "@/components/ui/ui-custom/custom-input";
import { useEffect, useState } from "react";

interface ApiItem {
  id: string;
  name: string;
}
interface Option {
  value: string;
  label: string;
}

export const Courses = () => {
  const [deptOptions, setDeptOptions] = useState<Option[]>([]);
  const [courseOptions, setCourseOptions] = useState<Option[]>([]);
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [deptRes, courseRes, roleRes] = await Promise.all([
          apiClient.get("departments/list"),
          apiClient.get("courses/list"),
          apiClient.get("positions/list"),
        ]);

        function extractList(resData: any): ApiItem[] {
          if (Array.isArray(resData)) return resData;
          if (Array.isArray(resData.list)) return resData.list;
          return [];
        }

        const deptRaw = extractList(deptRes.data.data);
        const courseRaw = extractList(courseRes.data.data);
        const roleRaw = extractList(roleRes.data.data);

        console.log("Dept:", deptRaw);
        console.log("Courses:", courseRaw);
        console.log("Positions:", roleRaw);

        const mapOpts = (arr: ApiItem[]) =>
          arr.map((x) => ({ value: x.id, label: x.name }));

        setDeptOptions(mapOpts(deptRaw));
        setCourseOptions(mapOpts(courseRaw));
        setRoleOptions(mapOpts(roleRaw));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Falha ao carregar listas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div>Carregando listas…</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-15 pb-15">
      <div className="w-[65%] h-90 bg-[#040507] flex flex-col gap-4 items-center p-5 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Curso</h1>
        <Input
          placeholder="Título"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Subtítulo"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <CustomFileInput />
        <Combobox
          options={deptOptions}
          placeholder="Escolha um departamento"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
        >
          Cadastrar
        </Button>
      </div>
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-md">
        <h1 className="text-white font-bold text-2xl">Apagar Curso</h1>
        <Combobox
          options={courseOptions}
          placeholder="Selecione um curso"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Button
          variant="destructive"
          className="w-[50%] text-base mt-3 bg-[#a11313] hover:bg-[#a11313bb]"
        >
          Apagar
        </Button>
      </div>
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-md">
        <h1 className="text-white font-bold text-2xl">
          Atribuir Curso Obrigatório
        </h1>
        <Combobox
          options={roleOptions}
          placeholder="Selecione uma função"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
        >
          Atribuir
        </Button>
      </div>
    </main>
  );
};
