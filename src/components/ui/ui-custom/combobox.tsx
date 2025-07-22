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
  disabled?: boolean;
}

export function Combobox({ options, ...rest }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(rest.defaultValue || "");

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = React.useState<number | "auto">(
    "auto"
  );

  React.useEffect(() => {
    if (!open) return;

    if (buttonRef.current) {
      const btnWidth = buttonRef.current.offsetWidth;

      const longestLabelWidth = options.reduce((max, option) => {
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        span.style.fontSize = "14px";
        span.textContent = option.label;
        document.body.appendChild(span);
        const width = span.offsetWidth + 40;
        document.body.removeChild(span);

        return width > max ? width : max;
      }, 0);

      const width = Math.min(Math.max(btnWidth, longestLabelWidth), 780);
      setPopoverWidth(width);
    }
  }, [open, options]);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    if (rest.onValueChange) rest.onValueChange(selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={rest.disabled}>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[100%] justify-between bg-[#424242] text-white",
            rest.className
          )}
          disabled={rest.disabled}
        >
          {value
            ? options.find((o) => o.value === value)?.label
            : rest.placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth === "auto" ? undefined : popoverWidth }}
        className="p-0 max-h-60 overflow-auto"
      >
        <Command>
          <CommandInput
            placeholder={rest.searchPlaceholder || "Procurar..."}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // busca pelo label pra pesquisa funcionar
                  onSelect={() => handleSelect(option.value)} // seleciona pelo value real (ID)
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