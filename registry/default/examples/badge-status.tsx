import { Badge } from "@/registry/default/ui/badge";

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="positive">Confirmed</Badge>
      <Badge variant="caution">Pending</Badge>
      <Badge variant="destructive">No-show</Badge>
      <Badge variant="secondary">Completed</Badge>
    </div>
  );
}
