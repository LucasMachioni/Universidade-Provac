import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface RadioGroupButtonProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  children: React.ReactNode;
  checkedClassName?: string;
}

function RadioCustom({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupButton({
  className,
  checkedClassName,
  children,
  ...props
}: RadioGroupButtonProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "px-4 py-2 rounded-md text-sm border transition-colors duration-200",
        "border-input bg-background hover:bg-muted",
        "data-[state=checked]:text-white data-[state=checked]:border-transparent",
        className,
        checkedClassName // Aqui passa já com data-[state=checked]:...
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioCustom, RadioGroupButton };
