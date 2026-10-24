import { PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon" aria-label="New appointment" />}
      >
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent>New appointment</TooltipContent>
    </Tooltip>
  );
}
