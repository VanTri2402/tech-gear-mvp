import { checkAdminAuth } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(request : NextRequest,{params} : {params : {userId: string}}) {
    try {
          const adminUser = await checkAdminAuth();

    if (adminUser.id === params.userId) {
        return new NextResponse("Admins cannot change their own role", { status: 400 });
    }
        const dbUser = await prisma?.user.findUnique({
            where: { id: params.userId },
        })
        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }
        await checkAdminAuth();
        const updateUser = await prisma?.user.update({
            where : { id: params.userId },
            data : { role: "ADMIN" }
        });
        return NextResponse.json({ message: "User updated to ADMIN", user: updateUser
        })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: (error as Error).message === "Unauthorized" ? 401 : (error as Error).message === "Forbidden" ? 403 : 500 });
    }
}

