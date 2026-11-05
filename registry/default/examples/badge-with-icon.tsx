import { BadgeCheckIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">
        <BadgeCheckIcon data-icon="inline-start" />
        Paid
      </Badge>
      <Badge variant="outline">
        <ClockIcon data-icon="inline-start" />
        Awaiting payment
      </Badge>
    </div>
  );
}
