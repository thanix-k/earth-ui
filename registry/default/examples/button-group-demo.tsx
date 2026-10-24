import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { ButtonGroup } from "@/registry/default/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ButtonGroup aria-label="Change week">
        <Button variant="outline" size="icon" aria-label="Previous week">
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline">Today</Button>
        <Button variant="outline" size="icon" aria-label="Next week">
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Calendar view">
        <Button variant="outline">Day</Button>
        <Button variant="outline" aria-pressed>
          Week
        </Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
    </div>
  );
}
