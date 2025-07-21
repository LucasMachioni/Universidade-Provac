import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginPost = { email, password };
      const response = await apiClient.post("auth/login", loginPost);
      const token = response.data.token;

      // salva no contexto (e localStorage)
      login(token);

      // navega para a área privada
      navigate("/cadastrar-curso");
    } catch (erro) {
      console.error("Erro ao logar:", erro);
      alert("Falha no login!");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 text-base shadow-md">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription className="text-base">
          Insira seu e-mail para entrar com sua conta
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            className="text-base"
            onClick={() => navigate("/register")}
          >
            Cadastrar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-base">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
              className="h-12 text-base px-4"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-base">
                Senha
              </Label>
              <a
                href="#"
                className="text-sm underline-offset-4 hover:underline"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 text-base px-4"
            />
          </div>
          <CardFooter className="flex-col gap-3 mt-6">
            <Button type="submit" className="w-full h-12 text-base">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
