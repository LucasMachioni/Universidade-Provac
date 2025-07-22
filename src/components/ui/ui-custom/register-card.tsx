import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioCustom, RadioGroupButton } from "./custom-radio";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Combobox } from "@/components/ui/ui-custom/combobox";
import { useApiOptions } from "@/hooks/use-api-options";
import apiClient from "@/api/client";
import { Spinner } from "@/components/ui/ui-custom/spinner";

export function RegisterCard() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("");
  const [selectedPosition, setSelectedPosition] = React.useState("");
  const [roleVisual, setRoleVisual] = React.useState("green");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    data: departmentData,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useApiOptions({ endpoint: "departments/list" });

  const departmentOptions =
    departmentData?.map((dep: { id: number; name: string }) => ({
      label: dep.name,
      value: dep.id.toString(),
    })) ?? [];

  const {
    data: positionData,
    isLoading: positionsLoading,
    isError: positionsError,
  } = useApiOptions({ endpoint: "positions/list" });

  const positionOptions =
    positionData?.map((pos: { id: number; name: string }) => ({
      label: pos.name,
      value: pos.id.toString(),
    })) ?? [];

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordMatch = password === confirmPassword;
  const isFormValid =
    email &&
    name &&
    password &&
    confirmPassword &&
    selectedDepartment &&
    selectedPosition &&
    isEmailValid &&
    isPasswordMatch;

  const getRealRoleValue = () => (roleVisual === "green" ? "USER" : "MANAGER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        data: {
          usernamee: name,
          email: email,
          password: password,
          role: getRealRoleValue(),
          departmentId: Number(selectedDepartment),
          positionId: Number(selectedPosition),
        },
      };

      await apiClient.post("user/register", payload);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelectedDepartment("");
      setSelectedPosition("");
      setRoleVisual("green");

      alert("Usuário registrado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao registrar:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Erro ao registrar. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (departmentsLoading || positionsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md p-6 shadow-md text-base">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Registrar</CardTitle>
        <CardDescription className="text-base">
          Insira os dados para criar uma conta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do usuário</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
            {!isEmailValid && email.length > 0 && (
              <span className="text-sm text-red-500">E-mail inválido</span>
            )}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira a senha"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted-foreground"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a senha"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted-foreground"
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
            {!isPasswordMatch && confirmPassword.length > 0 && (
              <span className="text-sm text-red-500">
                As senhas não coincidem
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department">Departamento</Label>
            <Combobox
              options={departmentOptions}
              placeholder="Selecione um departamento"
              searchPlaceholder="Buscar departamento..."
              defaultValue={selectedDepartment}
              onValueChange={setSelectedDepartment}
              disabled={departmentsLoading || departmentsError}
            />
            {!selectedDepartment && (
              <span className="text-sm text-red-500">
                Selecione um departamento
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="position">Cargo</Label>
            <Combobox
              options={positionOptions}
              placeholder="Selecione um cargo"
              searchPlaceholder="Buscar cargo..."
              defaultValue={selectedPosition}
              onValueChange={setSelectedPosition}
              disabled={positionsLoading || positionsError}
            />
            {!selectedPosition && (
              <span className="text-sm text-red-500">Selecione um cargo</span>
            )}
          </div>

          <RadioCustom
            value={roleVisual}
            onValueChange={setRoleVisual}
            className="justify-center"
          >
            <RadioGroupButton
              value="green"
              checkedClassName="data-[state=checked]:bg-gray-600"
            >
              Usuário
            </RadioGroupButton>

            <RadioGroupButton
              value="blue"
              checkedClassName="data-[state=checked]:bg-blue-600"
            >
              Gerente
            </RadioGroupButton>
          </RadioCustom>

          {submitError && (
            <div className="text-red-500 text-sm text-center">
              {submitError}
            </div>
          )}

          <CardFooter className="flex-col gap-3 mt-6 p-0">
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>

            <Link
              to="/"
              className="text-sm text-muted-foreground hover:underline"
            >
              Já possui uma conta? Faça login
            </Link>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
