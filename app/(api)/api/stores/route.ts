import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(
    req: Request
) {
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const body = await req.json();

        const { name } = body;


        if(!session){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!name){
            return new NextResponse("Name is required", { status:400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId: session.user.id
            }
        });

        return NextResponse.json(store);
    }
    catch(error){
        console.log('[STORES/POST]: ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}