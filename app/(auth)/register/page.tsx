"use client";
import { signUpAction } from "@/app/(api)/auth/(actions)/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                </>
            ) : (
                "Criar conta"
            )}
        </Button>
    );
}

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Criar uma conta
                    </CardTitle>
                    <CardDescription>
                        Insira seu nome, número e uma senha.
                    </CardDescription>
                </CardHeader>

                <form action={signUpAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">
                                Número de Whatsapp
                            </Label>
                            <Input
                                id="number"
                                name="number"
                                type="tel"
                                placeholder="00 123456789"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Ex.: João, Maria"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Senha
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="********"
                                required
                                minLength={8}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-row items-center justify-between mt-6">
                        <SubmitButton />
                        <div className="text-sm text-right text-muted-foreground">
                            Já tem conta?{" "}
                            <Link
                                className="font-semibold text-primary underline-offset-4 hover:underline block sm:inline"
                                href="/login"
                            >
                                Login
                            </Link>
                        </div>

                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}