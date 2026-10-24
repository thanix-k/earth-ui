import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-xs" variant="outline" aria-label="Open">
          <ArrowUpRightIcon />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Open">
          <ArrowUpRightIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="Open">
          <ArrowUpRightIcon />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Open">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  );
}
