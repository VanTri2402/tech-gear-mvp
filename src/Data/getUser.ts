import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
const getUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });
  return dbUser;
};
export default getUserData;
