"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { ProductForm } from "./ProductForm";

interface ProductActionsProps {
  product: any;
  categories: any[];
}

export function ProductActions({ product, categories }: ProductActionsProps) {
  const router = useRouter();
  async function deleteProduct() {
    const res = await fetch(
      `/api/products/${product.id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete the product");
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
            <AlertDialogAction onClick={deleteProduct}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
