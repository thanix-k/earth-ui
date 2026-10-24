import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add a service</CardTitle>
        <CardDescription>Customers can book it from your page.</CardDescription>
        <CardAction>
          <Button variant="link" size="sm" className="px-0">
            Import
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="grid gap-1">
            <Label htmlFor="service-name">Service name</Label>
            <Input id="service-name" placeholder="Haircut and style" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="service-duration">Duration (minutes)</Label>
            <Input id="service-duration" type="number" placeholder="45" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save service</Button>
      </CardFooter>
    </Card>
  );
}
