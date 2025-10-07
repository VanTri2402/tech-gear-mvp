// src/app/admin/decentralization/page.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserActions } from "./components/UserActions";
import { headers } from "next/headers"; // <-- BƯỚC 1: Import headers
import { UserProps } from "@/types/UserType";

async function getUsers() {
  // BƯỚC 2: Lấy headers từ request gốc
  const headerList = headers();
  const cookie = (await headerList).get("cookie"); // Trích xuất cookie

  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/users`, {
    cache: "no-store",
    headers: {
      // BƯỚC 3: Gửi cookie kèm theo request fetch
      Cookie: cookie || "",
    },
  });

  if (!res.ok) {
    //   // Log thêm để dễ debug
    //   const errorBody = await res.text();
    //   console.error(`API returned ${res.status}: ${errorBody}`);
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

const DecentralizationPage = async () => {
  const users = await getUsers();
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
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
            {users.map((user: UserProps) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.firstName || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DecentralizationPage;
