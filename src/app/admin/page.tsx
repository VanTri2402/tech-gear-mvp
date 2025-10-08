import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductForm } from "./components/ProductForm";
import { ProductActions } from "./components/ProductActions";
import { ProductProps } from "@/types/ProductType";
import getProducts from "@/Data/getProdcut";
import getCategories from "@/Data/getCategory";

const AdminPage = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-shadow-accent">
          Products Management
        </h1>
        <ProductForm categories={categories} />
      </div>
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: ProductProps) => {
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    ${product.price.toLocaleString("en-US")} $
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell className="text-right">
                    <ProductActions product={product} categories={categories} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
