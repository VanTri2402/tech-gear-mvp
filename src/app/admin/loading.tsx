import { Spinner } from "@/shared/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
