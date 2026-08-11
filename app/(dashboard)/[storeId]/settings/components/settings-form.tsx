"use client";

import * as z from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/lib/generated/prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { 
    Field, 
    FieldError, 
    FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm:React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name
        },
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
    };

    return(
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title="Configurações"
                description ="Gerencias opções da loja"
            />

            <Button
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
        <Separator />
        <FormProvider {...form}>

        <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-8">
                <Controller 
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Nome
                            </FieldLabel>
                            <Input
                                disabled={loading}
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Nome da Loja..."
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
                Salvar Alterações
            </Button>
        </form>
        </FormProvider>
        </>
    );
};