import { CalendarCheckIcon } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/default/ui/marker";

export default function MarkerWithIcon() {
  return (
    <Marker className="w-full max-w-md">
      <MarkerIcon>
        <CalendarCheckIcon />
      </MarkerIcon>
      <MarkerContent>Booked for Friday, 3pm</MarkerContent>
    </Marker>
  );
}
