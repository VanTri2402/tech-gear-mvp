import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getCategories = unstable_cache(
  async () => {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  },
  ["categories"],
  {
    revalidate: 60,
    tags: ["categories"],
  }
);

export default getCategories;
