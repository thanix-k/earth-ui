import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function CardSmall() {
  return (
    <Card size="sm" className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Today</CardTitle>
        <CardDescription>Thursday, 24 October</CardDescription>
      </CardHeader>
      <CardContent>
        <p>8 bookings, 2 waiting for confirmation.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
