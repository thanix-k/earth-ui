import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerButton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Syncing calendar
      </Button>
    </div>
  );
}
