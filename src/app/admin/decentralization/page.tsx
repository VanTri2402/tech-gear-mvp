// src/app/admin/decentralization/page.tsx (tên file gợi ý)
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserActions } from "./components/UserActions"; // Import component mới

// Hàm lấy dữ liệu người dùng (giữ nguyên, chỉ cần sửa URL)
async function getUsers() {
    const baseUrl = process.env.KINDE_SITE_URL; // Dùng KINDE_SITE_URL vì đây là Server Component
    const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    return res.json();
}

const DecentralizationPage = async () => {
    const users = await getUsers();

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell>{user.firstName || 'N/A'}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.role === 'ADMIN' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* Sử dụng Client Component ở đây */}
                                    <UserActions user={user} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default DecentralizationPage;