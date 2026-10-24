import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
    </div>
  );
}
