import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/default/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <InfoIcon />
      <AlertTitle>Reminders are on</AlertTitle>
      <AlertDescription>Customers get an email 24 hours before their booking.</AlertDescription>
    </Alert>
  );
}
