import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";

export const Courses = () => {
  return (
    <main className="min-h-screen flex justify-center px-4">
      <div className="w-[70%] h-150 mt-20 bg-[#040507] flex flex-col gap-4 items-center p-8 rounded-xl">
        <h1 className="text-white font-bold text-2xl">Cadastro de Curso</h1>
        <Input
          placeholder="Título"
          className="bg-[#303030] caret-white placeholder:text-lg placeholder:text-[#8C8E8E] border-neutral-700"
        />
        <Input
          placeholder="Subtítulo"
          className="bg-[#303030] caret-white placeholder:text-lg placeholder:text-[#8C8E8E] border-neutral-700"
        />
        <h1 className="text-white font-bold">Imagem</h1>
        <Input id="picture" type="file" className="bg-[#414141] border-gray-300" />
        <Combobox />
        <Button
          variant="default"
          className="text-base bg-[#0D47A2] hover:bg-[#0d46a2dd]"
        >
          Cadastrar
        </Button>
      </div>
    </main>
  );
};
