// src/components/Classes.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { ErrorScreen } from "@/components/ui/ui-custom/error-screen";
import { Spinner } from "@/components/ui/ui-custom/spinner";
import { useApiOptions } from "@/hooks/use-api-options";
import apiClient from "@/api/client";

export const Classes = () => {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [selectedModule, setSelectedModule] = React.useState("");

  const {
    options: courseOptions,
    isLoading: courseLoading,
    isError: courseError,
    error: courseErrorMessage,
  } = useApiOptions({ endpoint: "courses/list" });

  const {
    options: moduleOptions,
    isLoading: moduleLoading,
    isError: moduleError,
    error: moduleErrorMessage,
    refetch: refetchModules,
  } = useApiOptions({
    endpoint: "modules/list",
    params: { courseId: selectedCourse },
    skip: !selectedCourse,
  });

  React.useEffect(() => {
    if (selectedCourse) {
      refetchModules();
      setSelectedModule("");
    }
  }, [selectedCourse, refetchModules]);

  if (courseLoading) return <Spinner />;
  if (courseError || moduleError) {
    return (
      <ErrorScreen
        message={
          moduleErrorMessage || courseErrorMessage || "Erro ao carregar dados."
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  const handleSubmit = async () => {
    if (!title || !url || !selectedModule) {
      alert("Por favor, preencha título, URL e selecione um módulo.");
      return;
    }
    try {
      await apiClient.post("classes/create", {
        data: {
          courseId: Number(selectedCourse),
          moduleId: Number(selectedModule),
          title,
          url,
          description,
        },
      });
      alert("Aula cadastrada com sucesso!");
      setTitle("");
      setUrl("");
      setDescription("");
      setSelectedModule("");
    } catch (err) {
      console.error("Erro ao cadastrar aula:", err);
      alert("Erro ao cadastrar aula.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-15 pb-15">
      <div className="w-[65%] bg-[#040507] flex flex-col gap-4 items-center p-6 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Aula</h1>

        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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

        <Combobox
          options={moduleOptions || []}
          placeholder="Selecione um módulo"
          searchPlaceholder="Digite para buscar..."
          defaultValue={selectedModule}
          onValueChange={setSelectedModule}
          disabled={!selectedCourse || moduleLoading}
          className="border-blue-500"
        />

        {moduleLoading && selectedCourse && (
          <div className="text-white">Carregando módulos...</div>
        )}

        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
          onClick={handleSubmit}
          disabled={moduleLoading}
        >
          Cadastrar
        </Button>
      </div>
    </main>
  );
};
