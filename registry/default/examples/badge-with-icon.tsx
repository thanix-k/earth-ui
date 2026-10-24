import { BadgeCheckIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="positive">
        <BadgeCheckIcon data-icon="inline-start" />
        Paid
      </Badge>
      <Badge variant="caution">
        <ClockIcon data-icon="inline-start" />
        Awaiting payment
      </Badge>
    </div>
  );
}
