"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { InputTemplate } from "@/components/InputTemplate";
import { CategoryProps } from "@/types/CategoryType";
import { ProductProps } from "@/types/ProductType";

export function ProductForm({
  categories,
  initialData,
}: {
  categories: CategoryProps[];
  initialData?: ProductProps;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isEditMode = !!initialData;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const apiEndpoint = isEditMode
      ? `/api/products/${initialData.id}`
      : "/api/products";
    const method = isEditMode ? "PATCH" : "POST";

    const response = await fetch(apiEndpoint, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: Number(data.price),
      }),
    });

    if (response.ok) {
      router.refresh();
      setOpen(false);
      return;
    } else {
      alert(`Failed to ${isEditMode ? "update" : "create"} product`);
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant={"outline"} size={"sm"}>
            Edit
          </Button>
        ) : (
          <Button variant="default">Add New Product</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Create New Product"}
          </DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết sản phẩm bên dưới.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <InputTemplate
            label="Name"
            name="name"
            defaultValue={initialData?.name ?? ""}
          />
          <InputTemplate
            label="Description"
            name="description"
            defaultValue={initialData?.description ?? ""}
          />
          <InputTemplate
            label="Price"
            name="price"
            type="number"
            defaultValue={initialData?.price ?? ""}
          />
          <InputTemplate
            label="Image URL"
            name="imageUrl"
            required={false}
            defaultValue={initialData?.imageUrl ?? ""}
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryId" className="text-right">
              Category
            </Label>
            <select
              id="categoryId"
              name="categoryId"
              // Thêm một vài class của shadcn/ui/Tailwind để trông giống Input
              className="col-span-3 h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              defaultValue={initialData?.categoryId ?? "smartphones"}
            >
              <option value="" disabled>
                -- Chọn danh mục --
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit">Save Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
