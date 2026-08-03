import { auth } from "@/lib/auth"
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session){
        redirect("/login");
    }
    
    const store = await prismadb.store.findFirst({
        where: {
            userId: session.user.id
        }
    })

    if(store){
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )
}