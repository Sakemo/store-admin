import { format } from "date-fns"

import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BannerClient } from "./components/BannerClient";
import { BannerColumn } from "./components/columns";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

export default async function BannerPage(
    { params }: { params: { storeId: string } | Promise<{ storeId: string }> }) {

    const resolvedParams = await params;
    
    const session = await auth.api.getSession({
        headers: await headers()
    }); if(!session) { redirect("/login") };
    const userId = session.user.id;

    const banners = await prismadb.banner.findMany({
        where:{
            storeId: resolvedParams.storeId
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    const store = await prismadb.store.findFirst({
        where:{
            id: resolvedParams.storeId,
            userId: userId,
        }
    });

    if(!store){
        redirect('/');
    };

    const formattedBanners: BannerColumn[] =
    banners.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <BannerClient data={formattedBanners} />
            </div>
        </div>
    );
}
