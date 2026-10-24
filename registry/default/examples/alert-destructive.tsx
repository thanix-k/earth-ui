import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/registry/default/ui/alert";

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlertIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        We couldn't charge the card ending 4242. Ask the customer to update it.
      </AlertDescription>
    </Alert>
  );
}
