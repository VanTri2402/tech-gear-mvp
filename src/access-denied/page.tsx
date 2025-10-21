// src/app/access-denied/page.tsx
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react"; // Using a relevant icon
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-center px-4">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-neutral-800 mb-3">
        Access Denied
      </h1>
      <p className="text-lg text-neutral-600 mb-8 max-w-md">
        Sorry, you do not have the necessary permissions to access this page.
      </p>
      <Link href="/">
        <Button size="lg">Go Back Home</Button>
      </Link>
    </div>
  );
}
