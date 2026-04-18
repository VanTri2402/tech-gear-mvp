"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { ProductForm } from "./ProductForm";
import { ProductProps } from "@/features/products/types";
import { CategoryProps } from "@/features/categories/types";
import { showToast } from "@/shared/hooks/toast";

interface ProductActionsProps {
  product: ProductProps;
  categories: CategoryProps[];
}

export function ProductActions({ product, categories }: ProductActionsProps) {
  const router = useRouter();
  async function deleteProduct() {
    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
      return;
    } else {
      return showToast("Failed to delete the product", "error");
    }
  }
  return (
    <div className="text-right">
      <ProductForm categories={categories} initialData={product} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} size={"sm"} className="ml-2">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product {product.name} and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} asChild>
              <Button variant={"destructive"}>DELETE</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
