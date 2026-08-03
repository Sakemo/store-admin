import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { AuthHeader } from "@/app/(root)/(utils)/auth-header";

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
            <header className="flex items-center justify-between p-4 border-b">
                <AuthHeader />
                <div>This will be a navbar</div>
            </header>
            {children}
        </div>
    )
}