import { checkAdminAuth } from "@/lib/admin-auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    await checkAdminAuth();
    try {

        const users = await prisma.user.findMany({
            orderBy: { email: 'desc' },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
}

