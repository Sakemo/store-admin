"use client";

import { toast } from "react-hot-toast";

import * as z from "zod";
import axios from "axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

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
import { AlertModal } from "@/components/custom/mod/alert-mod";
import { ApiAlert } from "@/components/custom/api-alert";


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
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name
        },
    });

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Loja deletada com sucesso");
        }
        catch(error){
            toast.error("Algo deu errado. Deletou todos os produtos e categorias da loja?");
        }
        finally{
            setLoading(false);
        }
    }

    const onSubmit = async (data: SettingsFormValues) => {
        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Loja atualizada");
        }catch(error){
            toast.error("Algo deu errado");
        }finally{
            setLoading(false)
        }
    };

    return(
        <>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
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
        <Separator />
        <Heading
            title="Ferramentas de Desenvolvedor"
            description="CUIDADO! Essa área é apenas para desenvolvedores."
        />
        <ApiAlert 
            title=""
            description="test-desc"
            variant="public"
        />
        </>
    );
};