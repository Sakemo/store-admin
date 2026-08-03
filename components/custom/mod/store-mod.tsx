"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useStoreModal } from "@/hooks/store-modal";
import { Modal } from "../modal";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values);
            console.log(response.data);

            window.location.assign(`/${response.data.id}`);
        } 
        catch (error) {
            console.log("[STOREMOD/ON_SUBMIT]: ", error);
        }
        finally{
            setLoading(false);
        }

    }

    return (
        <Modal title="Criar Loja" description="Adiciona Nova Loja"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Happy Convites"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Field className="pt-6 flex items-center justify-end" orientation="horizontal">
                            <Button disabled={loading} type="button" variant="outline" onClick={storeModal.onClose}>
                                Cancelar
                            </Button>
                            <Button disabled={loading} type="submit">
                                Continuar
                            </Button>
                        </Field>
                    </form>
                </div>
            </div>
        </Modal >
    )
}