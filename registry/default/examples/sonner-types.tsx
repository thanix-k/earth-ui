"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";
import { Toaster } from "@/registry/default/ui/sonner";

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast("Reminder emails are on")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Booking page published")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Maya is away on Friday")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("2 appointments overlap on Monday")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Payment could not be taken")}>
        Error
      </Button>
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
      <Toaster />
    </div>
  );
}
