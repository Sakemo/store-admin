import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;

        const session = await auth.api.getSession({
            headers: await headers()
        });
        const body = await req.json();

        const { label, imageUrl } = body;

        if (!session) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId: session.user.id,
                id: storeId,
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const banner = await prismadb.banner.create({
            data: {
                label,
                imageUrl,
                storeId,
            }
        });

        return NextResponse.json(banner);
    }
    catch (error) {
        console.log('[BANNERS/POST]: ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;

        if (!storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const banners = await prismadb.banner.findMany({
            where: {
                storeId,
            }
        });

        return NextResponse.json(banners);
    }
    catch (error) {
        console.log('[BANNERS/GET]: ', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}