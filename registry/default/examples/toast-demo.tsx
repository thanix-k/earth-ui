"use client";

import { Button } from "@/registry/default/ui/button";
import { Toaster, toast } from "@/registry/default/ui/toast";

export default function ToastDemo() {
  return (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Appointment booked",
            description: "Haircut with Maya, Fri 7 Nov at 2:30 pm",
          })
        }
      >
        Book appointment
      </Button>
    </Toaster>
  );
}
