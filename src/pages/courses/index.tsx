import { Combobox } from "@/components/ui/ui-custom/combobox";
import { Spinner } from "@/components/ui/ui-custom/spinner";
import React from "react";

export const CoursesList = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 pb-20 bg-[#0c0c0c] text-white">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Navegue pelo Conteúdo
        </h1>

        {/* Seleção de Departamento */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Departamento</label>
          <Combobox
            options={[]}
            placeholder="Selecione um departamento"
            searchPlaceholder="Buscar departamento..."
            defaultValue=""
            onValueChange={() => {}}
          />
        </div>

        {/* Seleção de Curso */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Curso</label>
          <Combobox
            options={[]}
            placeholder="Selecione um curso"
            searchPlaceholder="Buscar curso..."
            defaultValue=""
            onValueChange={() => {}}
          />
        </div>

        {/* Seleção de Módulo */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Módulo</label>
          <Combobox
            options={[]}
            placeholder="Selecione um módulo"
            searchPlaceholder="Buscar módulo..."
            defaultValue=""
            onValueChange={() => {}}
          />
        </div>

        {/* Seleção de Aula */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Aula</label>
          <Combobox
            options={[]}
            placeholder="Selecione uma aula"
            searchPlaceholder="Buscar aula..."
            defaultValue=""
            onValueChange={() => {}}
          />
        </div>

        {/* Player da aula (só aparece se uma aula for selecionada) */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Aula Selecionada</h2>
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            {/* Substitua isso por um <video> ou <iframe> real depois */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Aula"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </main>
  );
};
