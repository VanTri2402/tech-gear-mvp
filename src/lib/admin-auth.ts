import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./db";
import { NextResponse } from "next/server";

export const checkAdminAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (dbUser?.role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return dbUser;
};
