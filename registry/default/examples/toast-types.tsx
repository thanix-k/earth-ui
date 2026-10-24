"use client";

import { Button } from "@/registry/default/ui/button";
import { Toaster, toast } from "@/registry/default/ui/toast";

const examples = [
  { type: "success", label: "Success", title: "Booking page published" },
  { type: "info", label: "Info", title: "Maya is away on Friday" },
  { type: "warning", label: "Warning", title: "2 appointments overlap on Monday" },
  { type: "error", label: "Error", title: "Payment could not be taken" },
];

export default function ToastTypes() {
  return (
    <Toaster>
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example) => (
          <Button
            key={example.type}
            variant="outline"
            onClick={() => toast.add({ type: example.type, title: example.title })}
          >
            {example.label}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Syncing your Google Calendar…",
              success: "Calendar synced",
              error: "Sync failed",
            })
          }
        >
          Promise
        </Button>
      </div>
    </Toaster>
  );
}
