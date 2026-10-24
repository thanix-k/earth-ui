import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Input } from "@/registry/default/ui/input";

export default function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share booking page</DialogTrigger>
      <DialogContent className="sm:max-w-120" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share booking page</DialogTitle>
          <DialogDescription>Anyone with this link can book with your team.</DialogDescription>
        </DialogHeader>
        <Input readOnly defaultValue="https://glowsalon.setmore.com" aria-label="Booking link" />
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
