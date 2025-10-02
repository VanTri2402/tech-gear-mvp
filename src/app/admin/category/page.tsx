// src/app/admin/categories/page.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import CategoryActions from './components/CategoryActions'; // Giả sử đường dẫn đúng
import { headers } from 'next/headers'; // Import headers

async function fetchCategories() {
  const headerList = headers();
  const cookie = (await headerList).get("cookie");

  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/categories`, {
    cache: "no-store",
    headers: {
        Cookie: cookie || "",
    }
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

const CategoryPage = async () => {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      {/* Bạn có thể thêm nút "Add New Category" ở đây */}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/6'>Name</TableHead>
              <TableHead className='w-1/6 text-center'>Products Count</TableHead>
              <TableHead className='w-4/6 text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category : any) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell className='text-center'>{category._count.products}</TableCell>
                <TableCell className='text-right'>
                  <CategoryActions category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CategoryPage;