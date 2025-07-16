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

export const Modules = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-15 pb-15">
      <div className="w-[65%] h-auto bg-[#040507] flex flex-col gap-4 items-center p-6 rounded-md">
        <h1 className="text-white font-bold text-2xl">Cadastro de Módulo</h1>
        <Input
          placeholder="Nome"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />
        <Input
          placeholder="Descrição"
          className="bg-[#303030] text-white caret-white placeholder:text-[15px] placeholder:text-[#adafaf] border-neutral-700"
        />

        <Combobox
          options={options}
          placeholder="Selecione um curso"
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
      <div className="w-[65%] h-auto mt-10 bg-[#040507] flex flex-col gap-4 items-center p-6 pb-14 rounded-md">
        <h1 className="text-white font-bold text-2xl">Apagar Módulo</h1>
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
          variant="destructive"
          className="w-[50%] text-base mt-3 bg-[#a11313] hover:bg-[#a11313bb]"
        >
          Apagar
        </Button>
      </div>
    </main>
  );
};
