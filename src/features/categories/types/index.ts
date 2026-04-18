import { ProductProps } from "@/features/products/types";

export interface CategoryProps {
  id: string;
  name: string;
  product: ProductProps[];
  _count: number;
}
