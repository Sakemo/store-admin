import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params,
}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    }); if(!session) { redirect("/login") };
    const userId = session.user.id;

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId: userId,
        }
    });

    if(!store){
        redirect('/');
    };

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
}

export default SettingsPage;