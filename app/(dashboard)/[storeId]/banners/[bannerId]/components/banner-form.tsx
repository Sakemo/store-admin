"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ApiAlert } from "@/components/custom/api-alert";
import ImageUpload from "@/components/custom/image-upload";
import { useOrigin } from "@/hooks/use-origin";
import { Banner } from "@/lib/generated/prisma";

interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z.string().min(1, { message: "O nome é obrigatório." }),
  imageUrl: z.string().min(1, { message: "A imagem é obrigatória." }),
});

type BannerFormValues = z.infer<typeof formSchema>;

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Banner" : "Criar Banner";
  const description = initialData ? "Edite as informações do banner." : "Adicione um novo banner.";
  const toastMessage = initialData ? "Banner atualizado." : "Banner criado.";
  const action = initialData ? "Salvar" : "Criar";

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/banners`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success("Banner deletado com sucesso.");
    } catch (error) {
      toast.error("Certifique-se de remover todas as categorias que usam este banner primeiro.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Exemplo de modal de confirmação:
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <FormProvider {...form}>
        <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="imageUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Imagem do Banner</FieldLabel>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <Controller
              name="label"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                  <Input
                    disabled={loading}
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome do banner..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </FormProvider>

      <Separator />

      <Heading
        title="Ferramentas de Desenvolvedor"
        description="CUIDADO! Essa área é apenas para desenvolvedores."
      />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}/banners`}
        variant="public"
      />
    </>
  );
};