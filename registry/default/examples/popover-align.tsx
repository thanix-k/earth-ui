import { Button } from "@/registry/default/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";

const aligns = ["start", "center", "end"] as const;

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap gap-2">
      {aligns.map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline" className="capitalize" />}>
            {align}
          </PopoverTrigger>
          <PopoverContent align={align} className="w-48">
            Aligned to the {align} of the trigger.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
