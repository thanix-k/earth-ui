import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";

export default function KbdButton() {
  return (
    <Button variant="outline">
      New booking <Kbd data-icon="inline-end">N</Kbd>
    </Button>
  );
}
