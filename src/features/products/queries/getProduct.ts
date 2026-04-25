import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      include: {
        category: true,
      },
    });
  },
  ["products"],
  {
    revalidate: 60,
    tags: ["products"],
  }
);

export default getProducts;
