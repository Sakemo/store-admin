import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { AuthHeader } from "@/app/(root)/(utils)/auth-header";
import { Navbar } from "@/components/custom/navbar";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const session = await auth.api.getSession({
            headers: await headers()
    })

    if(!session){
        redirect("/login");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: session.user.id
        }
    })

    if(!store){
        redirect("/");
    }
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}