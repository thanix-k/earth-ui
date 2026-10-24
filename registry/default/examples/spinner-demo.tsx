import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-2 text-body-14 text-eds-secondary lg:text-body-12">
      <Spinner />
      Loading bookings…
    </div>
  );
}
