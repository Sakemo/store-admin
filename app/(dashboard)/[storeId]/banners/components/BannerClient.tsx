"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/data-table"

interface BannerClientProps {
    data: BannerColumn[]
}

export const BannerClient: React.FC<BannerClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="justify-between items-center flex">
                <Heading 
                    title={`Banner (${data.length})`} 
                    description="Selecione as imagens para o topo da página." />
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Adicionar Imagem
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data}/>
        </>
    )
}