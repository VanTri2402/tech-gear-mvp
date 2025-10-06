import { Spinner } from "@/components/ui/spinner";
export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-6 p-10 mt-auto">
            <Spinner className="size-12 text-blue-500" />
      <span className="text-2xl font-semibold">Loading...</span>   {" "}
    </div>
  );
}
