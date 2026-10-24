import { Button } from "@/registry/default/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/registry/default/ui/button-group";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function ButtonGroupInput() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <Label htmlFor="booking-url">Booking page URL</Label>
      <ButtonGroup className="w-full">
        <ButtonGroupText>setmore.com/</ButtonGroupText>
        <Input id="booking-url" defaultValue="glowsalon" />
        <Button variant="outline">Copy</Button>
      </ButtonGroup>
    </div>
  );
}
