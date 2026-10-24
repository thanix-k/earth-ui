import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/registry/default/ui/alert";

export default function AlertStatus() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert variant="positive">
        <CircleCheckIcon />
        <AlertTitle>Google Calendar connected</AlertTitle>
      </Alert>
      <Alert variant="caution">
        <TriangleAlertIcon />
        <AlertTitle>Maya has no working hours on Sunday</AlertTitle>
      </Alert>
    </div>
  );
}
