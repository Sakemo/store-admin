import { UserButton } from "@/components/custom/user-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthHeader() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect("/login");
    }

    return (
        <UserButton />
    )
}