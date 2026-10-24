import { DownloadIcon, PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon data-icon="inline-start" />
        New appointment
      </Button>
      <Button variant="outline">
        Export
        <DownloadIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
