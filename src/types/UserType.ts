import { ProductProps } from "./ProductType";

export interface UserProps {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  wishList: ProductProps[];
}
