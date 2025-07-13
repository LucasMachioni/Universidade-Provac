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
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Insira seu e-mail para logar sua conta
                </CardDescription>
                <CardAction>
                    <Button variant="link">Cadastrar</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                            </div>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <a
                                href="#"
                                className="inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}
