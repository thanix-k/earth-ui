import { Marker, MarkerContent } from "@/registry/default/ui/marker";

export default function MarkerDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>3 unread messages</MarkerContent>
      </Marker>
      <Marker>
        <MarkerContent>Maya joined the conversation</MarkerContent>
      </Marker>
    </div>
  );
}
