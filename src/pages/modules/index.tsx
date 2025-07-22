import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { ErrorScreen } from "@/components/ui/ui-custom/error-screen";
import { Spinner } from "@/components/ui/ui-custom/spinner";
import { useApiOptions } from "@/hooks/use-api-options";
import apiClient from "@/api/client";
import React from "react";

export const Modules = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");

  const {
    options: courseOptions,
    isLoading: courseLoading,
    isError: courseError,
    error: courseErrorMessage,
  } = useApiOptions({ endpoint: "courses/list" });

  if (courseLoading) return <Spinner />;
  if (courseError) {
    return (
      <ErrorScreen
        message={courseErrorMessage || "Erro ao carregar cursos."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const handleSubmit = async () => {
    if (!name || !selectedCourse) {
      alert("Por favor, preencha nome e selecione um curso.");
      return;
    }

    const payload = {
      data: {
        courseId: Number(selectedCourse),
        name,
        description,
      },
    };

    try {
      await apiClient.post("modules/create", payload);
      alert("Módulo cadastrado com sucesso!");
      setName("");
      setDescription("");
      setSelectedCourse("");
    } catch (error) {
      console.error("Erro ao cadastrar módulo:", error);
      alert("Erro ao cadastrar módulo.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-15 pb-15">
      <div className="w-[65%] h-auto bg-[#040507] flex flex-col gap-4 items-center p-6 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Módulo</h1>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />

        <Combobox
          options={courseOptions}
          placeholder="Selecione um curso"
          searchPlaceholder="Digite para buscar..."
          defaultValue={selectedCourse}
          onValueChange={setSelectedCourse}
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </div>
    </main>
  );
};
