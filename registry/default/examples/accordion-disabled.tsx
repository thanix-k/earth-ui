import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

export default function AccordionDisabled() {
  return (
    <Accordion className="max-w-md">
      <AccordionItem value="email">
        <AccordionTrigger>Email reminders</AccordionTrigger>
        <AccordionContent>Sent 24 hours before each booking.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="sms" disabled>
        <AccordionTrigger>SMS reminders (Pro plan)</AccordionTrigger>
        <AccordionContent>Sent 2 hours before each booking.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
