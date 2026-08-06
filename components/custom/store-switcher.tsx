import { Combobox, ComboboxContent, ComboboxItem, ComboboxList } from "../ui/combobox"
import prismadb from "@/lib/prismadb"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ComboboxInput } from "@base-ui/react"

export const StoreSwitcher = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect("/login");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId: session.user.id
        }
    })

    console.log(stores)

    return (
        <Combobox items={stores}>
            <ComboboxContent>
                <ComboboxList>
                    {stores.map((store) => (
                        <ComboboxItem key={store.id} value={store.name} >
                            {store.name}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}