import { Button } from "@/registry/default/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/default/ui/tooltip";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" className="capitalize" />}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>Shown on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
