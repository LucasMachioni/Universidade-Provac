import { useRef, useState } from "react";

interface CustomFileInputProps {
  onChange?: (file: File | null) => void;
}

export const CustomFileInput = ({ onChange }: CustomFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Nenhum arquivo escolhido");
    }

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className="flex items-center w-full px-4 py-1.5 border-blue-500 border-1 bg-[#3a3a3a] text-[#bdbdbd] rounded-lg cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="mr-2">Escolher imagem</span>
        <span className="truncate text-sm">{fileName}</span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
