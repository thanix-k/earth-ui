"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";
import { Toaster } from "@/registry/default/ui/sonner";

export default function SonnerDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Appointment booked", {
            description: "Haircut with Maya, Fri 7 Nov at 2:30 pm",
            action: {
              label: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        Book appointment
      </Button>
      <Toaster />
    </>
  );
}
