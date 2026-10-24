import { Separator } from "@/registry/default/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-body-14 text-eds-primary lg:text-body-12">
      <div className="flex flex-col gap-0.5">
        <div className="font-medium">Glow Salon</div>
        <div className="text-eds-secondary">Hair, nails and skin care.</div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4">
        <div>Bookings</div>
        <Separator orientation="vertical" />
        <div>Staff</div>
        <Separator orientation="vertical" />
        <div>Services</div>
      </div>
    </div>
  );
}
