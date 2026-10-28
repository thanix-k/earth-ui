import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";

export default function DialogSheetOnPhone() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Discard changes</DialogTrigger>
      <DialogContent className="sm:max-w-120" isSheetOnPhone>
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>
            Your edits to Haircut &amp; style haven't been saved. Leave without saving them?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Keep editing</DialogClose>
          <DialogClose render={<Button />}>Discard</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
