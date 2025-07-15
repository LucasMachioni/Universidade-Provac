import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Classes = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 p-20">
      <div className="w-[65%] h-90 bg-[#040507] flex flex-col gap-4 items-center p-5 rounded-xl">
        <h1 className="text-white font-bold text-2xl">Cadastro de Aula</h1>
        <Input
          placeholder="Título"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#8C8E8E] border-neutral-700"
        />
        <Input
          placeholder="URL"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#8C8E8E] border-neutral-700"
        />
        <Input
          placeholder="Descrição"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#8C8E8E] border-neutral-700"
        />

        <Button
          variant="default"
          className="w-[50%] text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
        >
          Cadastrar
        </Button>
      </div>
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-xl">
        <h1 className="text-white font-bold text-2xl">Apagar Curso</h1>

        <Button
          variant="destructive"
          className="w-[50%] text-base mt-3 bg-[#ff5151]"
        >
          Apagar
        </Button>
      </div>
      <div className="w-[65%] h-55 mt-10 bg-[#040507] flex flex-col gap-4 items-center p-5 pb-14 rounded-xl">
        <h1 className="text-white font-bold text-2xl">
          Atribuir Curso Obrigatório
        </h1>

        <Button
          variant="destructive"
          className="w-[50%] text-base mt-8 bg-[#ff5151]"
        >
          Apagar
        </Button>
      </div>
    </main>
  );
};
