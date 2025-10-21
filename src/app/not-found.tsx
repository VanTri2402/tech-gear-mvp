// src/app/not-found.tsx
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react"; // Icon khác cho 404
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 text-center px-4 z-50 ">
      <FileSearch className="w-16 h-16 text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold text-neutral-800 mb-3">
        Page Not Found
      </h1>
      <p className="text-lg text-neutral-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or may have been
        moved.
      </p>
      <Link href="/">
        <Button size="lg">Go Back Home</Button>
      </Link>
    </div>
  );
}
