"use client";

import { Button } from "@/registry/default/ui/button";
import { Toaster, toast } from "@/registry/default/ui/toast";

export default function ToastWithAction() {
  return (
    <Toaster>
      <Button
        variant="outline"
        onClick={() => {
          const id = toast.add({
            title: "Appointment cancelled",
            description: "Colour refresh with Jordan, Sat 8 Nov",
            actionProps: {
              children: "Undo",
              onClick: () => toast.close(id),
            },
          });
        }}
      >
        Cancel appointment
      </Button>
    </Toaster>
  );
}
