import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { CustomFileInput } from "@/components/ui/ui-custom/custom-input";

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

export const Courses = () => {
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
          options={options}
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
          options={options}
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
          options={options}
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
