import { AuthHeader } from "@/app/(root)/(utils)/auth-header";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    }); if(!session){ redirect("/login"); }
    const userId = session?.user.id;

    const stores = await prismadb.store.findMany({
        where: {
            userId: userId
        },
    });

    return (
        <header className="flex items-center justify-between p-4 border-b">

            <div className="flex items-center space-x-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
            </div>

            <div className="ml-auto flex items-center space-x-4">
                <AuthHeader />
            </div>
        </header>
    );
};