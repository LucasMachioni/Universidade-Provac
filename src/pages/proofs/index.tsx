import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";

export const options: { value: string; label: string }[] = [
  { value: "rh", label: "RH" },
  { value: "pmo", label: "PMO" },
  { value: "financeiro", label: "Financeiro" },
  { value: "juridico", label: "Jurídico" },
  { value: "frotas", label: "Frotas" },
  { value: "compras", label: "Compras" },
  { value: "contratos", label: "Contratos" },
  { value: "contavel", label: "Contável" },
  { value: "sms", label: "SMS" },
];

export const Proofs = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 p-15 pt-15 pb-15 gap-10">
      <div className="w-[45%] h-auto bg-[#2C2C2C] flex flex-col gap-4 items-center p-6 pr-10 pl-10 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Prova</h1>
        <Input
          placeholder="Título"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Descrição"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Duração (em minutos)"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Nota mínima para aprovação"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Combobox
          options={options}
          placeholder="Selecione um curso"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Combobox
          options={options}
          placeholder="Selecione um módulo"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-full text-base bg-[#0f8b16] hover:bg-[#0f8b1591] mt-2"
        >
          Adicionar Questão
        </Button>
        <Button
          variant="default"
          className="w-full text-base bg-[#0D47A1] hover:bg-[#0d46a288] mt-2"
        >
          Cadastrar Prova
        </Button>
      </div>
      <div className="w-[45%] h-auto bg-[#2C2C2C] flex flex-col gap-4 items-center p-6 pr-10 pl-10 rounded-md">
        <h1 className="text-white font-bold text-2xl">Excluir Prova</h1>
        <Combobox
          options={options}
          placeholder="Selecione um curso"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Combobox
          options={options}
          placeholder="Selecione um módulo"
          searchPlaceholder="Digite para buscar..."
          defaultValue=""
          className="border-blue-500"
        />
        <Button
          variant="default"
          className="w-full text-base bg-[#a11313] hover:bg-[#a11313bb] mt-2"
        >
          Remover
        </Button>
      </div>
    </main>
  );
};
