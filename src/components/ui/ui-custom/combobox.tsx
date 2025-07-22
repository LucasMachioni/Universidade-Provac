"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean; // Nova propriedade
}

export function Combobox({
  options,
  placeholder = "Selecionar...",
  searchPlaceholder = "Procurar...",
  defaultValue = "",
  onValueChange,
  className,
  disabled = false, // Valor padrão
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    if (onValueChange) {
      onValueChange(currentValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[100%] justify-between bg-[#424242] text-white",
            className
          )}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[780px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
