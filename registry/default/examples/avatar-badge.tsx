import { PlusIcon } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";

export default function AvatarBadgeExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>JL</AvatarFallback>
        <AvatarBadge className="bg-eds-status-available" />
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Maya Patel" />
        <AvatarFallback>MP</AvatarFallback>
        <AvatarBadge className="bg-eds-status-busy" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AR</AvatarFallback>
        <AvatarBadge>
          <PlusIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  );
}
