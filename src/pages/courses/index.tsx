import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { CustomFileInput } from "@/components/ui/ui-custom/custom-input";
import { ErrorScreen } from "@/components/ui/ui-custom/error-screen";
import { Spinner } from "@/components/ui/ui-custom/spinner";
import { useApiOptions } from "@/hooks/use-api-options";
import apiClient from "@/api/client";
import React from "react";

export const Courses = () => {
  // Estados para cadastro
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [imageBase64, setImageBase64] = React.useState("");
  const [selectedDept, setSelectedDept] = React.useState("");

  // Estados para apagar e atribuir
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");

  // Carregar opções
  const {
    options: deptOptions,
    isLoading: deptLoading,
    isError: deptError,
    error: deptErrorMessage,
  } = useApiOptions({ endpoint: "departments/list" });

  const {
    options: courseOptions,
    isLoading: courseLoading,
    isError: courseError,
    error: courseErrorMessage,
  } = useApiOptions({ endpoint: "courses/list" });

  const {
    options: roleOptions,
    isLoading: roleLoading,
    isError: roleError,
    error: roleErrorMessage,
  } = useApiOptions({ endpoint: "positions/list" });

  // Loading e erro
  if (deptLoading || courseLoading || roleLoading) return <Spinner />;
  if (deptError || courseError || roleError) {
    return (
      <ErrorScreen
        message={
          deptErrorMessage ||
          courseErrorMessage ||
          roleErrorMessage ||
          "Erro ao carregar listas."
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Converte arquivo em base64 e salva no estado
  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageBase64("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // Remove prefixo "data:*/*;base64,"
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !selectedDept || !imageBase64) {
      alert("Por favor, preencha título, departamento e selecione uma imagem.");
      return;
    }

    const payload = {
      data: {
        departmentId: Number(selectedDept),
        title,
        subtitle,
        imagePath: imageBase64,
      },
    };

    console.log("Payload enviado para API:", JSON.stringify(payload, null, 2));

    try {
      await apiClient.post("courses/create", payload);
      alert("Curso cadastrado com sucesso!");
      setTitle("");
      setSubtitle("");
      setImageBase64("");
      setSelectedDept("");
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      alert("Erro ao cadastrar curso.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-15 pb-15">
      {/* Cadastro de Curso */}
      <div className="w-[65%] bg-[#040507] flex flex-col gap-4 items-center p-5 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Curso</h1>

        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />

        <Input
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />

        <CustomFileInput onChange={handleImageChange} />

        <Combobox
          options={deptOptions}
          placeholder="Escolha um departamento"
          searchPlaceholder="Digite para buscar..."
          defaultValue={selectedDept}
          onValueChange={setSelectedDept}
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

      {/* Apagar Curso */}
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-md">
        <h1 className="text-white font-bold text-2xl">Apagar Curso</h1>
        <Combobox
          options={courseOptions}
          placeholder="Selecione um curso"
          searchPlaceholder="Digite para buscar..."
          defaultValue={selectedCourse}
          onValueChange={setSelectedCourse}
          className="border-blue-500"
        />
        <Button
          variant="destructive"
          className="w-[50%] text-base mt-3 bg-[#a11313] hover:bg-[#a11313bb]"
          // onClick para apagar (implemente quando quiser)
        >
          Apagar
        </Button>
      </div>

      {/* Atribuir Curso Obrigatório */}
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-md">
        <h1 className="text-white font-bold text-2xl">
          Atribuir Curso Obrigatório
        </h1>
        <Combobox
          options={roleOptions}
          placeholder="Selecione uma função"
          searchPlaceholder="Digite para buscar..."
          defaultValue={selectedRole}
          onValueChange={setSelectedRole}
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
          // onClick para atribuir (implemente quando quiser)
        >
          Atribuir
        </Button>
      </div>
    </main>
  );
};
