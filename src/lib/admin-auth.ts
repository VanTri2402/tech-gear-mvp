// src/lib/admin-auth.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./db";

export const checkAdminAuth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized"); // Ném lỗi 401
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (dbUser?.role !== "ADMIN") {
    throw new Error("Forbidden"); // Ném lỗi 403
  }

  return dbUser; 
};