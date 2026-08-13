"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export const BannerClient = () => {
    const router = useRouter();
    const params = useParams();



    return (
        <>
            <div className="justify-between items-center flex">
                <Heading 
                    title="Banner #0" 
                    description="Selecione as imagens para o topo da página." />
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Adicionar Imagem
                </Button>
            </div>
            <Separator />

        </>
    )
}