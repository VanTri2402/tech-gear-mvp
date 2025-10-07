import { ProductProps } from "./ProductType";

export interface CategoryProps {
  id: string;
  name: string;
  product: ProductProps[];
  _count: number;
}
