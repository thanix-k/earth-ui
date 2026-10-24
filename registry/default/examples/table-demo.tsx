import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const bookings = [
  {
    id: "BK-1042",
    customer: "Ava Thompson",
    service: "Haircut",
    staff: "Maya Patel",
    status: "Confirmed",
    amount: "$45.00",
  },
  {
    id: "BK-1043",
    customer: "Liam Chen",
    service: "Beard trim",
    staff: "James Lee",
    status: "Pending",
    amount: "$25.00",
  },
  {
    id: "BK-1044",
    customer: "Sofia Rossi",
    service: "Colour",
    staff: "Maya Patel",
    status: "Confirmed",
    amount: "$120.00",
  },
  {
    id: "BK-1045",
    customer: "Noah Williams",
    service: "Manicure",
    staff: "Aisha Rahman",
    status: "Cancelled",
    amount: "$35.00",
  },
] as const;

const statusVariant = {
  Confirmed: "positive",
  Pending: "caution",
  Cancelled: "destructive",
} as const;

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Bookings for Thursday, 24 October.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Booking</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Staff</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>{booking.customer}</TableCell>
            <TableCell>{booking.service}</TableCell>
            <TableCell>{booking.staff}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{booking.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$225.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
