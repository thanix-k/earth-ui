import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Maya Patel" />
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
    </div>
  );
}
