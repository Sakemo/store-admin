import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BannerClient } from "./components/BannerClient";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

export default async function BannerPage({ params }: { params: { storeId: string } | Promise<{ storeId: string }> }) {
    const resolvedParams = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    }); if(!session) { redirect("/login") };
    const userId = session.user.id;

    const store = await prismadb.store.findFirst({
        where:{
            id: resolvedParams.storeId,
            userId: userId,
        }
    });

    if(!store){
        redirect('/');
    };

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <BannerClient />
            </div>
        </div>
    );
}
