import { CalendarPlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

export default function TooltipWithKbd() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Block time" />}>
        <CalendarPlusIcon />
      </TooltipTrigger>
      <TooltipContent>
        Block time <Kbd>B</Kbd>
      </TooltipContent>
    </Tooltip>
  );
}
