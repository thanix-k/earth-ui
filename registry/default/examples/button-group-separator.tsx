import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/registry/default/ui/button-group";

export default function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup>
      <Button variant="ghost">New appointment</Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="More booking options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  );
}
