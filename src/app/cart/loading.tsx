import { Spinner } from "@/shared/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-gray-500 text-sm">Loading your cart...</p>
      </div>
    </div>
  );
}
