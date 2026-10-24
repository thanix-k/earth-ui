"use client";

import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";
import { Toaster } from "@/registry/default/ui/sonner";

export default function SonnerCloseButton() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("New booking from Jordan Lee", {
            description: "Colour refresh, Sat 8 Nov at 10:00 am",
            duration: 10000,
          })
        }
      >
        Show notification
      </Button>
      <Toaster closeButton />
    </>
  );
}
