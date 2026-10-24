import { CalendarSyncIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";

export default function AlertActionExample() {
  return (
    <Alert className="max-w-md">
      <CalendarSyncIcon />
      <AlertTitle>Sync paused</AlertTitle>
      <AlertDescription>Bookings stopped syncing to Outlook yesterday.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Reconnect
        </Button>
      </AlertAction>
    </Alert>
  );
}
