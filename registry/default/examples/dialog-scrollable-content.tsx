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

const policies = [
  ["Cancellations", "Customers can cancel up to 24 hours before their appointment at no cost."],
  ["Late arrivals", "Arriving more than 15 minutes late may shorten or reschedule the service."],
  ["No-shows", "Missed appointments without notice are charged 50% of the service price."],
  ["Deposits", "Services over 90 minutes need a deposit when booking online."],
  ["Rescheduling", "Appointments can be moved twice. After that, please call the front desk."],
  ["Refunds", "Deposits are refunded to the original payment method within 5 business days."],
  ["Gift cards", "Gift cards are valid for 12 months and can be used for any service."],
  ["Children", "Guests under 16 need a parent or guardian present during their appointment."],
];

export default function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Booking policy</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>Booking policy</DialogTitle>
          <DialogDescription>Shown to customers before they confirm a booking.</DialogDescription>
        </DialogHeader>
        <div className="-mx-6 max-h-72 overflow-y-auto px-6">
          {policies.map(([title, body]) => (
            <div key={title} className="mb-4 last:mb-0">
              <p className="text-body-14 font-medium">{title}</p>
              <p className="text-body-14 text-eds-secondary">{body}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
