"use client"; // BẮT BUỘC: Vì sử dụng useState và useRouter

import { Input } from '@/components/ui/input'; // Sử dụng Input trực tiếp
import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import { Label } from '@/components/ui/label';

// Đổi tên component cho rõ ràng hơn
export function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) {
                throw new Error('Failed to create category');
            }

            setOpen(false); // Đóng dialog khi thành công
            router.refresh(); // Tải lại dữ liệu trang
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
            return
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add New Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* Thẻ <form> phải nằm bên trong DialogContent */}
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                        <DialogDescription>
                            Enter the name for the new category below.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        {/* Không cần DialogClose, nút submit sẽ xử lý việc đóng dialog */}
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}