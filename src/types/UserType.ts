// src/types/UserType.ts
import { ProductProps } from "./ProductType";

export interface UserProps {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email?: string | null;
  picture?: string | null;
  role: "USER" | "ADMIN";
  inCart: ProductProps[];
}
