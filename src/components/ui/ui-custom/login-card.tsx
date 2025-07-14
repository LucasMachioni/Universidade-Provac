import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Card className="w-full max-w-md p-6 text-base shadow-md">
            <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription className="text-base">
                    Insira seu e-mail para entrar com sua conta
                </CardDescription>
                <CardAction>
                    <Button variant="link" className="text-base">Cadastrar</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-base">E-mail</Label>
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
                                <Label htmlFor="password" className="text-base">Senha</Label>
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
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-3 mt-6">
                <Button type="submit" className="w-full h-12 text-base">
                    Login
                </Button>
            </CardFooter>
        </Card>
    );
}
