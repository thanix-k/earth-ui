import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";

export default function BadgeLink() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge render={<a href="#bookings" />}>
        3 new bookings
        <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
      <Badge variant="link" render={<a href="#services" />}>
        View services
      </Badge>
    </div>
  );
}
