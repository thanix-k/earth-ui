import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
      <Spinner className="size-12 stroke-1" />
    </div>
  );
}
