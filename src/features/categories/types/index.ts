import { ProductProps } from "@/features/products/types";

export interface CategoryProps {
  id: string;
  name: string;
  products?: ProductProps[];
  _count?: {
    products: number;
  };
}
